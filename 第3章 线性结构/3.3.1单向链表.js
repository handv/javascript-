class List {
    constructor() { 
        this.head = null; 
        this.length = 0; 
    }
    size() {
        return this.length;
    }
    clear() {
        this.head = null;
        this.length = 0;
    }
    forEach(cb) {
        let node = this.head;
        let i = 0;
        while(node) {
            cb(node, i);
            node = node.next;
            i++;
        }
    }
    findIndex(index) {
        let node = this.head;
        let i = 0;
        while(node) {
            if (i === index) {
                return node;
            }
            node = node.next;
            i++;
        }
        return null;
    }
    insertAt(index, value) {
        if (index < 0 || index > this.length) {
            return false;
        }
        let newNode = new Node(value);
        if (index === 0) {
            newNode.next = this.head;
            this.head = newNode;
        } else {
            let prevNode = this.findIndex(index - 1);
            newNode.next = prevNode.next;
            prevNode.next = newNode;
        }
        this.length++;
        return true;
    }
    removeAt(index) { 
        if (index < 0 || index >= this.length) {
            return false;
        }
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let prevNode = this.findIndex(index - 1);
            prevNode.next = prevNode.next.next;
        }
        this.length--;
        return true;
    }
}