class MinHeap {
    constructor() {
        this.heap = [];
    }

    // ---------------- Utility Functions ----------------
    size() {
        return this.heap.length;
    }

    peek() {
        return this.size() === 0 ? null : this.heap[0];
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }

    getLeftChildIndex(index) {
        return 2 * index + 1;
    }

    getRightChildIndex(index) {
        return 2 * index + 2;
    }

    // ---------------- Core Heap Operations ----------------
    bubbleUp(index) {
        let currentIndex = index;
        while (currentIndex > 0) {
            const parentIndex = this.getParentIndex(currentIndex);
            if (this.heap[currentIndex] < this.heap[parentIndex]) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else break;
        }
    }

    sinkDown(index) {
        let currentIndex = index;
        const lastIndex = this.size() - 1;

        while (true) {
            const leftIndex = this.getLeftChildIndex(currentIndex);
            const rightIndex = this.getRightChildIndex(currentIndex);
            let smallest = currentIndex;

            if (leftIndex <= lastIndex && this.heap[leftIndex] < this.heap[smallest]) {
                smallest = leftIndex;
            }

            if (rightIndex <= lastIndex && this.heap[rightIndex] < this.heap[smallest]) {
                smallest = rightIndex;
            }

            if (smallest !== currentIndex) {
                this.swap(currentIndex, smallest);
                currentIndex = smallest;
            } else break;
        }
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.size() - 1);
        console.log(`Inserted: ${value} | Heap: [${this.heap.join(', ')}]`);
    }

    extractMin() {
        if (this.size() === 0) return null;
        if (this.size() === 1) return this.heap.pop();

        const minValue = this.heap[0];
        this.swap(0, this.size() - 1);
        this.heap.pop();
        this.sinkDown(0);

        console.log(`Extracted: ${minValue} | New Root: ${this.peek()}`);
        return minValue;
    }
}

// ---------------- Example Usage ----------------
const minHeap = new MinHeap();
const values = [12, 40, 25, 50, 60, 30, 35, 70, 65];

values.forEach(v => minHeap.insert(v));

console.log("\nExtracting elements in ascending order:");
while (minHeap.size() > 0) {
    minHeap.extractMin();
}
