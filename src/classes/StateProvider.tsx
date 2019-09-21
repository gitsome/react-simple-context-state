import React from 'react';

import { StateStoreGlobal, IStateStoreContext } from './StateStoreGlobal';

export default class StateProvider extends React.Component {

  private stateStoreContext: React.Context<any>;
  public props;
  public state = {};

  constructor (props: any) {
    super(props);

    this.stateStoreContext = StateStoreGlobal.getContextForStateStores(props.stateStores);

    // here we bind state changes of these stateStores to the update cycle down this component branch
    // we also grab the first snapshot of state from the stateStore
    Object.keys(props.stateStores).forEach((stateKey) => {
      props.stateStores[stateKey].linkToComponentState(stateKey, this);
      this.state[stateKey] = props.stateStores[stateKey].get();
    });
  }

  public componentWillUnmount() {
    // unbind to avoid memory leaks
    console.log("unbinding:");
    Object.keys(this.props.stateStores).forEach((stateKey) => {
      this.props.stateStores[stateKey].unlinkToComponentState(this);
    });
  }

  public render () {
    return (
      <this.stateStoreContext.Provider value={this.state}>
        {this.props.children}
      </this.stateStoreContext.Provider>
    );
  }
};