import React, { useState } from 'react';
import { RadioGroup, Radio } from "@nextui-org/react";

const Calculator = () => {
    const keys = [
        ["AND", "A", "<<", ">>", "Clear", "Bs"],
        ["OR", "B", "(", ")", "%", "/"],
        ["NOT", "C", "7", "8", "9", "x"],
        ["NAND", "D", "4", "5", "6", "-"],
        ["NOR", "E", "1", "2", "3", "+"],
        ["XOR", "F", "+/-", "0", ".", "="]
    ]

    const hexDisableKeys: Set<string> = new Set();
    const decimalDisableKeys: Set<string> = new Set(["A", "B", "C", "D", "E", "F"]);
    const octalDisableKeys: Set<string> = new Set(["8", "9", "A", "B", "C", "D", "E", "F"]);
    const binaryDisableKeys: Set<string> = new Set(["2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "F"]);

    let disableKeys: Set<string> = decimalDisableKeys;

    const [selected, setSelected] = useState('DEC');
    const [inputNum, setInputNum] = useState('0');
    const [decimal, setDecimal] = useState(0);
    const [numberInput, setNumberInput] = useState(true);

    const handleSelect = (value: string) => {
        switch (value) {
            case 'HEX':
                disableKeys = hexDisableKeys
                break;
            case 'DEC':
                disableKeys = decimalDisableKeys
                break;
            case 'OCT':
                disableKeys = octalDisableKeys
                break;
            case 'BIN':
                disableKeys = binaryDisableKeys
                break;
        }
        setSelected(value);
    };

    const calc = (value: string) => {
        if (value === 'Clear') {
            setInputNum('');
            return;
        }
        setInputNum(inputNum + value);
    };


    const buttonInput = () => {
        return (
            <div className="h-full w-full flex flex-col">
                <div className="grid grid-cols-6 gap-1 w-full h-full bg-gray-400">
                    {
                        keys.map((group, row) => {
                            return group.map((item, col) => {
                                return (
                                    <button key={row * 6 + col} className="rounded-sm h-full w-full flex flex-row items-center justify-center" onClick={() => calc(item)}>
                                        <div className="rounded-sm h-full w-full flex items-center justify-center bg-gray-50">{item}</div>
                                    </button>
                                );
                            })
                        })
                    }
                </div>
            </div>
        );
    }

    const bitInput = () => {
        return (
            <div className="grid grid-cols-5 gap-1 w-full h-full bg-gray-400">
                bits
            </div>
        );
    };

    return (
        <div className="calculator h-full w-full m-auto flex flex-row justify-center items-center bg-gray-200">
            <div className="h-full w-2/3 bg-blue-300">
                <div className="w-full flex flex-col justify-center h-2/5 bg-gray-100">
                    <div className="w-full flex flex-col justify-center items-end h-3/6">
                        <div className='w-full h-2/5 flex flex-col text-stone-400 justify-center items-end bg-red-100'>
                            {inputNum}
                        </div>
                        <div className='w-full h-3/5 flex flex-col text-6xl justify-center items-end bg-red-200'>
                            {decimal}
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center h-3/6">
                        {
                            ["HEX", "DEC", "OCT", "BIN"].map((item, index) => {
                                return (
                                    <button key={index} className="flex flex-row items-center w-full" onClick={() => handleSelect(item)}>
                                        <div className={`h-1/2 w-1 m-1 rounded-sm ${selected === item ? 'bg-blue-500' : ''}`}></div>
                                        <div className="h-full w-fit m-1 flex items-center">{item}</div>
                                        <div className="h-full w-max m-1 flex items-center">{inputNum}</div>
                                    </button>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center h-3/5 p-1 bg-gray-300">
                    <div className="w-full h-16 flex pb-1 bg-red-100">
                        <div className="h-full w-1/6 flex justify-center items-center bg-orange-100">
                            <button onClick={() => { setNumberInput(true) }}>
                                k1
                            </button>
                        </div>
                        <div className="h-full w-1/6 flex justify-center items-center bg-orange-200">
                            <button onClick={() => { setNumberInput(false) }}>
                                k2
                            </button>
                        </div>
                        <div className="h-full w-1/3 flex justify-center items-center bg-orange-300">
                            <button>WORD</button>
                        </div>
                        <div className="h-full w-1/3 flex justify-center items-center bg-orange-400">
                            <button>MS</button>
                        </div>
                    </div>
                    <div className="h-full w-full flex flex-col">
                        {numberInput ? buttonInput() : bitInput()}
                    </div>
                </div>
            </div>
            <div className="h-full w-1/3 bg-blue-100">
                {/* Additional content */}
            </div>
        </div>
    );
};

export default Calculator;