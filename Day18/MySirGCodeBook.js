class MinHeap {
    constructor(){
        this.heap=[];
    }
    size(){
        return this.heap.length;
    }
    getParentIndex(index){
        return Math.floor((index-1)/2);
    }
    getLeftChildIndex(index){
        return 2*index+1;
    }
    getRightChildIndex(index){
        return 2*index+2;
    }
    swap(i,j){
        [this.heap[i],this.heap[j]]=[this.heap[j],this.heap[i]];
    }
    bubbleUp(index){
        let currentIndex=index;
        while(currentIndex>0){
            const parentIndex=this.getParentIndex(currentIndex);
            if(this.heap[currentIndex].priority<this.heap[parentIndex].priority){
                this.swap(currentIndex,parentIndex);
                currentIndex=parentIndex;
            }
            else{
                break;
            }
        }
    }
    sinkDown(index){
        let currentIndex=index;
        const lastIndex=this.heap.length-1;

        while(true){
            const leftChildIndex=this.getLeftChildIndex(currentIndex);
            const rightChildIndex=this.getRightChildIndex(currentIndex);
            let swapIndex=null;
            if(leftChildIndex<=lastIndex){
                if(this.heap[leftChildIndex].priority<this.heap[currentIndex].priority){
                    swapIndex=leftChildIndex;
                }
            }
            if(rightChildIndex<=lastIndex){
                const isRightHigherPriority =swapIndex===null || this.heap[rightChildIndex].priority<this.heap[swapIndex].priority;

                if(isRightHigherPriority){
                    swapIndex=rightChildIndex;
                }
                
            }
            if(swapIndex===null)
                break;

            this.swap(currentIndex,swapIndex);
            currentIndex=swapIndex;
        }
    }
    insert(value){
        this.heap.push(value);
        this.bubbleUp(this.heap.length-1);
    }

    extractMin(){
        if(this.heap.length===0){
            return null;
        }
        if(this.heap.length===1){
            return this.heap.pop();
        }
        this.swap(0,this.heap.length-1);
        const minValue=this.heap.pop();
        this.sinkDown(0);
        return minValue;
    }
    peek(){
        return this.heap.length===0?null:this.heap[0];
    }
}

class PriorityQueue {
    constructor(){
        this.minHeap=new MinHeap();
    }
    isEmpty(){
        return this.minHeap.size()===0;
    }
    size(){
        return this.minHeap.size();
    }
    enqueue(data,priority){
        const newItem={data,priority};
        this.minHeap.insert(newItem);
    }
    dequeue(){
        return this.minHeap.extractMin();
    }
    peek(){
        return this.minHeap.peek();
    }
}

const taskQueue=new PriorityQueue();
taskQueue.enqueue("Fix shower",7);
taskQueue.enqueue("Market",3);
taskQueue.enqueue("Vacation plan",1);
taskQueue.enqueue("Email to boss",6);
taskQueue.enqueue("meeting with an old friend",5);
taskQueue.enqueue("Go on a Date",4);



while(!taskQueue.isEmpty()){
    nextTask=taskQueue.dequeue();
    console.log('Extracted task:'+nextTask.data+' Priority: ',nextTask.priority);
}
