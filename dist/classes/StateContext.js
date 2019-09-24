import StateStoreGlobal from './StateStoreGlobal';
import StateProvider from './StateProvider';
import StateConsumer from './StateConsumer';
class StateContext {
    static getStateStore(stateStoreKey) {
        return StateStoreGlobal.getStateStoreByKey(stateStoreKey);
    }
}
StateContext.Provider = StateProvider;
StateContext.Consumer = StateConsumer;
export default StateContext;
//# sourceMappingURL=StateContext.js.map