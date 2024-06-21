class Stack {
    constructor() {
        this.data = [];
    }
    pop() {
        return this.data.pop();
    }
    push(el) {
        this.data.push(el);
    }
    size() {
        return this.data.length;
    }
    isEmpty() {
        return this.data.length === 0;
    }
    top() {
        return this.data[this.data.length - 1];
    }
    peek() {
        return this.top();
    }
}

// @test
const stack = new Stack();
stack.push(3);
stack.push(5);
stack.push(8);
stack.push(9);
console.log(stack.top());
stack.pop();
stack.pop();
console.log(stack.size());
