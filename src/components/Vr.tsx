import { CSSProperties } from 'react';

type MyComponentProps = {
  style?: CSSProperties;
}


function Vr({ style }: MyComponentProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}
    >
       <div
        style={{
            background: '#dddddd',
            boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
            borderRadius: '12px',
            width: '1px',
            height: '95%',
            margin: '0px 1vw',
            ...style
            }}>
      </div>
    </div>
  );
}

export default Vr;