"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const StateStoreGlobal_1 = require("./StateStoreGlobal");
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
            return (react_1.default.createElement(NextContext.context.Consumer, null, (consumerState) => {
                // order here actually matters to override the old with the new
                accumulatedState = Object.assign(Object.assign({}, accumulatedState), consumerState);
                const executableChildren = props.children;
                return executableChildren(accumulatedState);
            }));
        };
    }
    else {
        NextConsumer = (props) => {
            return (react_1.default.createElement(CurrentConsumer, null, (currentConsumerState) => {
                return (react_1.default.createElement(NextContext.context.Consumer, null, (nextConsumerState) => {
                    // order here actually matters to override the old with the new
                    accumulatedState = Object.assign(Object.assign(Object.assign({}, accumulatedState), currentConsumerState), nextConsumerState);
                    const executableChildren = props.children;
                    return executableChildren(accumulatedState);
                }));
            }));
        };
    }
    return generateConsumerRecursive(contextList, NextConsumer, accumulatedState);
};
class StateConsumer extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.consumer = generateConsumerRecursive(StateStoreGlobal_1.StateStoreGlobal.getGlobalContextList());
    }
    render() {
        return (react_1.default.createElement(this.consumer, null, this.props.children));
    }
}
exports.default = StateConsumer;
;
//# sourceMappingURL=StateConsumer.js.map