export const led = {
    plot: (x: number, y: number) => {},
    unplot: (x: number, y: number) => {},
};

export const basic = {
    forever: (fn: () => void) => {},
    showString: (text: string) => {},
};

// export const console = {
//     log: (message: string) => console.log(message),
//     logValue: (key: string, value: number) => console.log(key + ': ' + value),
// };

export const pins = {
    analogReadPin: (pin: number) => 500,
};

export const AnalogPin = {
    P0: 0,
    P1: 1,
    P2: 2,
};

export const maqueen = {
    writeLED: (led: number, state: 0 | 1) => console.log('Write LED'),
    LED: {
        LEDLeft: 0,
        LEDRight: 1,
    },
    MotorRun: (motor: number, direction: number, speed: number) => {},
    aMotors: {
        M1: 0,
        M2: 1,
    },
    Dir: {
        CCW: 0,
        CW: 1,
    },
};

export const input = {
    onButtonPressed: (buttonID: number, callback: () => void) => {},
};

export const Button = {
    A: 0,
    B: 1,
};

export const radio = {
    setGroup: (group: number) => console.log('Setting Group'),
    onReceivedString: (callback: (receivedString: string) => void) => {},
    sendString: (message: string) => console.log('Sending string'),
};
