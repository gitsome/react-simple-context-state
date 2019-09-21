import { StateStore } from './StateStore';
declare const StateStoreFactory: (stateStoreConfig: object) => (initialStateValues: object) => StateStore;
export default StateStoreFactory;
