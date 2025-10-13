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

    getSize() {
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

function print(obj) { 
    let s = obj.clone(); 
    while (!s.isEmpty()) {
        console.log(s.peek() + " "); 
        s.pop();
    }
}

// Usage
const st = new stack();
st.push(20);
st.push(30);
st.push(492);

print(st);        
console.log(st.getSize()); 

st.pop();           
print(st);          
