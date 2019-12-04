import { Config } from './types';
declare const createInstance: <State>(state: State, config?: Config | undefined) => (path: string[], mapFn?: any) => any;
export default createInstance;
