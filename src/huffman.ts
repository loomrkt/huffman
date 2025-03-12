import { HuffmanNode } from "./utils/huffmanNode";
import { PriorityQueue } from "./utils/PriorityQueue";
// creating object for queue class
let priorityQueue = new PriorityQueue();

export class Huffman {
    root: HuffmanNode | null;
    
    constructor() {
        this.root = null;
    }

    // Function to get the frequency of each character in the string
    getFrequency(str: string) {
        let freq = new Map();
        for (let i = 0; i < str.length; i++) {
            if (freq.has(str[i])) {
                freq.set(str[i], freq.get(str[i]) + 1);
            } else {
                freq.set(str[i], 1);
            }
        }
        return freq;
    }

    // Huffman tree creation
    createHuffmanTree(dataFreq: Map<string, number>) {
        // Create a priority queue to store nodes
        for (let [key, value] of dataFreq) {
            let node = new HuffmanNode(key, value);
            priorityQueue.enqueue(node);
        }

        // Iterate through the priority queue until only one node is left
        while (priorityQueue.getItems().length > 1) {
            let left = priorityQueue.dequeue() as HuffmanNode;
            let right = priorityQueue.dequeue() as HuffmanNode;

            if (!left || !right) {
                throw new Error("Priority queue returned an invalid node");
            }

            let sum = left.freq + right.freq;
            let newNode = new HuffmanNode(null, sum);
            newNode.left = left;
            newNode.right = right;

            priorityQueue.enqueue(newNode);
        }

        const dequeuedNode = priorityQueue.dequeue();
        if (dequeuedNode === undefined || dequeuedNode === "Underflow") {
            this.root = null;
        } else {
            this.root = dequeuedNode;
        }

        return this.root;
    }

    // Function to print the huffman codes from the root of Huffman Tree
    printCodes(node: HuffmanNode | null, str:string) {
        if (node == null) {
            return;
        }
        if (node.data != null) {
            console.log(node.data + " : " + str);
            return;
        }

        this.printCodes(node.left, str + "0");
        this.printCodes(node.right, str + "1");
    }

    // function pour cree un librairie de code
    createLibrary(node:HuffmanNode| null, str:string, lib:Map<string, string>) {
        if (node == null) {
            return;
        }
        if (node.data != null) {
            lib.set(node.data, str);
            return;
        }

        this.createLibrary(node.left, str + "0", lib);
        this.createLibrary(node.right, str + "1", lib);
    }
    
    // Function to encode the string
    encode(str: string) {
        let lib = new Map();
        this.createLibrary(this.root, '', lib);
        
        let encodedString = '';
        for (let i = 0; i < str.length; i++) {
            encodedString += lib.get(str[i]);
        }
        return encodedString;
    }

    // Function to decode the string
    decode(encodedString: string, lib: Map<string, string>): string {
        // Création du dictionnaire inversé et collecte des longueurs
        const reversedLib = new Map<string, string>();
        const lengths = new Set<number>(); // Pour stocker les longueurs uniques
    
        for (const [decodedChar, encodedStr] of lib) {
            reversedLib.set(encodedStr, decodedChar);
            lengths.add(encodedStr.length);
        }
    
        // Tri des longueurs en ordre décroissant
        const sortedLengths = Array.from(lengths).sort((a, b) => b - a);
        let decodedString = '';
        let i = 0;
    
        while (i < encodedString.length) {
            let found = false;
    
            // Vérification des sous-chaînes par longueur décroissante
            for (const l of sortedLengths) {
                const end = i + l;
                if (end > encodedString.length) continue;
    
                const substring = encodedString.substring(i, end);
                if (reversedLib.has(substring)) {
                    decodedString += reversedLib.get(substring);
                    i = end;
                    found = true;
                    break;
                }
            }
    
            if (!found) {
                throw new Error(`Aucun symbole trouvé pour la position ${i}`);
            }
        }
    
        return decodedString;
    }
}