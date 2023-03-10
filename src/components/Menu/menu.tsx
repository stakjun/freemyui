import classNames from "classnames";
import React from "react";
import { createContext, useState } from "react";
import { MenuItemProps } from "./menuItem";

type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: string;
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: React.CSSProperties;
    /**点击菜单项触发的回掉函数 */
    onSelect?: (selectedIndex: string) => void;
    children?: React.ReactNode;
    /**设置子菜单的默认打开 只在纵向模式下生效 */
    defaultOpenSubMenus?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * 
 * ```javascript
 * import { Menu } from 'freemyui'
 * 
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
export const Menu: React.FC<MenuProps> = (props) => {
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