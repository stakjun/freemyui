import classNames from "classnames";
import React from "react";
import { useState } from "react";
import { TabItemProps } from "./tabItem";

export interface TabsProps {
    /**当前激活 tab 面板的 index，默认为0 */
    defaultIndex?: number;
    /**点击 Tab 触发的回调函数 */
    onSelect?: (selectedIndex: number) => void;
    /**可以扩展的 className */
    className?: string;
    /**Tabs的样式，两种可选，默认为 line */
    type?: 'line' | 'card';
    children?: React.ReactNode;
}

/**
 * 选项卡切换组件。
 *
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Tabs } from 'vikingship'
 * ~~~
 */
export const Tabs: React.FC<TabsProps> = (props) => {
    const {
        defaultIndex,
        className,
        children,
        onSelect,
        type
    } = props;

    const [activeIndex, setActiveIndex] = useState(defaultIndex);

    const navClass = classNames('free-tbs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card'
    })

    const handleClick = (e: React.MouseEvent, index: number, disabled: boolean | undefined) => {
        if (!disabled) {
            setActiveIndex(index);
            onSelect && onSelect(index);
        }
    }

    const renderNavLinks = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>;
            const { label, disabled } = childElement.props;
            const classes = classNames('free-tabs-nav-item', {
                'is-active': activeIndex === index,
                'disabled': disabled
            })

            return (
                <li
                    className={classes}
                    key={`nav-item-${index}`}
                    onClick={(e) => handleClick(e, index, disabled)}
                >
                    {label}
                </li>
            )
        })
    }

    const renderContent = () => {
        return React.Children.map(children, (child, index) => {
            if (index === activeIndex) {
                return child;
            }
        })
    }

    return (
        <div className={classNames('free-tabs', className)} >
            <ul className={navClass} data-testid="test-tabs-nav">
                {renderNavLinks()}
            </ul>
            <div className="free-tabs-content">
                {renderContent()}
            </div>
        </div>
    )
}

Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line'
}

export default Tabs;
