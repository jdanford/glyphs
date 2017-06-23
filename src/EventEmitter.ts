type EventKey = string|RegExp;

interface EventMap {
    [evt: string]: EventKey;
}

type Events = EventKey|EventMap;

interface Listener {
    listener: Function;
    once: boolean;
}

type MaybeListener = Function|Listener;

interface ListenerMap {
    [evt: string]: Listener[];
}

type Listeners = Listener[]|ListenerMap;

/**
 * Class for managing events.
 * Can be extended to provide event functionality in other classes.
 */
export class EventEmitter {
    private _onceReturnValue: any;
    private _events: ListenerMap;

    on = this.addListener.bind(this);
    once = this.addOnceListener.bind(this);
    off = this.removeListener.bind(this);
    removeAllListeners = this.removeEvent.bind(this);
    trigger = this.emitEvent.bind(this);

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     */
    getListeners(evt: EventKey): Listeners {
        let events = this._getEvents();

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            let response: ListenerMap = {};
            Object.keys(events).forEach(key => {
                if (evt.test(key)) {
                    response[key] = events[key];
                }
            });

            return response;
        }

        return events[evt] || (events[evt] = []);
    }

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     */
    flattenListeners(listeners: Listener[]) {
        let flatListeners = [];

        for (let i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    }

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     */
    getListenersAsObject(evt: EventKey): ListenerMap {
        let listeners = this.getListeners(evt);

        if (listeners instanceof Array) {
            let response: ListenerMap = {};
            response[evt.toString()] = listeners;
            return response;
        }

        return listeners;
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     */
    addListener(evt: EventKey, listener: MaybeListener): this {
        let listeners = this.getListenersAsObject(evt);

        Object.keys(listeners).forEach(key => {
            let listenerArray = listeners[key];
            if (indexOfListener(listenerArray, listener) === -1) {
                listenerArray.push(typeof listener === 'object' ? listener : {
                    listener: listener,
                    once: false
                });
            }
        });

        return this;
    }

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     */
    addOnceListener(evt: EventKey, listener: Function): this {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    }

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     */
    defineEvent(evt: EventKey): this {
        this.getListeners(evt);
        return this;
    }

    /**
     * Uses defineEvent to define multiple events.
     */
    defineEvents(evts: EventKey[]): this {
        for (let i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }

        return this;
    }

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     */
    removeListener(evt: EventKey, listener: Function): this {
        let listeners = this.getListenersAsObject(evt);

        Object.keys(listeners).forEach(key => {
            let index = indexOfListener(listeners[key], listener);

            if (index !== -1) {
                listeners[key].splice(index, 1);
            }
        });

        return this;
    }

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     */
    addListeners(evt: Events, listeners: Function[]): this {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    }

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     */
    removeListeners(evt: Events, listeners: Function[]): this {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    }

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     */
    manipulateListeners(remove: boolean, evt: Events, listeners: Function[]): this {
        let single = remove ? this.removeListener : this.addListener;
        let multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            Object.keys(evt).forEach(i => {
                let value = evt[i];
                if (value) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            });
        } else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            let i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    }

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     */
    removeEvent(evt: EventKey): this {
        let type = typeof evt;
        let events = this._getEvents();

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt.toString()];
        } else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            Object.keys(events).forEach(key => {
                if (evt.test(key)) {
                    delete events[key];
                }
            });
        } else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    }

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     */
    emitEvent(evt: EventKey, args?: any[]): this {
        let listenersMap = this.getListenersAsObject(evt);

        Object.keys(listenersMap).forEach(key => {
            let listeners = listenersMap[key].slice(0);

            for (let i = 0; i < listeners.length; i++) {
                // If the listener returns true then it shall be removed from the event
                // The function is executed either with a basic call or an apply if there is an args array
                let listener = listeners[i];

                if (listener.once === true) {
                    this.removeListener(evt, listener.listener);
                }

                let response = listener.listener.apply(this, args || []);

                if (response === this._getOnceReturnValue()) {
                    this.removeListener(evt, listener.listener);
                }
            }
        });

        return this;
    }

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     */
    emit(evt: EventKey): this {
        let args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    }

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     */
    setOnceReturnValue(value: any): this {
        this._onceReturnValue = value;
        return this;
    }

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     */
    private _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        } else {
            return true;
        }
    }

    /**
     * Fetches the events object and creates one if required.
     */
    private _getEvents(): ListenerMap {
        return this._events || (this._events = {});
    };
}

/**
 * Finds the index of the listener for the event in its storage array.
 */
function indexOfListener(listeners: Listener[], listener: MaybeListener) {
    let i = listeners.length;
    while (i--) {
        if (listeners[i].listener === listener) {
            return i;
        }
    }

    return -1;
}
