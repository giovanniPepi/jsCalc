const body = document.querySelector("body");
const container = document.querySelector(".container")

add = (a, b) => (a + b);
subtract = (a, b) => (a - b);
/* sum = (array) => array.reduce((previous, current) => previous + current, 0);
multiply = (array) => array.reduce((previous, current) => previous * current);
 */
multiply = (a, b) => (a * b);
power = (a, b) => Math.pow(a, b);
factorial = (n) => {
  if (n === 0) return 1; else return n * factorial (n -1);
};
divide = function (a, b) {
    if(b === 0) return "Nice try, fucker";
    return a / b;
}




