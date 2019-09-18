import React from 'react';
import StateProvider from './StateProvider';
import StateConsumer from './StateConsumer';

const getStateContextProvider = (storeConfig, Provider) => {
  return (props) => {
    return (<StateProvider storeConfig={storeConfig} provider={Provider}>{props.children}</StateProvider>);
  };
};

const getStateContextConsumer = (Consumer) => {
  return (props) => {
    return (<StateConsumer consumer={Consumer}>{props.children}</StateConsumer>);
  };
};

class ReactSimpleStateContext {

  private stateStoreConfig: any;
  public Provider: any;
  public Consumer: any;

  constructor (reactSimpleStateStoreList) {

    this.stateStoreConfig = reactSimpleStateStoreList;
    const { Provider, Consumer } = React.createContext({});

    this.Provider = getStateContextProvider(this.stateStoreConfig, Provider);
    this.Consumer = getStateContextConsumer(Consumer);
  }

}

export default ReactSimpleStateContext;