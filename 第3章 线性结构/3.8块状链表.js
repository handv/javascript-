// 没啥用，算法题一般不考
class BlockList {
  constructor() {
    // length表示一共有多少个数据，而不是有多少个块
    this.length = 0;
    this.list = null;
  }

  size() {
    return this.length;
  }

  split(list) {
    let next = list.next;
    let n = list.length;
    let half = n >> 1;
    let newList = [];
    for(let i=half; i<n; i++) {
      // 这里写错了吧，应该是newList[i-half] = list[i];
      newList[i] = list[i];
    }
    list.length = half;
    list.next = newList;
    newList.next = next;
  }

  merge(list, next) {
    let n = list.length;
    let m = next.length;
    for(let i=0;i<m;i++) {
      list[n+i] = next[i];
    }
    list.next = next.next;
  }

  insert(el, list) {
    if(!list) {
      list = this.list;
    }
    // 情况1，从无到有
    if(!list) {
      this.list = [el];
      this.length = 1;
    } else {
      // 情况2，元素恰好在这块的范围内，先插入再考虑分裂
      let max = Math.sqrt(this.length) + 1;
      if (el < list[list.length -1]) {
        let m = 0;
        for(let i=0, n=list.length;i<n;i++) {
          if(el < list[i]) {
            m = i;
            break;
          }
        }
        for(let i=list.length;i>m;i--) {
          list[i+1] = list[i];
        }
        list[m] = el;
        this.length++;
        if(list.length > max) {
          this.split(list);
        }
      } else {
        // 情况3，元素不在这块的范围内，又分为两种情况
        let beyongdLengthLimit = list.length < max;
        // 情况3.1，这块是最后一块且未满，直接插入
        if (beyongdLengthLimit && !list.next) {
          list[list.length] = el;
          this.length++;
          if (this.length >= max) {
            this.split(list);
          }
        } else {
          // 情况3.2，这是中间的块
          this.insert(el, list.next || (list.next = []));
        }
      }
    }
  }

  remove(el, list) {
    if (!list) {
      if(!this.list) {
        return false;
      }
      list = this.list;
    }
    if (el <= list[list.length - 1]) {
      let hasRemove = false;
      let i = 0, n = list.length;
      for(;i<n;i++) {
        if(el === list[i]) {
          list[i] = list[i+1];
          hasRemove = true;
          break;
        }
      }
      if(hasRemove) {
        for(;i<n;i++) {
          list[i] = list[i+1];
        }
        list.length--;
        this.length--;
        let max = Math.sqrt(this.length) / 2;
        if(list.length < max && list.next) {
          this.merge(list, list.next);
        }
        return true;
      }
    } else {
      let next = list.next;
      if (next) {
        return this.remove(el, next);
      }
    }
  }

  forEach(cb, list, index) {
    list = list || this.list;
    index = index || 0;
    if(!list) {
      return;
    }
    for(let i=0,n=list.length;i<n;i++) {
      cb(list[i], index++);
    }
    if(list.next) {
      this.forEach(cb, list.next, index);
    }
  }
}