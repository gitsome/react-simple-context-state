import React from 'react';
class StateStoreGlobal {
    static getContextForStateStores(stateStoreMap) {
        const stateStoreContext = {
            stateStoreMap,
            context: React.createContext({}),
        };
        // create some stateStoreKey lookup maps
        Object.keys(stateStoreContext.stateStoreMap).forEach((stateStoreKey) => {
            if (this.globalStateStoreMap[stateStoreKey]) {
                throw new Error(`StateStoreGlobal.getContextForStateStores.duplicateStateStoreKey: ${stateStoreKey}`);
            }
            // cache it in the global stateStore map
            this.globalStateStoreMap[stateStoreKey] = stateStoreContext.stateStoreMap[stateStoreKey];
            // cache the context lookup by stateStoreKey as well
            this.contextByStateStoreKeyMap[stateStoreKey] = stateStoreContext;
        });
        // finally add it to the global list of stateStoreContexts
        this.globalContextList.push(stateStoreContext);
        return stateStoreContext.context;
    }
    static getStateStoreByKey(stateStoreKey) {
        return this.globalStateStoreMap[stateStoreKey];
    }
    static getGlobalContextList() {
        return [...this.globalContextList];
    }
    static removeContextForStateStores(stateStoreMap) {
        // lookup the context object by any of the stateStore keys used
        const context = this.contextByStateStoreKeyMap[Object.keys(stateStoreMap)[0]];
        Object.keys(stateStoreMap).forEach((stateStoreKey) => {
            delete this.contextByStateStoreKeyMap[stateStoreKey];
            delete this.globalStateStoreMap[stateStoreKey];
        });
        const contextIndex = this.globalContextList.indexOf(context);
        if (contextIndex > -1) {
            this.globalContextList.splice(contextIndex, 1);
        }
        return true;
    }
}
StateStoreGlobal.contextByStateStoreKeyMap = {};
StateStoreGlobal.globalStateStoreMap = {};
StateStoreGlobal.globalContextList = [];
export default StateStoreGlobal;
export { StateStoreGlobal };
//# sourceMappingURL=StateStoreGlobal.js.map