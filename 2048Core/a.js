var matrix = [],
    size = 4,
    targetVal = 2048;

// main()

function main(row, max) {
    size = row || 4
    targetVal = max || 2048
    init()
}

function init() {
    matrix = newMatrix()
    for (let n = 0; n < 2; n++) {
        insertVal()
    }
}

function checkGameover() {
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            if (matrix[i][j].val == 0) {
                return false;
            }
        }
    }
    var d = [{
        dx: -1,
        dy: 0
    }, {
        dx: 1,
        dy: 0
    }, {
        dx: 0,
        dy: -1
    }, {
        dx: 0,
        dy: 1
    }]
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            for (var k = 0; k < d.length; k++) {
                if (j + d[k].dx >= 0 && j + d[k].dx < size &&
                    i + d[k].dy >= 0 && i + d[k].dy < size &&
                    matrix[i][j].val == matrix[i + d[k].dy][j + d[k].dx].val) {
                    return false;
                }
            }
        }
    }
    return true;
}
/**
 * 新增数据依据： 合并 或者 移动过
 * 游戏结束依据： 没有空余格子 或者 有 max 数产生
 */

/**
 * up: 旋转，然后转为向 left 合并,再旋转
 * right: 直接合并
 * bottom: 旋转，向 right 合并，再旋转
 * left: 反序，向 right 合并，反序
 */

var Move = {
    left: function (arr) {
        return reverseMatrix(this.right(reverseMatrix(arr)))
    },
    right: function (arr) {
        return merge(arr)
    },
    up: function (arr) {
        return rotateMatrix(this.left(rotateMatrix(arr)))
    },
    down: function (arr) {
        return rotateMatrix(this.right(rotateMatrix(arr)))
    }
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    const copy = Array.isArray(obj) ? [] : {}
    Object.keys(obj).forEach(function (key) {
        copy[key] = deepCopy(obj[key])
    })
    return copy
}

function newMatrix() {
    return new Array(size).fill(0).map(function () {
        return new Array(size).fill({
            val: 0
        })
    })
}
/**
 * 
 * 行列进行旋转
 */
function rotateMatrix(arr) {
    const len = arr.length
    const newArr = newMatrix()
    arr.forEach(function (element, row) {
        element.forEach(function (item, col) {
            newArr[col][row] = deepCopy(arr[row][col])
        })
    })
    arr = newArr
    return arr
}
/**
 * 
 * 因为是向右合并的，所以向左合并的时候，需要先 反序 排列，合并之后，再反序回去
 */
function reverseMatrix(arr) {
    arr.forEach(function (element) {
        element.reverse()
    }, this);
    return arr
}
/** 统一转换为向右合并 
 * 不直接操控 原数组
 */
function merge(arr) {
    // 循环处理的行数
    const len = arr.length
    for (let i = 0; i < len; i++) {
        // 每一行做 合并操作，然后去除空格
        let temp = arr[i]
        let row = []
        for (let j = len - 1; j > -1;) {
            if (temp[j].val == 0) {
                j--
                continue
            } else {
                let curIndex = j
                let cur = temp[j].val
                let prev
                if (j === 0) {
                    row.unshift({
                        val: cur, // 值
                        merge: false, // 是否合并，决定元素是否kill或者生成
                        steps: [size - (row.length + 1) - j] // 数组表示 操作元素个数，值表示移动单元格数
                    })
                    // 说明是 最左侧第一个元素, 处理到了最后一个
                    // 应该 移动，移动的距离为 size - row.length - j,但是 j 为 0，可省略
                    break
                }
                do {
                    prev = temp[--curIndex].val
                } while (curIndex > 0 && prev === 0)
                if (prev === 0) {
                    // row.unshift(cur)
                    row.unshift({
                        val: cur,
                        merge: false,
                        steps: [size - (row.length + 1) - j]
                    })
                    // 一直找到最后一个元素，也没有找到有效值
                    // 应该移动，移动距离为 size - row.length - j
                    break
                } else {
                    if (cur === prev) {
                        // 合并
                        row.unshift({
                            val: cur * 2,
                            merge: true,
                            steps: [size - (row.length + 1) - j, size - (row.length + 1) - curIndex]
                        })
                        // 首先这个值 是 由 cur  和 prev 两个值 合并的，
                        // 所以需要针对 cur 和 prev两个值 进行移动操作 然后 kill 清除
                        // 新合成的值 需要 zoom 动画
                        // cur 移动距离为  size - row.length - j
                        // prev 移动距离为  size - row.length - curIndex
                        j = --curIndex
                    } else {
                        row.unshift({
                            val: cur,
                            merge: false,
                            steps: [size - (row.length + 1) - j]
                        })
                        j = curIndex
                        // 找到了有效值，但是不能合并
                        // 当前值应该移动，移动距离为 size - row.length - j
                    }
                }
            }
        }
        arr[i] = new Array(len - row.length).fill({
            val: 0
        }).concat(row)
    }
    return arr
}

function getRandom(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m)
}

function insertVal() {
    const pos = getPos()
    if (pos) {
        matrix[pos.row][pos.col] = {
            val: Math.random() < 0.9 ? 2 : 4
        }
    }
}

function getPos() {
    const temp = []
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].val === 0) {
                temp.push({
                    row: i,
                    col: j
                })
            }
        }
    }
    if (temp.length <= 0) {
        return null
    }
    return temp[getRandom(0, temp.length - 1)]
}

const clsName = {
    2: 't2',
    4: 't4',
    8: 't8',
    16: 't16',
    32: 't32',
    64: 't64',
    128: 't128',
    256: 't256',
    512: 't512',
    1024: 't1024',
    2048: 't2048',
    4096: 't4096',
    8192: 't8192'
}

function render(el) {
    let str = ''
    const wh = (100 / size) + '%'
    for (let i = 0; i < size; i++) {
        str += '<tr>'
        for (let j = 0; j < size; j++) {
            const temp = matrix[i][j].val
            str += '<td class="' + clsName[temp] + '" style="width: ' + wh + '; height: ' + wh + '">' + (temp || '') + '</td>'
        }
        str += '</tr>'
    }
    el.innerHTML = str
}

function clearMatrix() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matrix[i][j] = {
                val: matrix[i][j].val
            }
        }
    }
}

function print() {
    for (let i = 0; i < matrix.length; i++) {
        const arr = []
        for (let j = 0; j < matrix[i].length; j++) {
            arr.push(matrix[i][j].val)
        }
        console.log(arr.join(' '))
    }
}

function isEqual(arr1, arr2) {
    for (let i = 0, len = arr1.length; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr1[i][j].val !== arr2[i][j].val) {
                return false
            }
        }
    }
    return true
}