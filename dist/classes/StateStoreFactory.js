"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StateStore_1 = require("./StateStore");
// using lodash logic for object detection
const isObject = (obj) => {
    const type = typeof obj;
    return (type === 'function') || (type === 'object' && !!obj);
};
// State Store Factories are great to use when you need to register StateStores that are not global.
// A great use case is when a route needs its own state, it can be created on creation of the route component and is discarded thereafter
// This allows for production and consumption of state scoped to certain branches of the component tree
const StateStoreFactory = (stateStoreConfig) => {
    return (initialStateValues) => {
        initialStateValues = initialStateValues || {};
        // Create an updated stateStoreConfig. Use a copy of stateStoreConfig because it will be used multiple times in this factory.
        const stateStoreConfigUpdated = Object.assign({}, stateStoreConfig);
        // the initial state values can either be in stateStoreConfig format using reserved words like asyncState, or totally flat
        // use them to update the final stateConfig
        Object.keys(initialStateValues).forEach((key) => {
            // if the key matches the original stateStoreConfig then copy it directly in
            if (stateStoreConfig[key]) {
                stateStoreConfigUpdated[key] = initialStateValues[key];
                // they could have tried to put the key flat on the object when it belongs under a reserved key
                // this is okay, we just try to find the matching reserved key and stick it in there
            }
            else if (StateStore_1.StateStoreReservedKeys.includes(key) && isObject(initialStateValues[key])) {
                // recursively process the reservedKey value keys
                Object.keys(initialStateValues[key]).forEach((reservedKeyObjectKey) => {
                    if (stateStoreConfig[key][reservedKeyObjectKey]) {
                        stateStoreConfigUpdated[key][reservedKeyObjectKey] = initialStateValues[key][reservedKeyObjectKey];
                    }
                    else {
                        throw new Error(`StateStoreFactory.invalidInitialStateKey: ${key}:${reservedKeyObjectKey}`);
                    }
                });
            }
            else {
                throw new Error(`StateStoreFactory.invalidInitialStateKey: ${key}`);
            }
        });
        // return a new StateStore instance
        return new StateStore_1.StateStore(stateStoreConfigUpdated);
    };
};
exports.default = StateStoreFactory;
//# sourceMappingURL=StateStoreFactory.js.map