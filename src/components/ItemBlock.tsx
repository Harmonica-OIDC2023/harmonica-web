import React, { ReactNode, CSSProperties } from 'react';
import './ItemBlock.css';

type MyComponentProps = {
    children?: ReactNode;
    style?: CSSProperties;
}

function ItemBlock({ children, style }: MyComponentProps) {
  return (
    <div className="item-block" style={style}>
      {children}
    </div>
  );
}

export default ItemBlock;