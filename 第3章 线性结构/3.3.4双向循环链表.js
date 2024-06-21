import { DoubleList } from "./3.3.2双向链表";

class CircularLink extends DoubleList {
    forEach(callback) {
        let node = this.head;
        let i = 0;
        while(node) {
            callback(node.data, i);
            node = node.next;
            if(node === this.head) {
                break;
            }
            i++;
        }
    }
    findIndex(index) {
        let n = this.length;
        if(index >= n) {
            return null;
        }
        let dir = index > (n >> 1);
        let node = this.head;
        let first = node;
        let prop = dir ? 'prev' : 'next';
        let add = dir ? -1 : 1;
        let i = dir ? n - 1 : 0;
        while(node) {
            if(i === index) {
                return node;
            }
            node = node[prop];
            i += add;
            if(node === first) {
                // todo: 为什么要return node?
                return node;
            }
        }
        return null;
    }
    
}