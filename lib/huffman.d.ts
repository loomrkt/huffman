import { HuffmanNode } from "./utils/huffmanNode";
export declare class Huffman {
    root: HuffmanNode | null;
    constructor();
    getFrequency(str: string): Map<any, any>;
    createHuffmanTree(dataFreq: Map<string, number>): HuffmanNode | null;
    printCodes(node: HuffmanNode | null, str: string): void;
    createLibrary(node: HuffmanNode | null, str: string, lib: Map<string, string>): void;
    encode(str: string): string;
    decode(encodedString: string, lib: Map<string, string>): string;
}
