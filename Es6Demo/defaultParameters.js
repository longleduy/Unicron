import express from 'express';
let sum = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a != 'number' || typeof b != 'number') {
                return reject(new Error('Tham so phai la kieu number SUM'))
            }
            else {
                resolve(a + b);
            }
        }, 1000)
    })
}
let multiply = (c, d) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof c != 'number' || typeof d != 'number') {
                return reject(new Error('Tham so phai la kieu number MULTIPLY'))
            }
            else {
                resolve(c * d);
            }
        }, 1000)
    })
}
// let divide = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (typeof a != 'number' || typeof b != 'number') {
//                 return reject(new Error('Tham so phai la kieu number'))
//             }
//             if (b == 0) {
//                 return reject(new Error('Ma so ko dc bang 0'))
//             }
//             else {
//                 resolve(a / b);
//             }
//         }, 100)
//     })
// }
// let square = (a, b, h) => {
//    return sum(a, b)
//         .then((res) => multiply(res, h))
//         .then((result) => divide(result, 2))
// }
// square(4, 5, 6).then((res2) => {
//     console.log(res2);
// })
//     .catch(err => console.log(err + ''))

//All vs Race

// Promise.all([sum(4,'5'),multiply('4',5)])
//     .then(res=>console.log(res))
//     .catch(err=>console.log(err+''))
Promise.race([sum(4,5),multiply(4,5)])
.then(res=>console.log(res))
.catch(err=>console.log(err+''))
