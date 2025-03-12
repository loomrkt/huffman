export declare class fileCompressor {
    private data;
    private str;
    private huffman;
    private freq;
    private root;
    private lib;
    private encodedString;
    constructor();
    private bitsToBytes;
    private bytesToBits;
    compressFile(inputFile: string, outputFile?: string): void;
    decompressFile(inputFile: string, outputFile: string): void;
}
