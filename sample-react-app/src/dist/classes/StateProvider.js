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
        // we use component state to store the immutable state to avoid unecessary updates as discussed in React's Context documentation
        this.state = {};
        this.stateStoreContext = StateStoreGlobal_1.StateStoreGlobal.getContextForStateStores(props.stateStores);
        this.stateStoreMap = {};
        // here we bind state changes of these stateStores to the update cycle down this component branch
        // we also grab the first snapshot of state from the stateStore
        Object.keys(props.stateStores).forEach((stateKey) => {
            // link the stateStore to the component so changes made through the state store force an update in the component
            props.stateStores[stateKey].linkToComponentState(stateKey, this);
            // setup the first immutable state snapshot
            this.state[stateKey] = props.stateStores[stateKey].get();
            // populate and object that will be used to expose state stores through context for convenience
            this.stateStoreMap[`${stateKey}Store`] = props.stateStores[stateKey];
        });
    }
    componentWillUnmount() {
        // unbind from the component
        Object.keys(this.props.stateStores).forEach((stateKey) => {
            this.props.stateStores[stateKey].unlinkToComponentState(this);
        });
        // and de-register the state stores from the global cache
        StateStoreGlobal_1.StateStoreGlobal.removeContextForStateStores(this.props.stateStores);
    }
    render() {
        return (react_1.default.createElement(this.stateStoreContext.Provider, { value: Object.assign(Object.assign({}, this.state), this.stateStoreMap) }, this.props.children));
    }
}
exports.default = StateProvider;
;
//# sourceMappingURL=StateProvider.js.map