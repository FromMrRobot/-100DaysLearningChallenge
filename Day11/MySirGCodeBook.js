class Queue{
    constructor(){
        this.items=[];
    }
    enqueue(element){
        this.items.push(element);
    }
    dequeue(){
        if(this.isEmpty()){
            return null;
        }
        const removedElement=this.items.shift();
        return removedElement;
    }
    getFront(){
        if(this.isEmpty()){
            return null;
        }
        return this.items[0];
    }
    getRear(){
        if(this.isEmpty()){
            return null;
        }
        return this.items[this.items.length-1];
    }
    isEmpty(){
        return this.items.length===0;
    }
    getSize(){
        return this.items.length;
    }
}

//Test Code
/*
const queue=new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);
console.log("Front="+queue.getFront()+" Rear="+queue.getRear());
const x=queue.dequeue();
console.log("Deleted value="+x);
console.log("Front="+queue.getFront()+" Rear="+queue.getRear());
*/