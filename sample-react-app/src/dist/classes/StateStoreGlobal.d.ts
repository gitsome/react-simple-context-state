import React from 'react';
import { StateStore, IStateStoreMap } from './StateStore';
interface IStateStoreContext {
    context: React.Context<any>;
    stateStoreMap: IStateStoreMap;
}
declare class StateStoreGlobal {
    private static contextByStateStoreKeyMap;
    private static globalStateStoreMap;
    static globalContextList: IStateStoreContext[];
    static getContextForStateStores(stateStoreMap: IStateStoreMap): React.Context<any>;
    static getStateStoreByKey(stateStoreKey: any): StateStore;
    static getGlobalContextList(): IStateStoreContext[];
    static removeContextForStateStores(stateStoreMap: IStateStoreMap): boolean;
}
export default StateStoreGlobal;
export { StateStoreGlobal, IStateStoreContext };
