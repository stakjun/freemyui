import classNames from "classnames";
import { useState } from "react";

export type AlertType = 'success' | 'default' | 'danger' | 'warning'

interface AlertProps {
    className?: string;
    /**标题 */
    title: string;
    /**描述 */
    description?: string;
    /**类型 四种可选 针对四种不同的场景 */
    type?: AlertType;
    /**关闭Alert时的回调 */
    onClose?: () => void;
    /**是否显示关闭图标 */
    closable?: boolean;
}

/** 
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 * 
 * ~~~js
 * 
 * import { Alert } from 'vikingship'
 * ~~~
*/
export const Alert: React.FC<AlertProps> = (props) => {
    const {
        className,
        title,
        description,
        type,
        onClose,
        closable,
    } = props;

    const [hide, setHide] = useState(false);

    const classes = classNames('alert', className, {
        [`alert-${type}`]: type
    });
    const titleClass = classNames('alert-title', {
        'bold-title': description
    })

    const handleClose = (e: React.MouseEvent) => {
        onClose && onClose();
        setHide(true);
    }

    return (
        <>
            {!hide &&
                <div className={classes}>
                    <span className={titleClass}>{title}</span>
                    {description && <p className="alert-desc">{description}</p>}
                    {closable && <span className="alert-close" onClick={handleClose}>close</span>}
                </div>
            }
        </>
    )
}

Alert.defaultProps = {
    type: 'default',
    closable: true
}

export default Alert;