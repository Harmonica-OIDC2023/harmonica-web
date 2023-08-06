/// <reference types="react-scripts" />
declare module 'react-router-dom';
declare module "*.json" {
    const value: any;
    export default value;
}
declare module 'js-yaml';