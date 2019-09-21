"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const StateStoreGlobal_1 = require("./StateStoreGlobal");
class StateProvider extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.stateStoreContext = StateStoreGlobal_1.StateStoreGlobal.getContextForStateStores(props.stateStores);
        // here we bind state changes of these stateStores to the update cycle down this component branch
        // we also grab the first snapshot of state from the stateStore
        Object.keys(props.stateStores).forEach((stateKey) => {
            props.stateStores[stateKey].linkToComponentState(stateKey, this);
            this.state[stateKey] = props.stateStores[stateKey].get();
        });
    }
    componentWillUnmount() {
        // unbind to avoid memory leaks
        console.log("unbinding:");
        Object.keys(this.props.stateStores).forEach((stateKey) => {
            this.props.stateStores[stateKey].unlinkToComponentState(this);
        });
    }
    render() {
        return (react_1.default.createElement(this.stateStoreContext.Provider, { value: this.state }, this.props.children));
    }
}
exports.default = StateProvider;
;
//# sourceMappingURL=StateProvider.js.map