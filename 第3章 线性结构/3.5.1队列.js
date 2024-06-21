class Queue {
    constructor() {
        this.data = []
    }
    queue(el) {
        this.data.push(el)
    }
    dequeue() {
        return this.data.shift()
    }
    size() {
        return this.data.length
    }
    isEmpty() {
        return this.data.length === 0
    }
    peek() {
        return this.data[0]
    }
}