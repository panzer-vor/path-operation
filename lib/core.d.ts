import { Config, MapFn } from './types';
export declare class PathOperator<State> {
    state: State;
    config: Config;
    constructor(state: State, config?: Config);
    createPath(path: string[]): {
        (mapFn: MapFn): any;
        getValue: () => any;
    };
    getPathValue(path: string[]): () => any;
}
