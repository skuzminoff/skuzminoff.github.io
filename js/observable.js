/**
 * Observable object to subscribe/trigger events
 */
var Observerable = {

    listeners: {},

    addListener: function (object, evt, callback) {
        if (!this.listeners.hasOwnProperty(evt)) {
            this.listeners[evt] = [];
        }
        this.listeners[evt].push(object[callback]);
    },

    removeListener: function (object, evt, callback) {
        if (this.listeners.hasOwnProperty(evt)) {
            var i, length;
            for (i = 0, length = this.listeners[evt].length; i < length; i++) {
                if (this.listeners[evt][i] === object[callback]) {
                    this.listeners[evt].splice(i, 1);
                }
            }
        }
    },

    triggerEvent: function (evt, args) {
        if (this.listeners.hasOwnProperty(evt)) {
            var i, length;
            for (i = 0, length = this.listeners[evt].length; i < length; i++) {
                this.listeners[evt][i](args);
            }
        }
    }
};