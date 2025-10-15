class Queue {
    #items;

    constructor(iterable = []) {
        if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError("Queue constructor expects an iterable");
        }
        this.#items = Array.from(iterable);
    }

    // Add one or more elements to the queue
    enqueue(...elements) {
        if (elements.length === 0) {
            console.warn("enqueue called with no elements");
            return this;
        }
        this.#items.push(...elements);
        return this; // method chaining
    }

    // Remove and return the front element
    dequeue() {
        if (this.isEmpty()) {
            console.warn("Cannot dequeue from an empty queue");
            return null;
        }
        return this.#items.shift();
    }

    // Get the front element
    get front() {
        if (this.isEmpty()) {
            console.warn("Queue is empty. No front element.");
            return null;
        }
        return this.#items[0];
    }

    // Get the rear element
    get rear() {
        if (this.isEmpty()) {
            console.warn("Queue is empty. No rear element.");
            return null;
        }
        return this.#items[this.#items.length - 1];
    }

    isEmpty() {
        return this.#items.length === 0;
    }

    get size() {
        return this.#items.length;
    }

    clear() {
        if (this.isEmpty()) {
            console.warn("Queue is already empty");
        }
        this.#items = [];
        return this;
    }

    toArray() {
        return [...this.#items]; // safe copy
    }

    peekAll() {
        if (this.isEmpty()) {
            console.log("Queue is empty");
        } else {
            console.log("Queue contents:", this.#items.join(" <- "));
        }
    }
}

// === Test the Queue ===
const queue = new Queue([10, 20, 30]);

console.log("Initial queue:");
queue.peekAll();

console.log("\nEnqueue 40 and 50:");
queue.enqueue(40, 50);
queue.peekAll();

console.log("\nFront element:", queue.front);
console.log("Rear element:", queue.rear);

console.log("\nDequeue an element:", queue.dequeue());
queue.peekAll();

console.log("\nDequeue all elements:");
while (!queue.isEmpty()) {
    console.log("Dequeued:", queue.dequeue());
}

console.log("\nTry dequeue from empty queue:");
queue.dequeue();

console.log("\nTry access front and rear on empty queue:");
console.log("Front:", queue.front);
console.log("Rear:", queue.rear);

console.log("\nQueue size:", queue.size);

console.log("\nClear queue (already empty):");
queue.clear();

console.log("\nAdd new elements after clear:");
queue.enqueue(100, 200);
queue.peekAll();
