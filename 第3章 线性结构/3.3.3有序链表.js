import { DoubleList } from "./3.3.2双向链表";

let useByInsert = {};
class SortedList extends DoubleList {
    find(value, second) {
        let node = this.head;
        let i = 0;
        while(node) {
            // useByInsert是一个空对象，用于区分find和insert
            if(second === useByInsert ? node.data > value : node.data === value) {
                return node;
            }
            node = node.next;
            i++;
        }
    }
    insert(value) {
        // 找到插入位置
        let next = this.find(value, useByInsert);
        let node = new Node(value);
        if(!next) {
            let last = this.tail;
            // 如果链表为空
            this.tail = node;
            if(last) {
                last.next = node;
                node.prev = last;
            }else {
                // 如果链表为空
                this.head = node;
            }
        } else {
            let prev = next.prev;
            if(prev) {
                prev.next = node;
                node.prev = prev;
            } else {
                // 如果插入位置是头部
                this.head = node;
            }
            node.next = next;
            next.prev = node;
        }
        this.length++;
    }
    remove(value) {
        let node = this.find(value);
        if(node) {
            let prev = node.prev;
            let next;
            if(!prev) {
                this.head = node.next;
                next = node.next;
            }else {
                prev.next = node.next;
                next = node.next;
            }
            if(next) {
                next.prev = prev;
            }else {
                // todo: 这里是prev还是next
                this.tail = prev;
            }
            this.length--;
            return true;
        }
        return false;
    }
}

// @test
const list = new SortedList();
list.insert(111);
list.insert(222);
list.insert(333);
list.insert(222);
list.insert(444);
list.insert(777);
list.remove(666);
list.forEach(node => console.log(node.data));
console.log(list.size());

list.remove(111);
list.insert(334);
list.remove(777);
list.remove(333);
list.remove(666); // 看结果是否正确
list.forEach(node => console.log(node.data));