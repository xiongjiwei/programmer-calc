import React, { useState } from 'react';

const Calculator = () => {
    enum KEY {
        AND, NUMA, LSHF, RSHF, CLEAR, BS,
        OR, NUMB, LBRACKET, RBRACKET, MOD, DIV,
        NOT, NUMC, NUM7, NUM8, NUM9, MUL,
        NAND, NUMD, NUM4, NUM5, NUM6, SUB,
        NOR, NUME, NUM1, NUM2, NUM3, ADD,
        XOR, NUMF, NEG, NUM0, DOT, EQUAL,
    }

    enum RADIX {
        HEX = 16, DEC = 10, OCT = 8, BIN = 2
    }

    const scale_to_string = (s: RADIX) => {
        switch (s) {
            case RADIX.HEX:
                return "HEX";
            case RADIX.DEC:
                return "DEC";
            case RADIX.OCT:
                return "OCT";
            case RADIX.BIN:
                return "BIN";
        }
    }

    const key_to_string = (k: KEY) => {
        switch (k) {
            case KEY.AND:
                return "AND";
            case KEY.NUMA:
                return "A";
            case KEY.LSHF:
                return "<<";
            case KEY.RSHF:
                return ">>";
            case KEY.CLEAR:
                return "CE";
            case KEY.BS:
                return "Bs";
            case KEY.OR:
                return "OR";
            case KEY.NUMB:
                return "B";
            case KEY.LBRACKET:
                return "(";
            case KEY.RBRACKET:
                return ")";
            case KEY.MOD:
                return "%";
            case KEY.DIV:
                return "/";
            case KEY.NOT:
                return "NOT";
            case KEY.NUMC:
                return "C";
            case KEY.NUM7:
                return "7";
            case KEY.NUM8:
                return "8";
            case KEY.NUM9:
                return "9";
            case KEY.MUL:
                return "x";
            case KEY.NAND:
                return "NAND";
            case KEY.NUMD:
                return "D";
            case KEY.NUM4:
                return "4";
            case KEY.NUM5:
                return "5";
            case KEY.NUM6:
                return "6";
            case KEY.SUB:
                return "-";
            case KEY.NOR:
                return "NOR";
            case KEY.NUME:
                return "E";
            case KEY.NUM1:
                return "1";
            case KEY.NUM2:
                return "2";
            case KEY.NUM3:
                return "3";
            case KEY.ADD:
                return "+";
            case KEY.XOR:
                return "XOR";
            case KEY.NUMF:
                return "F";
            case KEY.NEG:
                return "-/+";
            case KEY.NUM0:
                return "0";
            case KEY.DOT:
                return ".";
            case KEY.EQUAL:
                return "=";
        }
    }

    const keyboard: KEY[] = [
        KEY.AND, KEY.NUMA, KEY.LSHF, KEY.RSHF, KEY.CLEAR, KEY.BS,
        KEY.OR, KEY.NUMB, KEY.LBRACKET, KEY.RBRACKET, KEY.MOD, KEY.DIV,
        KEY.NOT, KEY.NUMC, KEY.NUM7, KEY.NUM8, KEY.NUM9, KEY.MUL,
        KEY.NAND, KEY.NUMD, KEY.NUM4, KEY.NUM5, KEY.NUM6, KEY.SUB,
        KEY.NOR, KEY.NUME, KEY.NUM1, KEY.NUM2, KEY.NUM3, KEY.ADD,
        KEY.XOR, KEY.NUMF, KEY.NEG, KEY.NUM0, KEY.DOT, KEY.EQUAL,
    ]

    const operators: KEY[] = [
        KEY.AND, KEY.OR, KEY.NOT, KEY.NAND, KEY.NOR, KEY.XOR, KEY.LSHF, KEY.RSHF, KEY.MOD, KEY.DIV, KEY.MUL, KEY.SUB, KEY.ADD
    ]

    const disableKeys: Map<RADIX, Set<KEY>> = new Map([
        [RADIX.HEX, new Set<KEY>()],
        [RADIX.DEC, new Set<KEY>([KEY.NUMA, KEY.NUMB, KEY.NUMC, KEY.NUMD, KEY.NUME, KEY.NUMF])],
        [RADIX.OCT, new Set<KEY>([KEY.NUM8, KEY.NUM9, KEY.NUMA, KEY.NUMB, KEY.NUMC, KEY.NUMD, KEY.NUME, KEY.NUMF])],
        [RADIX.BIN, new Set<KEY>([KEY.NUM2, KEY.NUM3, KEY.NUM4, KEY.NUM5, KEY.NUM6, KEY.NUM7, KEY.NUM8, KEY.NUM9, KEY.NUMA, KEY.NUMB, KEY.NUMC, KEY.NUMD, KEY.NUMF])]
    ]);

    enum InputState {
        APPEND, REPLACE, NEW
    }
    class inputType {
        value: number | KEY;
        isOp: boolean;
        constructor(value: number | KEY, isOp: boolean) {
            this.value = value;
            this.isOp = isOp;
        }
    }

    const [selected, setSelected] = useState(RADIX.DEC);
    const [inputs, setInputs] = useState([] as inputType[]);
    const [curInput, setCurInput] = useState(0);
    const [inputState, setInputState] = useState(InputState.NEW);
    const [numberInput, setNumberInput] = useState(true);

    const parse = (n: string, radix: RADIX) => {
        let ret: number = 0;
        for (let i = 0; i < n.length; i++) {
            if ('0' <= n[i] && n[i] <= '9') {
                ret = ret * radix + (n[i].charCodeAt(0) - '0'.charCodeAt(0));
            } else if ('A' <= n[i] && n[i] <= 'F') {
                ret = ret * radix + (n[i].charCodeAt(0) - 'A'.charCodeAt(0) + 10);
            }
        }
        return ret;
    }

    const splitByN = (n: string, size: number, spliter: string) => {
        let res = [];
        let i = n.length % size;
        if (i !== 0) {
            res.push(n.slice(0, i));
        }
        while (i < n.length) {
            res.push(n.slice(i, i + 4));
            i += size;
        }

        return res.join(spliter);
    }

    const prettyPrint = (num: number, format: RADIX) => {
        let n = num.toString(format);
        switch (format) {
            case RADIX.HEX:
                return splitByN(n.toUpperCase(), 4, " ");
            case RADIX.DEC:
                return splitByN(n.toUpperCase(), 4, ",");
            case RADIX.OCT:
                return splitByN(n.toUpperCase(), 3, " ");
            case RADIX.BIN:
                return splitByN(n.toUpperCase(), 4, " ");
        }
    }

    const do_calc = (tokens: inputType[]) => {
        let expr = tokens.map((item) => {
            if (item.isOp) {
                switch (item.value as KEY) {
                    case KEY.AND:
                        return "&";
                    case KEY.OR:
                        return "|";
                    case KEY.NOT:
                        return "~";
                    case KEY.NAND:
                        break;
                    case KEY.NOR:
                        break;
                    case KEY.XOR:
                        break;
                    case KEY.LSHF:
                        return "<<";
                    case KEY.RSHF:
                        return ">>";
                    case KEY.MOD:
                        return "%";
                    case KEY.DIV:
                        return "/";
                    case KEY.MUL:
                        return "*";
                    case KEY.SUB:
                        return "-";
                    case KEY.ADD:
                        return "+";
                }
            } else {
                return item.value.toString();
            }
        }).join("");
        return eval(expr);
    }

    const calc = (k: KEY) => {
        let iState = inputState;
        let tokens = iState === InputState.NEW ? [] : [...inputs];
        let token = iState === InputState.REPLACE ? "0" : curInput.toString(selected);
        if (k === KEY.CLEAR) {
            if (token === "0") {
                tokens = [];
            }
            token = "0";
        } else if (k === KEY.BS) {
            token = token.length <= 1 ? "0" : token.slice(0, -1);
        } else {
            if (operators.includes(k) || k === KEY.EQUAL) {
                tokens.push(new inputType(parse(token, selected), false));
                iState = (k === KEY.EQUAL ? InputState.NEW : InputState.REPLACE);
                if (k === KEY.EQUAL) {
                    token = do_calc(tokens).toString(selected);
                }
                tokens.push(new inputType(k, true));
            } else {
                let curVal = token;
                iState = InputState.APPEND;
                if (curVal === "0") {
                    curVal = key_to_string(k);
                } else {
                    curVal += key_to_string(k);
                }
                if (parse(curVal, selected) < 9223372036854775807) {
                    token = curVal;
                }
            }
        }

        setInputs(tokens);
        setInputState(iState);
        setCurInput(parse(token, selected));
        console.log("tokens: ", tokens);
    };


    const buttonInput = () => {
        return (
            <div className="h-full w-full flex flex-col">
                <div className="grid grid-cols-6 gap-1 w-full h-full bg-gray-400">
                    {
                        keyboard.map((item, index) => {
                            return (
                                <button key={index} disabled={disableKeys.get(selected)?.has(item)} className="rounded-sm h-full w-full flex flex-row items-center justify-center" onClick={() => calc(item)}>
                                    <div className="rounded-sm h-full w-full flex items-center justify-center bg-gray-50">{key_to_string(item)}</div>
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
        <div className="font-mono calculator h-full w-full m-auto flex flex-row justify-center items-center bg-gray-200">
            <div className="h-full w-2/3 bg-blue-300">
                <div className="w-full flex flex-col justify-center h-2/5 bg-gray-100">
                    <div className="w-full flex flex-col justify-center items-end h-3/6">
                        <div className='w-full h-2/5 flex flex-col text-stone-400 justify-center items-end p-5 bg-red-100'>
                            {inputs.map((item) => {
                                return item.isOp ? key_to_string(item.value) : item.value.toString(selected).toUpperCase();
                            })}
                        </div>
                        <div className='w-full h-3/5 flex flex-col text-6xl justify-center items-end p-4 bg-red-200'>
                            {prettyPrint(curInput, selected)}
                        </div>
                    </div>
                    <div className="w-full flex flex-col justify-center h-3/6">
                        {
                            [RADIX.HEX, RADIX.DEC, RADIX.OCT, RADIX.BIN].map((item, index) => {
                                return (
                                    <button key={index} className="flex flex-row items-center w-full" onClick={() => setSelected(item)}>
                                        <div className={`h-1/2 w-1 m-1 rounded-sm ${selected === item ? 'bg-blue-500' : ''}`}></div>
                                        <div className="h-full w-10 m-1 flex items-center">{scale_to_string(item)}</div>
                                        <div className="h-full w-max m-1 flex items-center">{prettyPrint(curInput, item)}</div>
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