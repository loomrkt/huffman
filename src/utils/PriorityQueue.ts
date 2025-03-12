import { HuffmanNode } from "./huffmanNode";

export class PriorityQueue {

    private items: HuffmanNode[];

    constructor() {
        this.items = [];
    }

    enqueue(element: HuffmanNode) {
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