"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const StateStoreGlobal_1 = require("./StateStoreGlobal");
const generateConsumerRecursive = (contextList, currentConsumer, accumulatedState) => {
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
            return (react_1.default.createElement(nextContext.context.Consumer, null, (consumerState) => {
                accumulatedState = Object.assign(Object.assign({}, accumulatedState), consumerState);
                const executableChildren = props.children;
                return executableChildren(accumulatedState);
            }));
        };
    }
    else {
        currentConsumer = (props) => {
            console.log("NESTING==================>");
            return (react_1.default.createElement("currentConsumer", null,
                react_1.default.createElement(nextContext.context.Consumer, null, (consumerState) => {
                    accumulatedState = Object.assign(Object.assign({}, accumulatedState), consumerState);
                    const executableChildren = props.children;
                    return executableChildren(accumulatedState);
                })));
        };
    }
    return generateConsumerRecursive(contextList, currentConsumer, accumulatedState);
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