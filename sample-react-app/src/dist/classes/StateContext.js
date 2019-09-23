"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StateStoreGlobal_1 = __importDefault(require("./StateStoreGlobal"));
const StateProvider_1 = __importDefault(require("./StateProvider"));
const StateConsumer_1 = __importDefault(require("./StateConsumer"));
class StateContext {
    static getStateStore(stateStoreKey) {
        return StateStoreGlobal_1.default.getStateStoreByKey(stateStoreKey);
    }
}
StateContext.Provider = StateProvider_1.default;
StateContext.Consumer = StateConsumer_1.default;
exports.default = StateContext;
//# sourceMappingURL=StateContext.js.map