"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
class StateConsumer extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(this.props.consumer, null, this.props.children));
    }
}
exports.default = StateConsumer;
;
//# sourceMappingURL=StateConsumer.js.map