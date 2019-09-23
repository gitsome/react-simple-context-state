"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const StateProvider_1 = __importDefault(require("./StateProvider"));
const StateConsumer_1 = __importDefault(require("./StateConsumer"));
const getStateContextProvider = (storeConfig, Provider) => {
    return (props) => {
        return (react_1.default.createElement(StateProvider_1.default, { storeConfig: storeConfig, provider: Provider }, props.children));
    };
};
const getStateContextConsumer = (Consumer) => {
    return (props) => {
        return (react_1.default.createElement(StateConsumer_1.default, { consumer: Consumer }, props.children));
    };
};
class StateContext {
    constructor(stateStoreList) {
        this.stateStoreConfig = stateStoreList;
        const { Provider, Consumer } = react_1.default.createContext({});
        this.Provider = getStateContextProvider(this.stateStoreConfig, Provider);
        this.Consumer = getStateContextConsumer(Consumer);
    }
}
exports.default = StateContext;
//# sourceMappingURL=StateContext.old.js.map