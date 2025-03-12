import { HuffmanNode } from "./huffmanNode";
export declare class PriorityQueue {
    private items;
    constructor();
    enqueue(element: HuffmanNode): void;
    dequeue(): HuffmanNode | "Underflow" | undefined;
    isEmpty(): boolean;
    getItems(): HuffmanNode[];
}
