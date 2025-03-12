import { fileConversion } from "./fileConversion";

// let str = "huffman coding is a data compression algorithm";

// let huffman = new Huffman();

// let freq = huffman.getFrequency(str);

// console.log('Huffman Tree: ');
// let root = huffman.createHuffmanTree(freq);
// huffman.printCodes(root, '');

// // cree un librairie de code
// let lib = new Map();
// huffman.createLibrary(root, '', lib);
// console.log(lib);

// console.log('Encoded String: ');
// let encodedString = huffman.encode(str);
// console.log(encodedString);

// console.log('Decoded String: ');
// let decodedString = huffman.decode(encodedString, lib);
// console.log(decodedString);

let file = new fileConversion();

// file.compressFile('supabase-schema.png');
file.decompressFile('supabase-schema.huf', 'loom');