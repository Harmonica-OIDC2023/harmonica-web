import React, { ReactNode, CSSProperties } from 'react';
import './NextButton.css';

type MyComponentProps = {
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: CSSProperties;
  disabled?: boolean;
};

function NextButton({ children, className, style, onClick, disabled }: MyComponentProps) {
  return (
    <div
      className={`${className}${disabled ? ' disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
      style={style}
    >
      {children}
    </div>
  );
}

export default NextButton;