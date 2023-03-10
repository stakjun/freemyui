import classNames from "classnames";

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
    className?: string;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
     /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    href?: string;
    children: React.ReactNode
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * 
 * ```javascript
 * 
 * import { Button } from 'freemyui'
 * 
 * ```
 */
export const Button: React.FC<ButtonProps> = (props) => {
    const {
        className,
        btnType,
        size,
        disabled,
        href,
        children,
        ...restProps
    } = props;

    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': btnType === 'link' && disabled
    });

    if (btnType === 'link' && href) {
        return (
            <a
                href={href}
                className={classes}
                {...restProps}
            >
                {children}
            </a>
        )
    }else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }  
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button;