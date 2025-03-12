"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCompressor = void 0;
const fs_1 = __importDefault(require("fs"));
const huffman_1 = require("./huffman");
class fileCompressor {
    constructor() {
        this.lib = new Map();
    }
    bitsToBytes(bitString) {
        const bitLength = bitString.length.toString(16).padStart(8, '0'); // Stocker la taille (8 caractères hex)
        const byteArray = [...Buffer.from(bitLength, 'hex')]; // Ajouter la longueur en tête
        for (let i = 0; i < bitString.length; i += 8) {
            const byte = bitString.slice(i, i + 8).padEnd(8, '0'); // Compléter à 8 bits
            byteArray.push(parseInt(byte, 2)); // Convertir en octet
        }
        return Buffer.from(byteArray);
    }
    bytesToBits(byteArray) {
        const lengthHex = byteArray.slice(0, 4).toString('hex'); // Récupérer la longueur
        const bitLength = parseInt(lengthHex, 16); // Convertir en entier
        const bitString = Array.from(byteArray.slice(4), byte => byte.toString(2).padStart(8, '0')).join('');
        return bitString.slice(0, bitLength); // Enlever les bits de padding
    }
    compressFile(inputFile, outputFile) {
        outputFile = outputFile || inputFile.substring(0, inputFile.lastIndexOf('.')) + '.huf';
        this.data = fs_1.default.readFileSync(inputFile);
        this.str = this.data.toString('binary');
        // Étape 1: Générer les données Huffman en premier
        this.huffman = new huffman_1.Huffman();
        this.freq = this.huffman.getFrequency(this.str); // Initialisation ici
        this.root = this.huffman.createHuffmanTree(this.freq);
        this.huffman.createLibrary(this.root, '', this.lib);
        this.encodedString = this.huffman.encode(this.str);
        // Étape 2: Créer le header avec this.freq désormais disponible
        const lastDotIndex = inputFile.lastIndexOf('.');
        const extension = lastDotIndex === -1 ? '' : inputFile.substring(lastDotIndex + 1);
        const extensionBuffer = Buffer.from(extension, 'binary');
        const headerParts = [];
        // Extension
        headerParts.push(Buffer.from([extensionBuffer.length]));
        headerParts.push(extensionBuffer);
        // Fréquences
        const freqEntries = Array.from(this.freq.entries());
        const freqHeader = Buffer.alloc(2);
        freqHeader.writeUInt16BE(freqEntries.length);
        headerParts.push(freqHeader);
        for (const [char, count] of freqEntries) {
            const charBuffer = Buffer.from(char, 'binary');
            const countBuffer = Buffer.alloc(4);
            countBuffer.writeUInt32BE(count);
            headerParts.push(charBuffer, countBuffer);
        }
        // Assemblage final
        const header = Buffer.concat(headerParts);
        const encodedData = this.bitsToBytes(this.encodedString);
        const finalBuffer = Buffer.concat([header, encodedData]);
        fs_1.default.writeFileSync(outputFile, finalBuffer);
    }
    decompressFile(inputFile, outputFile) {
        const data = fs_1.default.readFileSync(inputFile);
        let offset = 0;
        // Lecture de l'extension
        const extLength = data.readUInt8(offset);
        offset += 1;
        const extension = data.slice(offset, offset + extLength).toString('binary');
        offset += extLength;
        // Lecture de la table de fréquence
        const freqCount = data.readUInt16BE(offset);
        offset += 2;
        const freq = new Map();
        for (let i = 0; i < freqCount; i++) {
            const char = data.slice(offset, offset + 1).toString('binary');
            offset += 1;
            const count = data.readUInt32BE(offset);
            offset += 4;
            freq.set(char, count);
        }
        // Reconstruction de l'arbre Huffman
        this.huffman = new huffman_1.Huffman();
        this.root = this.huffman.createHuffmanTree(freq);
        this.huffman.createLibrary(this.root, '', this.lib);
        // Décodage des données
        const encodedData = data.slice(offset);
        this.encodedString = this.bytesToBits(encodedData);
        const decodedString = this.huffman.decode(this.encodedString, this.lib);
        // Ajout de l'extension originale
        const finalOutput = outputFile + (extension ? `.${extension}` : '');
        fs_1.default.writeFileSync(finalOutput, Buffer.from(decodedString, 'binary'));
    }
}
exports.fileCompressor = fileCompressor;
