export class HuffmanNode {
    data: string | null;
    freq: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;
    constructor(data:string | null, freq:number) {
        this.data = data;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}