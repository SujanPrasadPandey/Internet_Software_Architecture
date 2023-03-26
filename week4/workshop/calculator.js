const display = document.getElementById('display');


function appendValue(value) {
    display.value += value;
}


function clearDisplay() {
    display.value = '';
}


function calculateResult() {
    try {
        const result = eval(display.value);
        display.value = result;
    } catch (error) {
        display.value = 'Invalid expression';
    }
}



document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.value;
        if (buttonValue === 'C') {
            clearDisplay();
        } else if (buttonValue === '=') {
            calculateResult();
        } else {
            appendValue(buttonValue);
        }
    });
});


