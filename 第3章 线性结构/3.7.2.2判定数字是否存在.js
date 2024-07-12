/**
 * 给出40亿个不重复的unsigned int的整数，没排过序，然后再随机给出一个数
 * 如何快速判断这个数是否在那40亿个数当中？
 */
function isExist(array, num) {
    const bitmap = new BitMap(array);
    return bitmap.get(num) === 1;
}