import React, { useState } from 'react';
import { RadioGroup, Radio } from "@nextui-org/react";

const Calculator = () => {
    enum KEY {
        AND = "AND", NUMA = "A", LSHF = "<<", RSHF = ">>", CLEAR = "CE", BS = "Bs",
        OR = "OR", NUMB = "B", LBRACKET = "(", RBRACKET = ")", MOD = "%", DIV = "/",
        NOT = "NOT", NUMC = "C", NUM7 = "7", NUM8 = "8", NUM9 = "9", MUL = "X",
        NAND = "NAND", NUMD = "D", NUM4 = "4", NUM5 = "5", NUM6 = "6", SUB = "-",
        NOR = "NOR", NUME = "E", NUM1 = "1", NUM2 = "2", NUM3 = "3", ADD = "+",
        XOR = "XOR", NUMF = "F", NEG = "-/+", NUM0 = "0", DOT = ".", EQUAL = "=",
    }

    const keyboard: KEY[] = [
        KEY.AND, KEY.NUMA, KEY.LSHF, KEY.RSHF, KEY.CLEAR, KEY.BS,
        KEY.OR, KEY.NUMB, KEY.LBRACKET, KEY.RBRACKET, KEY.MOD, KEY.DIV,
        KEY.NOT, KEY.NUMC, KEY.NUM7, KEY.NUM8, KEY.NUM9, KEY.MUL,
        KEY.NAND, KEY.NUMD, KEY.NUM4, KEY.NUM5, KEY.NUM6, KEY.SUB,
        KEY.NOR, KEY.NUME, KEY.NUM1, KEY.NUM2, KEY.NUM3, KEY.ADD,
        KEY.XOR, KEY.NUMF, KEY.NEG, KEY.NUM0, KEY.DOT, KEY.EQUAL,
    ]

    const hexDisableKeys: Set<string> = new Set();
    const decimalDisableKeys: Set<string> = new Set([KEY.NUMA, KEY.NUMB, KEY.NUMC, KEY.NUMD, KEY.NUME, KEY.NUMF]);
    const octalDisableKeys: Set<string> = new Set([KEY.NUM8, KEY.NUM9, KEY.NUMA, KEY.NUMB, KEY.NUMC, KEY.NUMD, KEY.NUME, KEY.NUMF]);
    const binaryDisableKeys: Set<string> = new Set([KEY.NUM2, KEY.NUM3, KEY.NUM4, KEY.NUM5, KEY.NUM6, KEY.NUM7, KEY.NUM8, KEY.NUM9, KEY.NUMA, KEY.NUMB, KEY.NUMC, KEY.NUMD, KEY.NUMF]);

    const [disableKeys, setDisableKeys] = useState<Set<string>>(decimalDisableKeys);
    const [selected, setSelected] = useState('DEC');
    const [input, setInputNum] = useState('0');
    const [decimal, setDecimal] = useState(0);
    const [numberInput, setNumberInput] = useState(true);

    const handleSelect = (value: string) => {
        switch (value) {
            case 'HEX':
                setDisableKeys(hexDisableKeys);
                break;
            case 'DEC':
                setDisableKeys(decimalDisableKeys);
                break;
            case 'OCT':
                setDisableKeys(octalDisableKeys);
                break;
            case 'BIN':
                setDisableKeys(binaryDisableKeys);
                break;
        }
        setSelected(value);
    };

    const calc = (value: KEY) => {
        if (value === KEY.CLEAR) {
            setInputNum('');
            return;
        }
        setInputNum(input + value);
    };


    const buttonInput = () => {
        return (
            <div className="h-full w-full flex flex-col">
                <div className="grid grid-cols-6 gap-1 w-full h-full bg-gray-400">
                    {
                        keyboard.map((item, index) => {
                            return (
                                <button key={index} disabled={disableKeys.has(item)} className="rounded-sm h-full w-full flex flex-row items-center justify-center" onClick={() => calc(item)}>
                                    <div className="rounded-sm h-full w-full flex items-center justify-center bg-gray-50">{item}</div>
                                </button>
                            );
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
                        <div className='w-full h-2/5 flex flex-col text-stone-400 justify-center items-end p-5 bg-red-100'>
                            {input}
                        </div>
                        <div className='w-full h-3/5 flex flex-col text-6xl justify-center items-end p-4 bg-red-200'>
                            {decimal}
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center h-3/6">
                        {
                            ["HEX", "DEC", "OCT", "BIN"].map((item, index) => {
                                return (
                                    <button key={index} className="flex flex-row items-center w-full" onClick={() => handleSelect(item)}>
                                        <div className={`h-1/2 w-1 m-1 rounded-sm ${selected === item ? 'bg-blue-500' : ''}`}></div>
                                        <div className="h-full w-10 m-1 flex items-center">{item}</div>
                                        <div className="h-full w-max m-1 flex items-center">{input}</div>
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
            <div className="h-full w-80 bg-blue-100">
                {/* Additional content */}
            </div>
        </div>
    );
};

export default Calculator;