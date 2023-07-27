import { CSSProperties } from 'react';

type MyComponentProps = {
  style?: CSSProperties;
}


function Hr({ style }: MyComponentProps) {
  return (
    <hr
        style={{
            color: '#dddddd',
            borderRadius: '0px',
            boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.25)',
            height: '0.1px',
            width: '100%',
            ...style
            }}>
    </hr>
  );
}

export default Hr;