class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(data) {
        try {
            if (data === undefined || data === null) throw new Error("Data cannot be empty");
            const newNode = new Node(data);

            if (!this.head) {
                this.head = newNode;
            } else {
                let current = this.head;
                while (current.next) current = current.next;
                current.next = newNode;
            }

            this.size++;
        } catch (err) {
            console.error("Append Error:", err.message);
        }
    }

    prepend(data) {
        try {
            if (data === undefined || data === null) throw new Error("Data cannot be empty");
            const newNode = new Node(data);
            newNode.next = this.head;
            this.head = newNode;
            this.size++;
        } catch (err) {
            console.error("Prepend Error:", err.message);
        }
    }

    insertAt(data, index) {
        try {
            if (index < 0 || index > this.size) throw new Error("Invalid index");
            if (data === undefined || data === null) throw new Error("Data cannot be empty");

            if (index === 0) {
                this.prepend(data);
                return true;
            }

            const newNode = new Node(data);
            let current = this.head;
            let previous = null;
            let count = 0;

            while (count < index) {
                previous = current;
                current = current.next;
                count++;
            }

            newNode.next = current;
            previous.next = newNode;
            this.size++;
            return true;
        } catch (err) {
            console.error("Insert Error:", err.message);
            return false;
        }
    }

    removeAt(index) {
        try {
            if (index < 0 || index >= this.size) throw new Error("Invalid index");

            let removedData;
            if (index === 0) {
                removedData = this.head.data;
                this.head = this.head.next;
            } else {
                let current = this.head;
                let previous = null;
                let count = 0;

                while (count < index) {
                    previous = current;
                    current = current.next;
                    count++;
                }

                removedData = current.data;
                previous.next = current.next;
            }

            this.size--;
            return removedData;
        } catch (err) {
            console.error("Remove Error:", err.message);
            return null;
        }
    }

    deleteFront() {
        try {
            if (this.isEmpty()) throw new Error("List is empty");
            const removed = this.head.data;
            this.head = this.head.next;
            this.size--;
            return removed;
        } catch (err) {
            console.error("Delete Front Error:", err.message);
            return null;
        }
    }

    deleteBack() {
        try {
            if (this.isEmpty()) throw new Error("List is empty");

            let removed;
            if (this.size === 1) {
                removed = this.head.data;
                this.head = null;
            } else {
                let current = this.head;
                let previous = null;
                while (current.next) {
                    previous = current;
                    current = current.next;
                }
                removed = current.data;
                previous.next = null;
            }
            this.size--;
            return removed;
        } catch (err) {
            console.error("Delete Back Error:", err.message);
            return null;
        }
    }

    isEmpty() {
        return this.size === 0;
    }

    getSize() {
        return this.size;
    }

    printList() {
        try {
            if (this.isEmpty()) {
                console.warn("List is empty!");
                return;
            }
            let current = this.head;
            let result = '';
            while (current) {
                result += current.data + ' -> ';
                current = current.next;
            }
            result += 'null';
            console.log(result);
        } catch (err) {
            console.error("Print Error:", err.message);
        }
    }
}


const list = new SinglyLinkedList();
list.append(10);
list.append(20);
list.append(30);
list.printList();

console.log("Deleted front:", list.deleteFront());
list.printList();

console.log("Deleted back:", list.deleteBack());
list.printList();

list.prepend(5);
list.printList();

