import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

export default function App() {
    // step state
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    // using handle name shows that the function is an event handler
    // better to declare handlers outside of JSX and call them on event
    function handlePrevious() {
        if (step > 1) setStep((s) => s - 1);
    }

    function handleNext() {
        if (step < 3) setStep((s) => s + 1);
    }

    return (
        <>
            <button className="close" onClick={() => setIsOpen((is) => !is)}>
                &times;
            </button>

            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step >= 3 ? "active" : ""}>3</div>
                    </div>

                    <p className="message">
                        Step {step}: {messages[step - 1]}
                    </p>

                    <div className="buttons">
                        {/* handling button events */}
                        <button
                            style={{
                                backgroundColor: "#7950f2",
                                color: "#fff",
                            }}
                            onClick={handlePrevious}
                        >
                            Previous
                        </button>
                        <button
                            style={{
                                backgroundColor: "#7950f2",
                                color: "#fff",
                            }}
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
