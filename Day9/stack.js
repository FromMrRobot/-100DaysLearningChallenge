class stack {
    constructor() {
        this.item = [];
    }

    push(element) {
        this.item.push(element);
    }

    pop() {
        return this.item.pop();
    }

    peek() {
        return this.item[this.item.length - 1];
    }

    size() {
        return this.item.length;
    }

    isEmpty() {
        return this.item.length === 0;
    }

    clone() {
        const copy = new stack();
        copy.item = JSON.parse(JSON.stringify(this.item)); 
        return copy;
    }
}

function iterate(obj) { 
    let s = obj.clone(); 
    let res=""
    while (!s.isEmpty()) {
        res+=(s.peek() + " "); 
        s.pop();
    }
    return res
}

// Usage
const st = new stack();
st.push(20);
st.push(30);
st.push(492);
console.log("Stack: "+iterate(st)); 
console.log(`Size of stack ${st.size()}`); 
st.pop();           
console.log("Stack: "+iterate(st)); 
