import classNames from "classnames";
import React, { useEffect } from "react";
import Transition from "../ Transition/transition";
import useClickOutSide from "../../hooks/useClickoutSide";
import useDebounce from "../../hooks/useDebounce";
import Icon from "../Icon/icon";
import Input, { InputProps } from "../Input/input";

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
     /** 点击选中建议项时触发的回调*/
    onSelect?: (item: DataSourceType) => void;
    /**支持自定义渲染下拉项，返回 ReactElement */
    renderOption?: (item: DataSourceType) => React.ReactElement
}
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { AutoComplete } from 'freemyui'
 * ~~~
 */
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
    const [inputValue, setInputValue] = React.useState(value as string);
    const [suggestions, setSuggestions] = React.useState<DataSourceType[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [showDropdown, setShowDropdown] = React.useState(false)
    const [highlightIndex, setHighlightIndex] = React.useState(-1);

    const triggerSearch = React.useRef(false);
    const componentRef = React.useRef<HTMLDivElement>(null);

    const debouncedValue = useDebounce(inputValue, 300);
    useClickOutSide(componentRef, () => { setSuggestions([]) })

    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                console.log('tri');
                setLoading(true);
                results.then((data) => {
                    setLoading(false);
                    setSuggestions(data);
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
                setSuggestions(results);
                setShowDropdown(true)
                if (results.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
        }
        setHighlightIndex(-1)
    }, [debouncedValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true
    }

    const highlight = (index: number) => {
        if (index <= 0) index = 0;
        if (index > suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex])
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value);
        setShowDropdown(false)
        onSelect && onSelect(item)
        triggerSearch.current = false;
    }

    const renderTemplate = (item: DataSourceType) => (
        renderOption ? renderOption(item) : item.value
    )

    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown || loading}
                animation="zoom-in-top"
                timeout={300}
                onExited={() => { setSuggestions([]) }}
            >
                <ul className="free-suggestion-list">
                    {loading &&
                        <div className="suggstions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }

    return (
        <div className="free-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {generateDropdown()}
        </div>
    )

}

export default AutoComplete;