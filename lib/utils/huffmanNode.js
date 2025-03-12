"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HuffmanNode = void 0;
class HuffmanNode {
    constructor(data, freq) {
        this.data = data;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}
exports.HuffmanNode = HuffmanNode;
