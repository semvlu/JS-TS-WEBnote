import { useState, MouseEvent } from "react";

interface Props {
    color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' |
    'info' | 'Dark';
    onClick: () => void;
}


const Button = ({ color = 'primary', onClick }: Props) => {
    const [count, setCount] = useState(0);
    const handClick = (e: MouseEvent) => {
        setCount(count + 1);
        onClick();
        console.log(e.type);
    }

    return (
        <button
            className={"btn btn-outline-" + color}
            onClick={ (e) => handClick(e) }
        >
            {count}
        </button>

    )
}
export default Button;