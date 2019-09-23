import React from 'react';
import { StateStore, IStateStoreMap } from './StateStore';

interface IStateStoreContext {
  context: React.Context<any>;
  stateStoreMap: IStateStoreMap;
}

interface IStateStoreContextMap {
  [key: string]: IStateStoreContext;
}

class StateStoreGlobal {

  private static contextByStateStoreKeyMap: IStateStoreContextMap = {};
  private static globalStateStoreMap: IStateStoreMap = {};

  public static globalContextList: IStateStoreContext[] = [];

  public static getContextForStateStores (stateStoreMap: IStateStoreMap): React.Context<any> {

      const stateStoreContext: IStateStoreContext = {
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

  public static getStateStoreByKey (stateStoreKey): StateStore {
    return this.globalStateStoreMap[stateStoreKey];
  }

  public static getGlobalContextList (): IStateStoreContext[] {
    return [...this.globalContextList];
  }

  public static removeContextForStateStores (stateStoreMap: IStateStoreMap): boolean {

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

export default StateStoreGlobal;
export { StateStoreGlobal, IStateStoreContext };