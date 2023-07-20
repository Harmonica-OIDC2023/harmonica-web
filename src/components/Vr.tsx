import { CSSProperties } from 'react';

type MyComponentProps = {
  style?: CSSProperties;
}


function Vr({ style }: MyComponentProps) {
  return (
    <div
        style={{
            background: '#ffffff',
            border:'1px solid #fafafa',
            borderRadius: '12px',
            width: '1px',
            height: '90%',
            margin: '0px 1vw',
            ...style
            }}>
    </div>
  );
}

export default Vr;