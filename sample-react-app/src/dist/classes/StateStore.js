import EventEmitter from 'events';
const StateStoreReservedKeys = ['asyncState'];
class StateStore extends EventEmitter {
    constructor(reactiveProperties) {
        super();
        this.reactivePropertiesList = [];
        this.reactiveRequestPropertiesList = [];
        this.cachedStateSnapshot = undefined;
        this.requestProcessingSnapshots = {};
        const wrapUpdate = (updateFunction) => {
            return (newValue) => {
                this.cachedStateSnapshot = undefined;
                this.requestProcessingSnapshots = {};
                updateFunction(newValue);
            };
        };
        Object.keys(reactiveProperties).forEach((propName) => {
            // the "asyncState" property is a reservered word so we ignore it and process regular reactiveProperties
            if (propName !== 'asyncState') {
                // property
                this[propName] = reactiveProperties[propName];
                this.reactivePropertiesList.push(propName);
                // property update method
                this[`${propName}Update`] = wrapUpdate((newValue) => {
                    this[propName] = newValue;
                    this.emit('update', this[propName]);
                    this.emit(`${propName}Updated`, this[propName]);
                });
            }
        });
        if (reactiveProperties.asyncState && typeof reactiveProperties.asyncState === 'object') {
            // here is where we look for the reserverd word of asyncState and process them with additional observables for async behavior
            Object.keys(reactiveProperties.asyncState).forEach((propName) => {
                // asyncState property
                this[propName] = reactiveProperties.asyncState[propName];
                this.reactivePropertiesList.push(propName);
                this.reactiveRequestPropertiesList.push(propName);
                // asyncState property update method
                this[`${propName}Update`] = wrapUpdate((newValue) => {
                    this[propName] = newValue;
                    this.emit('update', this[propName]);
                    this.emit(`${propName}Updated`, this[propName]);
                });
                // asyncState error property and default to false
                this[`${propName}Error`] = false;
                this.reactivePropertiesList.push(`${propName}Error`);
                this.reactiveRequestPropertiesList.push(`${propName}Error`);
                // asyncState error property update method
                this[`${propName}ErrorUpdate`] = wrapUpdate((newValue) => {
                    this[`${propName}Error`] = newValue;
                    this.emit('update', this[`${propName}Error`]);
                    this.emit(`${propName}ErrorUpdated`, this[`${propName}Error`]);
                });
                // asyncState loading property and default to false
                this[`${propName}Loading`] = false;
                this.reactivePropertiesList.push(`${propName}Loading`);
                this.reactiveRequestPropertiesList.push(`${propName}Loading`);
                // asyncState loading property update method
                this[`${propName}LoadingUpdate`] = wrapUpdate((newValue) => {
                    this[`${propName}Loading`] = newValue;
                    this.emit('update', this[`${propName}Loading`]);
                    this.emit(`${propName}LoadingUpdated`, this[`${propName}Loading`]);
                });
            });
        }
    }
    getStateSnapshot() {
        if (this.cachedStateSnapshot === undefined) {
            this.cachedStateSnapshot = this.reactivePropertiesList.reduce((props, propName) => {
                props[propName] = this[propName];
                return props;
            }, {});
            this.stateIsDirty = false;
        }
        return this.cachedStateSnapshot;
    }
    // create an immutable copy of state for react's change detection
    get() {
        return JSON.parse(JSON.stringify(this.getStateSnapshot()));
    }
    /**
     * This method is convenient for locking down behavior when some async process is going on. It can be scoped to a subset of the requestFlag properties
     * requestPropertiesFilterString - a string that contains . seperated property keys to filter on 'isCloning.isUpdating'
     */
    isRequestProcessing(requestPropertiesFilterString) {
        if (this.requestProcessingSnapshots[requestPropertiesFilterString] === undefined) {
            this.requestProcessingSnapshots[requestPropertiesFilterString] = this.reactiveRequestPropertiesList.reduce((hasRequestProcessing, asyncProp) => {
                const isRequestPropertyProcessing = requestPropertiesFilterString ? (requestPropertiesFilterString.indexOf(asyncProp) !== -1 && this[asyncProp]) : this[asyncProp];
                return hasRequestProcessing || isRequestPropertyProcessing;
            }, false);
        }
        return this.requestProcessingSnapshots[requestPropertiesFilterString];
    }
    // a way to set a group of state keys at once to avoid listener race conditions
    update(updateConfig) {
        const keys = Object.keys(updateConfig);
        keys.forEach((key) => {
            this[key] = updateConfig[key];
        });
        this.cachedStateSnapshot = undefined;
        this.requestProcessingSnapshots = {};
        keys.forEach((key) => {
            this.emit(`${key}Updated`, this[key]);
        });
        this.emit('update');
    }
    // Sometimes you have modified a nested property and need to trigger a state change at the root level of the property
    triggerUpdate(propertyName) {
        if (this.reactivePropertiesList.includes(propertyName)) {
            this.emit(`updated`, this[propertyName]);
            this.emit(`${propertyName}Updated`);
        }
        else {
            throw new Error(`Attempt to trigger update for property ${propertyName} failed because it is not a registered reactive property`);
        }
    }
    // bind state updates to this component (great for using context api)
    linkToComponentState(statePropertyValue, componentReference) {
        componentReference.state = componentReference.state || {};
        componentReference.state[statePropertyValue] = this.get();
        componentReference.linkReactSimpleState = () => {
            const nextValue = this.get();
            componentReference.setState({
                [statePropertyValue]: this.get()
            });
        };
        this.on('update', componentReference.linkReactSimpleState);
    }
    // used if the component you bind to can get removed (should be run on componentWillUnmount)
    unlinkToComponentState(componentReference) {
        this.removeListener('update', componentReference.linkReactSimpleState);
    }
}
export default StateStore;
export { StateStore, StateStoreReservedKeys };
//# sourceMappingURL=StateStore.js.map