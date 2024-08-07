/**
  有一组数字，从1到n（假设n=10000），
  从中任意删除了3个数，顺序也被打乱，剩余数字放在一个n-3的数组里，
  请找出丢失的数字，要求算法比较快。
*/
import { BitMap } from './3.7.1位图.js';

function missingNumber(nums, a, b) {
  let bitMap = new BitMap(nums);
  const lost = [];
  for(let i=a;i<=b;i++) {
    if(bitMap.get(i) === 0) {
      lost.push(i);
    }
  }
  return lost;
}