import React from 'react';

export default class StateConsumer extends React.Component {

  public props: any;

  public render () {

    return (
      <this.props.consumer>
        {this.props.children}
      </this.props.consumer>
    );
  }
};