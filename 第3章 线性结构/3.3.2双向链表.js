class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
export class DoubleList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    size() {
        return this.length;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    findIndex(index) {
        let n = this.length;
        if (index > n) {
            throw `${index}超出链表长度${n}`;
        }
        // 判定查找方向
        let dir = index > (n >> 1);
        let node = dir ? this.tail : this.head;
        let prop = dir ? 'prev' : 'next';
        let add = dir ? -1 : 1;
        let i = dir ? n - 1 : 0;
        while(node) {
            if (i === index) {
                return node;
            }
            node = node[prop];
            i += add;
        }
        return null;
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
    insertAt(index, value) {
        if (index < 0 || index > this.length) {
            return false;
        }
        let newNode = new Node(value);
        if (index === 0) {
            if (this.head) {
                this.head.prev = newNode;
                newNode.next = this.head;
            } else {
                this.tail = newNode;
            }
            this.head = newNode;
        } else if (index === this.length) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        } else {
            let prevNode = this.findIndex(index - 1);
            if (prevNode !== null) {
                newNode.next = prevNode.next;
                newNode.prev = prevNode;
                if (prevNode.next !== null) {
                    prevNode.next.prev = newNode;
                }
                prevNode.next = newNode;
            }
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
            if (this.head) {
                this.head.prev = null;
            }
        } else if (index === this.length - 1) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            const prevNode = this.findIndex(index - 1);
            if (prevNode !== null) {
                prevNode.next = prevNode.next.next;
                if (prevNode.next !== null) {
                    prevNode.next.prev = prevNode;
                }
            }
        }
        this.length--;
        return true;
    }
}


// @test
const list = new DoubleList();
list.insertAt(0, 111);
list.insertAt(1, 222);
list.insertAt(1, 333);
list.insertAt(3, 444);
list.insertAt(4, 555);
list.insertAt(5, 666);
list.forEach((node, i) => {
    console.log(node.data, i);
});

try {
    list.insert(8, 333)
} catch (error) {
    console.log(error);
}

list.removeAt(1);
list.forEach((node, i) => {
    console.log(node.data, i);
});
    
}