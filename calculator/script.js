function press(val) {
    const display = document.getElementById('display');
    display.value += val;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    let display = document.getElementById('display');
    try {
        display.value = eval(parseFunction(display.value));
    } catch (e) {
        display.value = 'Error';
    }
}

function plotFunction() {
    const inputFunc = parseFunction(document.getElementById('display').value);
    let xValues = [];
    let yValues = [];

    for (let x = -10; x <= 10; x += 0.1) {
        try {
            const tempX = x;
            yValues.push(eval(inputFunc.replace(/x/g, tempX.toString())));
            xValues.push(x);
        } catch (error) {
            alert('Invalid function. Please use "x" as the variable.');
            return;
        }
    }

    const trace = {
        x: xValues,
        y: yValues,
        type: 'scatter'
    };

    const data = [trace];
    Plotly.newPlot('plot', data, { title: 'Function Plot' });
}

function calculateLoanPayment() {
    const principal = parseFloat(document.getElementById('principal').value);
    const interest = parseFloat(document.getElementById('interest').value) / 100 / 12;
    const periods = parseFloat(document.getElementById('periods').value);

    if(isNaN(principal) || isNaN(interest) || isNaN(periods)) {
        document.getElementById('paymentResult').innerHTML = 'Please fill all fields correctly!';
        return;
    }

    const payment = (principal*interest) / (1 - Math.pow(1 + interest, -periods));
    document.getElementById('paymentResult').innerHTML = `Monthly Payment: $${payment.toFixed(2)}`;
}

function parseFunction(func) {

    func = func.replace(/\^/g, '**');

    func = func.replace(/sqrt\(/g, 'Math.sqrt(');

    func = func.replace(/\bln\(/g, 'Math.log(');

    func = func.replace(/\bsinh\(/g, 'Math.sinh(');
    func = func.replace(/\bcosh\(/g, 'Math.cosh(');
    func = func.replace(/\btanh\(/g, 'Math.tanh(');

    func = func.replace(/\basinh\(/g, 'Math.asinh(');
    func = func.replace(/\bacosh\(/g, 'Math.acosh(');
    func = func.replace(/\batanh\(/g, 'Math.atanh(');

    func = func.replace(/\bsin\(/g, 'Math.sin(');
    func = func.replace(/\bcos\(/g, 'Math.cos(');
    func = func.replace(/\btan\(/g, 'Math.tan(');

    func = func.replace(/\basin\(/g, 'Math.asin(');
    func = func.replace(/\bacos\(/g, 'Math.acos(');
    func = func.replace(/\batan\(/g, 'Math.atan(');

    func = func.replace(/\bexp\(/g, 'Math.exp(');
    func = func.replace(/\blog\(/g, 'Math.log(');  
    func = func.replace(/\blog10\(/g, 'Math.log10(');

    func = func.replace(/\bpi\b/g, 'Math.PI');
    func = func.replace(/\be\b/g, 'Math.E');

    return func;
}

