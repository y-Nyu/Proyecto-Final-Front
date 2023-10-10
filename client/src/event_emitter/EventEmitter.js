class EventEmitter {
    constructor() {
        this._events = {};
    }

    on(eventName, cb)
    {
        if(this._events[eventName]) throw Error("This event already exists");
        

        if(!cb || typeof cb != "function") throw Error("Invalid callback argument provided");
        
        this._events[eventName] = cb;
    }

    emit(eventName, data)
    {
        if(!this._events[eventName]) throw Error(`Event of name ${eventName} doesn't exist`);

        this._events[eventName](data)
    }

}

const eventEmitter = new EventEmitter();

export { eventEmitter };