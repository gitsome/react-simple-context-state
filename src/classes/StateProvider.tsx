import React from 'react';

export default class StateProvider extends React.Component {

  public props: any;
  public state: any;

  constructor (props: any) {
    super(props);

    this.state = {};

    Object.keys(this.props.storeConfig).forEach((stateKey) => {
      this.props.storeConfig[stateKey].linkToComponentState(stateKey, this);
      this.state[stateKey] = this.props.storeConfig[stateKey].get();
    });
  }

  public componentWillUnmount() {
    Object.keys(this.props.storeConfig).forEach((stateKey) => {
      this.props.storeConfig[stateKey].unlinkToComponentState(this);
    });
  }

  public render () {

    const providerValue = Object.keys(this.props.storeConfig).reduce((memo: any, stateKey) => {
      memo[stateKey] = this.state[stateKey];
      return memo;
    }, {});

    return (
      <this.props.provider value={providerValue}>
        {this.props.children}
      </this.props.provider>
    );
  }
};