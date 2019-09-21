import StateStore from './StateStore';
import StateProvider from './StateProvider';
import StateConsumer from './StateConsumer';
declare class StateContext {
    static Provider: typeof StateProvider;
    static Consumer: typeof StateConsumer;
    static getStateStore(stateStoreKey: any): StateStore;
}
export default StateContext;
