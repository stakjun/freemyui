import classNames from "classnames";
import { useState } from "react";

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning',
}

interface AlertProps {
    className?: string;
    /**标题 */
    title: string;
    /**描述 */
    description?: string;
    /**类型 */
    type?: string;
    /**关闭Alert时的回调 */
    onClose?: () => void;
    /**是否显示关闭图标 */
    closable?: boolean;
}

const Alert: React.FC<AlertProps> = (props) => {
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
    type: AlertType.Default,
    closable: true
}

export default Alert;