"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class StateStoreGlobal {
    static getContextForStateStores(stateStoreMap) {
        const stateStoreContext = {
            stateStoreMap,
            context: react_1.default.createContext({}),
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
        return true;
    }
}
exports.StateStoreGlobal = StateStoreGlobal;
StateStoreGlobal.contextByStateStoreKeyMap = {};
StateStoreGlobal.globalStateStoreMap = {};
StateStoreGlobal.globalContextList = [];
exports.default = StateStoreGlobal;
//# sourceMappingURL=StateStoreGlobal.js.map