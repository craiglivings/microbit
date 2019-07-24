input.onButtonPressed(Button.A, function() {
    arrowLeft();
});

input.onButtonPressed(Button.B, function() {
    arrowRight();
});

function arrowCore() {
    clear();
    led.plot(2, 0);
    led.plot(1, 1);
    led.plot(2, 1);
    led.plot(3, 1);
    led.plot(0, 2);
    led.plot(1, 2);
    led.plot(2, 2);
    led.plot(3, 2);
    led.plot(4, 2);
    led.plot(1, 3);
    led.plot(2, 3);
    led.plot(3, 3);
    led.plot(2, 4);
}

function clear() {
    led.unplot(3, 0);
    led.unplot(1, 0);
    led.unplot(3, 4);
    led.unplot(1, 4);
    led.unplot(0, 1);
    led.unplot(0, 3);
    led.unplot(4, 1);
    led.unplot(4, 3);
}

function arrowDown() {
    arrowCore();
    led.plot(3, 0);
    led.plot(1, 0);
}

function arrowUp() {
    arrowCore();
    led.plot(3, 4);
    led.plot(1, 4);
}

function arrowLeft() {
    arrowCore();
    led.plot(4, 1);
    led.plot(4, 3);
}

function arrowRight() {
    arrowCore();
    led.plot(0, 1);
    led.plot(0, 3);
}
