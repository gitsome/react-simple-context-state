/// <reference types="node" />
import EventEmitter from 'events';
export default class StateStore extends EventEmitter {
    private reactivePropertiesList;
    private reactiveRequestPropertiesList;
    private cachedStateSnapshot;
    private requestProcessingSnapshots;
    private stateIsDirty;
    constructor(reactiveProperties: any);
    private getStateSnapshot;
    private get;
    /**
     * This method is convenient for locking down behavior when some async process is going on. It can be scoped to a subset of the requestFlag properties
     * requestPropertiesFilterString - a string that contains . seperated property keys to filter on 'isCloning.isUpdating'
     */
    isRequestProcessing(requestPropertiesFilterString: any): any;
    update(updateConfig: any): void;
    triggerUpdate(propertyName: any): void;
    linkToComponentState(statePropertyValue: any, componentReference: any): void;
    unlinkToComponentState(componentReference: any): void;
}
