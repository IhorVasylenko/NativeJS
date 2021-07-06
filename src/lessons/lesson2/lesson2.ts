import {log} from "util";

console.log('lesson 2');

// Lexical environment
// http://jsflow.org/docs/lex-env/

//// Closure
// https://learn.javascript.ru/closure
// https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F-%D0%B2-javascript-%D1%80%D0%B0%D0%B7-%D0%B8-%D0%BD%D0%B0%D0%B2%D1%81%D0%B5%D0%B3%D0%B4%D0%B0-c211805b6898
// https://www.youtube.com/watch?v=pahO5XjnfLA

//// Сurrying
// https://learn.javascript.ru/currying-partials
// https://medium.com/@stasonmars/%D0%BF%D0%BE%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D0%BC-%D0%BA%D0%B0%D1%80%D1%80%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B2-javascript-5ec4a1d88827

// Pattern Module
// https://habr.com/ru/company/ruvds/blog/419997/

// Recursion
// https://learn.javascript.ru/recursion
// https://www.youtube.com/watch?v=Kuq6oIN3PH0


// function(class), anonimus block code, loops, conditions, switch, try/catch, if/else - создают область видимости
// обьекты !!!!! не создают область видимости


// Task 01
// Реализовать функцию sum которая суммирует 2 числа следующим образом sum(3)(6) === 9

function sum(n: number) {
    return function (n2: number) {
        return n + n2;
    }
}
// console.log(sum(3)(6)) // 9



// Task 02
// Реализовать функцию makeCounter которая работает следующим образом:
// const counter = makeCounter();
// counter(); // 1
// counter(); // 2
// const counter2 = makeCounter();
// counter2(); // 1
// counter(); // 3

function makeCounter () {
    let count = 0;
    return function () {
        return ++count;
    }
}
const counter = makeCounter();
counter(); // 1
// console.log(counter()); // 2

const counter2 = makeCounter();
counter2();
counter2();
counter2();
// console.log(counter2()); // 4
// console.log(counter()); // 3



// Task 03
// Переписать функцию из Task 02 так, что бы она принимала число в качестве аргумента и это число было стартовым значением счетчика
// и возвращала следующий объект методов:
// increase: +1
// decrease: -1
// reset: установить счетчик в 0;
// set: установить счетчик в заданное значение;

function makeCounter2(n: number) {
    let counter = n;
    return {
        increase: () => ++counter,
        decrease: () => --counter,
        reset: () => {
            counter = 0;
            return counter;
        },
        set: (num: number) => {
            counter = num;
            return counter;
        },
        getCount: () => counter,
    };
}



// Task 04*
// Реализовать функцию superSum которая принимает число в качестве аргумента, которое указывает на количество слагаемых
// и что бы корректно работали следующие вызовы:
// 1) superSum(0) //0
// 2) superSum(3)(2)(5)(3) //10
// 3) superSum(3)(2)(5,3) //10
// 4) superSum(3)(2,5,3) //10
// 5) superSum(3)(2,5)(3) //10
// 6) superSum(3)(2,5)(3,9) //10

function superSum(num: number) {
    if (num <= 0) return 0;
    if (num === 1) return (n: number) => n;

    let _arguments: number[] = [];

    function helper(...args: number[]) {
        _arguments = [..._arguments, ...args];
        if (_arguments.length >= num) {
            _arguments.length = num;
            return _arguments.reduce((acc, item) => acc + item);
        } else {
            return helper;
        }
    }
    return helper;
}
// @ts-ignore
// console.log(superSum(3)(2)(5)(3)) // 10
// @ts-ignore
// console.log(superSum(3)(2)(5, 3)) // 10
// @ts-ignore
// console.log(superSum(3)(2, 5, 3)) // 10
// @ts-ignore
// console.log(superSum(3)(2,5)(3,9) // 10

// P.S. типизируйте только аргументы, а при вызове функции используйте @ts-ignore



// Task 05
// решить все задачи по рекурсии которые даны в конце статьи https://learn.javascript.ru/recursion
function sumTo(arg: number) {
    let result = 0;
    for ( let i = arg; i>= 1; i--) {
        result +=i;
    }
    return result
}
// console.log(sumTo(100)); //
function sumTo2(arg: number): number {
    if (arg === 1) return arg;
    return arg + sumTo2(arg - 1);
}
// console.log(sumTo2(100)); //
function sumTo3(arg: number, acc: number): number {
    if (arg === 1) return arg + acc;
    return sumTo3(arg - 1, acc + arg);
}
// console.log(sumTo3(100)); // хвостовая рекурсия не будет работать в JS

function factorial (num: number) {
    let sum: number = 1
    for (let i = num; i >= 1; i--) {
        debugger
        sum = sum * i
    }
    return sum
}
// console.log( factorial(5) ); // 120
function factorial2 (num: number): number {
    if (num === 1) return num;
    return num * factorial2(num - 1);

}
// console.log( factorial2(5)); // 120
function factorial3(n: number): number {
    return (n != 1) ? n * factorial(n - 1) : 1;
}
// console.log( factorial3(5) ); // 120

function fib(num: number): number {
    return num <= 1 ? num : fib(num - 1) + fib(num - 2);
}
// console.log(fib(3)); // 2
// console.log(fib(7)); // 13
// console.log(fib(77)); // 5527939700884757
function fib2(num: number): number {
    let a = 1;
    let b = 1;
    for (let i = 3; i <= num; i++) {
        let c = a + b;
        a = b;
        b = c;
    }
    return b;
}
// console.log(fib2(3)); // 2
// console.log(fib2(7)); // 13
// console.log(fib2(77)); // 5527939700884757

let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};
// function printList(obj: any): any {
//     console.log(obj.value);
//     if (obj.next) {
//         printList(obj.next);
//     }
// };
// printList(list);

// function printList(obj: any): any {
//     let tmp = obj;
//     while (tmp) {
//         console.log(tmp.value);
//         tmp = tmp.next;
//     }
// };
// printList(list);

// function printListReverse(obj: any): any {
//     if (obj.next) {
//         printListReverse(obj.next);
//     }
//     console.log(obj.value);
// };
// printListReverse(list);

function printListReverse(obj: any): any {
    let arr = [];
    let tmp = obj;
    while (tmp) {
        arr.push(tmp.value);
        tmp = tmp.next;
    }
    for (let i = arr.length - 1; i >= 0; i--) {
        console.log( arr[i] );
    }
};
// printListReverse(list);



// Task 06
// написать функцию, которая повторяет функционал метода flat массива на всю глубину.

function arrFlat (arr: any[]) {
    let value = 1;
    function helper (arr: any[]) {
        for ( let i = 0; i <= arr.length; i++) {
            if (Array.isArray(arr[i])) {
                helper(arr[i])
                value = value +1
            }
        }
    }
    helper(arr);
    return arr.flat(value)
}
let arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10,[1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]]]]]];
// console.log(arrFlat(arr4))

function arrFlat2 (arr: any[]) {
    return((arr).join().split(',').map(Number))
}
let arr5 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10,[1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]]]]]];
// console.log(arrFlat2(arr5))



// just a plug
export default () => {};