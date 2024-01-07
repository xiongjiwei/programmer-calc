import React, { useState } from 'react';

const Calculator = () => {
    const keys = ["A", "<<", ">>", "Clear", "Bs", "B", "(", ")", "%", "/", "C", "7", "8", "9", "x", "D", "4", "5", "6", "-", "E", "1", "2", "3", "+", "F", "+/-", "0", ".", "="];

    const [selected, setSelected] = useState('');
    const [inputNum, setInputNum] = useState('0');

    const handleSelect = (value: string) => {
        setSelected(value);
    };

    const calc = (value: string) => {
        if (value === 'Clear') {
            setInputNum('0');
            return;
        }
        if (value === 'Bs') {
            setInputNum(inputNum.slice(0, inputNum.length - 1));
            return;
        }
        if (value === '=') {
            try {
                const result = eval(inputNum);
                setInputNum(result.toString());
            } catch (error) {
                setInputNum('Error');
            }
            return;
        }
        setInputNum(inputNum + value);
    };

    return (
        <div className="calculator h-full w-full m-auto flex flex-row justify-center items-center bg-gray-200">
            <div className="h-full w-3/5 bg-blue-300">
                <div className="w-full flex flex-col justify-center h-2/5 bg-gray-100">
                    <div className="w-full flex flex-col justify-center h-3/6">
                        display
                    </div>
                    <div className="w-full flex flex-col justify-center h-3/6">
                        {
                            ["HEX", "DEC", "OCT", "BIN"].map((item, index) => {
                                return (
                                    <div key={index} className="flex flex-row items-center w-full" onClick={() => handleSelect(item)}>
                                        <div className={`h-1/2 w-1 m-1 rounded-sm ${selected === item ? 'bg-blue-500' : ''}`}></div>
                                        <div className="h-full w-fit m-1 flex items-center">{item}</div>
                                        <div className="h-full w-max m-1 flex items-center">{inputNum}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center h-3/5 p-1 bg-gray-300">
                    <div className="w-full h-16 bg-red-100">top</div>
                    <div className="w-full h-16 bg-red-200">mid</div>
                    <div className="grid grid-cols-5 gap-1 w-full h-full bg-gray-400">
                        {
                            keys.map((item, index) => {
                                return (
                                    <div key={index} className="rounded-sm h-full w-full flex flex-row items-center justify-center" onClick={() => calc(item)}>
                                        <div className="rounded-sm h-full w-full flex items-center justify-center bg-gray-50">{item}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="h-full w-2/5 bg-blue-100">
                {/* Additional content */}
            </div>
        </div>
    );
};

export default Calculator;