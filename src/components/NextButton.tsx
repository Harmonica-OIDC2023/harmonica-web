import React, { ReactNode, CSSProperties } from 'react';
import './NextButton.css';

type MyComponentProps = {
    children?: ReactNode;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>
    style?: CSSProperties;
}

function NextButton({ children, className, style, onClick }: MyComponentProps) {
  return (
    <div
        className={className}
        onClick={onClick}
        style={style}
    >
        {children}
    </div>
  );
}

export default NextButton;