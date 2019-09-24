import React, { Fragment } from 'react';

import { StateStoreGlobal, IStateStoreContext } from './StateStoreGlobal';

// recursively create a Consumer component that will expose each registered stateStore and combine them into one consumable
const generateConsumerRecursive = (contextList: IStateStoreContext[], CurrentConsumer?: React.StatelessComponent, accumulatedState?): React.StatelessComponent => {

  if (!accumulatedState) {
    accumulatedState = {};
  }

  if (contextList.length === 0) {
    if (!CurrentConsumer) {
      throw new Error('StateConsumer.generateConsumerRecursive.consumerUsedWithoutContext');
    }
    return CurrentConsumer;
  }

  const NextContext = contextList.pop();

  let NextConsumer;

  if (!CurrentConsumer) {

    NextConsumer = (props) => {
      return (
        <NextContext.context.Consumer>
          {(consumerState) => {
            accumulatedState = {...accumulatedState, ...consumerState};
            const executableChildren = props.children as (someAccumulatedState: object) => any;
            return executableChildren(accumulatedState);
          }}
        </NextContext.context.Consumer>
      );
    };

  } else {

    NextConsumer = (props) => {

      return (
        <CurrentConsumer>
          {(currentConsumerState) => {

            return (
              <NextContext.context.Consumer>
                {(nextConsumerState) => {
                  accumulatedState = {...accumulatedState, ...currentConsumerState, ...nextConsumerState};
                  const executableChildren = props.children as (someAccumulatedState: object) => any;
                  return executableChildren(accumulatedState);
                }}
              </NextContext.context.Consumer>
            );
          }}
        </CurrentConsumer>
      );
    };
  }

  return generateConsumerRecursive(contextList, NextConsumer, accumulatedState);
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