import StateStore from './StateStore';
import StateStoreGlobal from './StateStoreGlobal';
import StateProvider from './StateProvider';
import StateConsumer from './StateConsumer';


class StateContext {

  public static Provider = StateProvider;
  public static Consumer = StateConsumer;

  public static getStateStore (stateStoreKey): StateStore {
    return StateStoreGlobal.getStateStoreByKey(stateStoreKey);
  }
}

export default StateContext;