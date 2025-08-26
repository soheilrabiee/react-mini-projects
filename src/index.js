import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    // inline style

    // const style = {
    //     color: "red",
    //     fontSize: "48px",
    //     textTransform: "uppercase",
    // };

    const style = {};
    return (
        <header className="header">
            <h1 style={style}>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    const pizzas = pizzaData;
    const numPizza = pizzas.length;
    return (
        <main className="menu">
            <h2>Our menu</h2>

            {numPizza > 0 ? (
                <>
                    <p>
                        Authentic Italian cuisine. 6 creative dishes to choose
                        from. All from our stone oven, all organic, all
                        delicious.
                    </p>
                    <ul className="pizzas">
                        {pizzas.map((pizza) => (
                            <Pizza pizzaObj={pizza} key={pizza.name} />
                        ))}
                    </ul>
                </>
            ) : null}
        </main>
    );
}

function Footer() {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;

    // if(!isOpen) return <p>CLOSED!</p>

    return (
        <footer className="footer">
            {isOpen ? (
                <Order closeHour={closeHour} />
            ) : (
                <p>
                    We're happy to welcome you between {openHour}:00 and{" "}
                    {closeHour}:00
                </p>
            )}
        </footer>
    );
    // return React.createElement("footer", null, "We're currently open!");
}

function Order({ closeHour }) {
    return (
        <div className="order">
            <p>
                We're open until {closeHour}:00. Come visit us or order online.
            </p>
            <button className="btn">Order</button>
        </div>
    );
}

function Pizza({ pizzaObj }) {
    // not returning the sold out pizza
    // if (props.pizzaObj.soldOut) return null;

    return (
        <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
            <img src={pizzaObj.photoName} alt={pizzaObj.name} />
            <div>
                <h3>{pizzaObj.name}</h3>
                <p>{pizzaObj.ingredients}</p>
                <span>{pizzaObj.soldOut ? "SOLD OUT" : pizzaObj.price}</span>
            </div>
        </li>
    );
}

// React version 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// React before 18
// ReactDOM.render(<App />, document.getElementById("root"))
