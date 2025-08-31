import { useState } from "react";
const buttons = [
    ["AC", "+/-", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
];

export default function App() {
    const [currentValue, setCurrentValue] = useState("0");
    const [opertaion, setOpertaion] = useState("");

    const handleButtonClick = (value) => {
        setCurrentValue((prev) =>
            prev === "0" ? String(value) : prev + String(value)
        );
    };

    return (
        <div className="app">
            <Display value={currentValue} />
            <ButtonPanel onButtonClick={handleButtonClick} />
        </div>
    );
}

function Display({ value }) {
    return <div className="display">{value}</div>;
}

function Button({ label, onClick, className }) {
    return (
        <button
            className={`button ${className}`}
            onClick={() => onClick(label)}
        >
            {label}
        </button>
    );
}

function ButtonPanel({ onButtonClick }) {
    return (
        <div className="button-panel">
            {buttons.map((row, i) => (
                <div key={i} className="button-row">
                    {row.map((btn) => {
                        let className = "dark"; // default for numbers

                        if (["AC", "+/-", "%"].includes(btn))
                            className = "grey";

                        if (["÷", "×", "-", "+", "="].includes(btn))
                            className = "orange";

                        if (btn === "0") className += " zero";

                        return (
                            <Button
                                key={btn}
                                label={btn}
                                onClick={onButtonClick}
                                className={className}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
}
