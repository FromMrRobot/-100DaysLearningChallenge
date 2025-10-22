# Heap Data Structure

Imagine a data structure that always keeps the most important element at your fingertips. This is **Heap** — a specialized binary tree optimized for **fast access to the minimum or maximum value**. Heaps are widely used in **priority queues, scheduling, and algorithm optimization**.

---

## 1. Understanding Tree Foundations

Before we dive into heaps, we need a solid grasp of **binary trees**.

### 1.1 Binary Tree Basics

A **binary tree** is a tree in which each node has at most **two children**: left and right.

- **Root Node:** Topmost node.
- **Levels:** Nodes organized in levels.

Example:

```
        10  <- Level 0
       /  \
     20    30 <- Level 1
    / \    / \
  40  50 60  70 <- Level 2

```

- Level 0 → 1 node → 2⁰
- Level 1 → 2 nodes → 2¹
- Level 2 → 4 nodes → 2²

---

### 1.2 Complete vs Almost Complete Binary Tree

**Heap structure relies on "almost complete binary trees".**

| Complete Binary Tree | Almost Complete Binary Tree |
| --- | --- |
| All levels completely filled | All levels filled **except possibly last** |
| Last level filled left to right | Last level filled **left to right**, no gaps |

**Why important?**

- Allows **array representation** with zero wasted space.
- Guarantees predictable "bubble up" and "sink down" operations.

---

## 2. Heap Properties: The Two Golden Rules

### 2.1 Rule 1: Structure Property

- Must be an **Almost Complete Binary Tree**.

### 2.2 Rule 2: Heap Property

- **Min-Heap:** Parent ≤ children → Root is **smallest**
- **Max-Heap:** Parent ≥ children → Root is **largest**

Visual:

**Min-Heap Example:**

```
        10
       /  \
     20    15
    /  \
  40    50

```

**Max-Heap Example:**

```
        50
       /  \
     30    40
    /  \
  20    10

```

---

## 3. Heap Operations: Insertion (Bubble Up)

**Insertion Steps:**

1. Add element at the **next available spot** (left to right, bottom level).
2. Compare with parent; **swap if heap property violated**. Repeat until heap property restored.

**Example:** Insert `[50, 42, 17, 60, 90, 37, 70]` into a **min-heap**.

**Step-by-step Build:**

1. Insert `50` → root.

```
50

```

1. Insert `42` → left child of `50`, bubble up → swap:

```
42
 /
50

```

1. Insert `17` → right child of `42`, bubble up → swap:

```
  17
 / \
42  50

```

1. Insert `60` → left child of `42`, no swap.

```
	17
 / \
42 50
/
60

```

1. Insert `90` → right child of `42`, no swap.
2. Insert `37` → left child of `50`, bubble up → swap with `50`:

```
  17
 / \
 42 37
/ \  /
60 90 50

```

1. Insert `70` → right child of `37`, no swap.

**Final Min-Heap:**

```
        17
       /  \
     42    37
    / \   / \
  60  90 50  70

```

---

## 4. Array Representation

Heaps can be stored **efficiently in arrays** because they are almost complete trees.

**Mapping Example:**

```
Heap Tree:

        12
       /  \
     40    25
    / \   / \
  50 60 30  35
 / \
70 65

Array: [12, 40, 25, 50, 60, 30, 35, 70, 65]

```

**Parent / Child formulas (0-indexed array):**

- **Parent:** `(i - 1) // 2`
- **Left Child:** `2 * i + 1`
- **Right Child:** `2 * i + 2`

This eliminates pointers and allows **fast computation of relationships**.

---

## 5. Deletion (Extract Root / Sink Down)

**Steps to remove root:**

1. Swap root with last element.
2. Remove last element (original root).
3. "Sink down" the new root → Swap with smaller (min-heap) or larger (max-heap) child until heap property restored.

**Visual Example:**

```
Original Min-Heap:
        10
       /  \
     20    15
    / \
  40  50

Remove 10:
1. Swap with 50 → new root = 50
2. Sink down → swap with smaller child 15
Final Heap:
        15
       /  \
     20    50
    /
  40

```

---

## 6. Time Complexity

| Operation | Min / Max Heap | Explanation |
| --- | --- | --- |
| Access Root | O(1) | Root always min/max |
| Insert | O(log n) | Bubble up at most tree height |
| Delete Root | O(log n) | Sink down at most tree height |
| Build Heap | O(n) | Heapify from bottom |

---

## 7. Why Heaps Are Useful

- **Priority Queues:** Efficiently fetch highest-priority element.
- **Scheduling Algorithms:** CPU process scheduling.
- **Graph Algorithms:** Dijkstra’s shortest path, Prim’s MST.
- **Streaming Data:** Find running median or top-K elements.

**Key Idea:** Heap is a **perfect interplay of structure + order**, giving **efficiency in insertion, deletion, and access**.

---

## 8. Visual Summary

```
          Root (Min or Max)
          /            \
     Left Child      Right Child
     /      \        /      \
Grandchild  ...   Grandchild ...

```

- **Array storage:** Sequential, level-wise, left to right.
- **Parent-child formulas:** Navigate tree without pointers.
- **Insert → Bubble up**, **Delete → Sink down**

---

### ✅Summary

- Heap = **Almost Complete Binary Tree + Heap Property**.
- Min-heap root = smallest; Max-heap root = largest.
- Stored in arrays → efficient memory + easy navigation.
- Supports priority queue operations in **O(log n)**.

Implementation:

```jsx
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

```