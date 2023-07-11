import React, { ReactNode, CSSProperties } from 'react';
import './ItemBlock.css';

type MyComponentProps = {
    children?: ReactNode;
    style?: CSSProperties;
    onClick?: React.MouseEventHandler<HTMLElement>
}

function ItemBlock({ children, style, onClick }: MyComponentProps) {
  return (
    <div className="item-block" style={style} onClick={onClick}>
      {children}
    </div>
  );
}

export default ItemBlock;