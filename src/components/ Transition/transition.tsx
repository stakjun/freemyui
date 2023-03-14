import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import { CSSTransition } from 'react-transition-group'
import React, { ReactNode } from "react";

type AnimationName = 'zoom-in-top' | 'zoom-in-right' | 'zoom-in-bottom' | 'zoom-in-left';

type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName
    wrap?: boolean;
    children?: ReactNode
}

const Transition: React.FC<TransitionProps> = (props) => {
    const { animation, classNames, children, wrap, ...restProps } = props;
    return (
        <CSSTransition
            classNames={classNames ? classNames : animation}
            {...restProps}
        >
            {/* 如果children中也有transition，那么Transtion的动画效果不会实现，所以包裹一层，transtition属性不能继承 */}
            {wrap? <div>{children}</div> : children}
        </CSSTransition>
    )
}

Transition.defaultProps = {
    unmountOnExit: true,
    appear: true
};

export default Transition;