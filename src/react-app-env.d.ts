/// <reference types="react-scripts" />
declare module 'react-router-dom';
declare module "*.json" {
    const value: any;
    export default value;
}
declare module 'js-yaml';

declare module 'react-syntax-highlighter' {
    let Prism: any;
    export { Prism };
  }
  
  declare module 'react-syntax-highlighter/dist/esm/styles/prism' {
    let solarizedlight: any;
    export { solarizedlight };
  }