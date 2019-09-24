import React from 'react';

import { StateStoreGlobal, IStateStoreContext } from './StateStoreGlobal';
import { IStateStoreMap } from './StateStore';

export default class StateProvider extends React.Component {

  private stateStoreContext: React.Context<any>;
  private stateStoreMap: IStateStoreMap;
  public props;

  // we use component state to store the immutable state to avoid unecessary updates as discussed in React's Context documentation
  public state = {};

  constructor (props: any) {
    super(props);

    this.stateStoreContext = StateStoreGlobal.getContextForStateStores(props.stateStores);

    this.stateStoreMap = {};

    // here we bind state changes of these stateStores to the update cycle down this component branch
    // we also grab the first snapshot of state from the stateStore
    Object.keys(props.stateStores).forEach((stateKey) => {

      // link the stateStore to the component so changes made through the state store force an update in the component
      props.stateStores[stateKey].linkToComponentState(stateKey, this);

      // setup the first immutable state snapshot
      this.state[stateKey] = props.stateStores[stateKey].get();

      // add the state stores to state so they can come through context for convenience
      this.state[`${stateKey}Store`] = props.stateStores[stateKey];
    });
  }

  public componentWillUnmount() {

    // unbind from the component
    Object.keys(this.props.stateStores).forEach((stateKey) => {
      this.props.stateStores[stateKey].unlinkToComponentState(this);
    });

    // and de-register the state stores from the global cache
    StateStoreGlobal.removeContextForStateStores(this.props.stateStores);
  }

  public render () {
    return (
      <this.stateStoreContext.Provider value={this.state}>
        {this.props.children}
      </this.stateStoreContext.Provider>
    );
  }
};