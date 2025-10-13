class stack{
    constructor(){
        this.item=[]
    }
    push(element)
    {
        try {
            this.item.push(element);
        } catch (error) {
            return error;
        }
    }
    pop()
    {
        
    }
}