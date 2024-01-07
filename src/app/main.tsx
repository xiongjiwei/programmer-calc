import { Button } from "@nextui-org/react";
import Calculator from "./calculaters/programer";

export default function Home() {
    return (
        <div className='w-9/12 h-5/6 flex flex-col justify-center items-center'>
            <Calculator />
        </div>
    )
}