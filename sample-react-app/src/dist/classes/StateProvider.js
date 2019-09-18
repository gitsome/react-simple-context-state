"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class StateProvider extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {};
        Object.keys(this.props.storeConfig).forEach((stateKey) => {
            this.props.storeConfig[stateKey].linkToComponentState(stateKey, this);
            this.state[stateKey] = this.props.storeConfig[stateKey].get();
        });
    }
    componentWillUnmount() {
        Object.keys(this.props.storeConfig).forEach((stateKey) => {
            this.props.storeConfig[stateKey].unlinkToComponentState(this);
        });
    }
    render() {
        const providerValue = Object.keys(this.props.storeConfig).reduce((memo, stateKey) => {
            memo[stateKey] = this.state[stateKey];
            return memo;
        }, {});
        return (react_1.default.createElement(this.props.provider, { value: providerValue }, this.props.children));
    }
}
exports.default = StateProvider;
;
//# sourceMappingURL=StateProvider.js.map