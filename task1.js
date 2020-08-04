const readline = require('readline');

const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

reader.on('line', (input) => {
    const output = Array.from(input).reverse().join('');
    console.log(output + '\n');
});