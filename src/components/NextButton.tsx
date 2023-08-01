import React, { ReactNode, CSSProperties } from 'react';
import './NextButton.css';

type MyComponentProps = {
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: CSSProperties;
  disabled?: boolean;
  completed?: boolean; // New prop to indicate completion status
};

function NextButton({ children, className, style, onClick, disabled, completed }: MyComponentProps) {
  return (
    <div
      className={`${className}${disabled ? ' disabled' : ''}${completed ? ' completed' : ''}`}
      onClick={disabled ? undefined : onClick}
      style={style}
    >
      {children}
    </div>
  );
}

export default NextButton;