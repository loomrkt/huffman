"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityQueue = void 0;
class PriorityQueue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
        var contain = false;
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].freq > element.freq) {
                this.items.splice(i, 0, element);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(element);
        }
    }
    dequeue() {
        if (this.isEmpty())
            return "Underflow";
        return this.items.shift();
    }
    isEmpty() {
        return this.items.length == 0;
    }
    getItems() {
        return this.items;
    }
}
exports.PriorityQueue = PriorityQueue;
