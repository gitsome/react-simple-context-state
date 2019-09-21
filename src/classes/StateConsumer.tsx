import React, { Fragment } from 'react';

import { StateStoreGlobal, IStateStoreContext } from './StateStoreGlobal';

const generateConsumerRecursive = (contextList: IStateStoreContext[], currentConsumer?: React.StatelessComponent, accumulatedState?): React.StatelessComponent => {

  if (!accumulatedState) {
    accumulatedState = {};
  }

  if (contextList.length === 0) {
    if (!currentConsumer) {
      throw new Error('StateConsumer.generateConsumerRecursive.consumerUsedWithoutContext');
    }
    return currentConsumer;
  }

  const nextContext = contextList.pop();

  if (!currentConsumer) {

    currentConsumer = (props) => {
      return (
        <nextContext.context.Consumer>
          {(consumerState) => {
            accumulatedState = {...accumulatedState, ...consumerState};
            const executableChildren = props.children as (someAccumulatedState: object) => any;
            return executableChildren(accumulatedState);
          }}
        </nextContext.context.Consumer>
      );
    };

  } else {

    currentConsumer = (props) => {

      console.log("NESTING==================>");

      return (
        <currentConsumer>
          <nextContext.context.Consumer>
            {(consumerState) => {
              accumulatedState = {...accumulatedState, ...consumerState};
              const executableChildren = props.children as (someAccumulatedState: object) => any;
              return executableChildren(accumulatedState);
            }}
          </nextContext.context.Consumer>
        </currentConsumer>
      );
    };
  }

  return generateConsumerRecursive(contextList, currentConsumer, accumulatedState);
};

export default class StateConsumer extends React.Component {

  public props: any;

  private consumer: React.StatelessComponent;

  constructor (props) {
    super(props);
    this.consumer = generateConsumerRecursive(StateStoreGlobal.getGlobalContextList());
  }

  public render () {

    return (
      <this.consumer>
        {this.props.children}
      </this.consumer>
    );
  }
};