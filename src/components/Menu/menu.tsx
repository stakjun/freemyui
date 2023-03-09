import classNames from "classnames";
import React from "react";
import { createContext, useState } from "react";
import { MenuItemProps } from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';
type SelectedCallback = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectedCallback;
    children?: React.ReactNode;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectedCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = (props) => {
    const {
        defaultIndex,
        className,
        style,
        mode,
        children,
        onSelect,
        defaultOpenSubMenus
    } = props;
    const [currentActive, setActive] = useState(defaultIndex);

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, { index: index.toString() });
            }else {
                console.error("Warning: Menu has a child which is not a MenuItem component")
            }
        })
    }

    const handleClick = (index: string) => {
        setActive(index);
        onSelect && onSelect(index);
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }

    const classes = classNames('menu', className, {
        'menu-vertical': mode === "vertical",
        'menu-horizontal': mode !== "vertical"
    })

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext} >
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu;