export class BitMap {
  constructor(array) {
    let boxes = this.bits = []; // 创建一个数组用于存储位图的每个盒子
    for(let i=0;i<array.length;i++) {
      let el = array[i]; // 获取数组中的元素
      let box = Math.floor(el/16); // 计算元素所在的盒子
      let index = el%16; // 计算元素在盒子中的索引
      let bit = boxes[box] || 0; // 获取盒子中的位图，如果盒子为空则默认为0
      // 将相应的位变成1
      boxes[box] = this.change1(bit, index); // 将位图中的相应位变为1
    }
  }

  change0(num, index) {
    let mask = 1 << index; // 创建一个掩码，将要修改的位设为0
    return num & ~mask; // 将指定位设为0
  }

  change1(num, index) {
    let mask = 1 << index; // 创建一个掩码，将要修改的位设为1
    return num | mask; // 将指定位设为1
  }

  // 获取某一位的值
  get(digit) {
    let box = Math.floor(digit/16); // 计算位所在的盒子
    let index = digit%16; // 计算位在盒子中的索引
    let bit = this.bits[box]; // 获取盒子中的位图
    return bit === 0 ? 0 : (bit >> index) & 1; // 如果位图为0，则返回0；否则，返回指定位的值
  }

  // 返回一个排好序的整数数组
  toArray() {
    let boxes = this.bits; // 获取位图的盒子数组
    let ret = []; // 创建一个空数组用于存储排序后的整数
    for(let i=0;i<boxes.length;i++) {
      let bit = boxes[i]; // 获取盒子中的位图
      if(bit != 0) { // 如果位图不为0
        for(let j=0;j<16;j++) {
          if((bit >> j) & 1) { // 检查位图中的每一位
            ret.push(i*16+j); // 将位图中为1的位转换为整数，并添加到结果数组中
          }
        } 
      }
    }
    return ret; // 返回排序后的整数数组
  }
}