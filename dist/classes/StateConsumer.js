import React from 'react';
import { StateStoreGlobal } from './StateStoreGlobal';
// recursively create a Consumer component that will expose each registered stateStore and combine them into one consumable
const generateConsumerRecursive = (contextList, CurrentConsumer, accumulatedState) => {
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
            return (React.createElement(NextContext.context.Consumer, null, (consumerState) => {
                accumulatedState = Object.assign(Object.assign({}, accumulatedState), consumerState);
                const executableChildren = props.children;
                return executableChildren(accumulatedState);
            }));
        };
    }
    else {
        NextConsumer = (props) => {
            return (React.createElement(CurrentConsumer, null, (currentConsumerState) => {
                return (React.createElement(NextContext.context.Consumer, null, (nextConsumerState) => {
                    accumulatedState = Object.assign(Object.assign(Object.assign({}, accumulatedState), currentConsumerState), nextConsumerState);
                    const executableChildren = props.children;
                    return executableChildren(accumulatedState);
                }));
            }));
        };
    }
    return generateConsumerRecursive(contextList, NextConsumer, accumulatedState);
};
export default class StateConsumer extends React.Component {
    constructor(props) {
        super(props);
        this.consumer = generateConsumerRecursive(StateStoreGlobal.getGlobalContextList());
    }
    render() {
        return (React.createElement(this.consumer, null, this.props.children));
    }
}
;
//# sourceMappingURL=StateConsumer.js.map