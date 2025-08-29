import { useState } from "react";

export default function App() {
    // lifting state up to the common parent
    const [items, setItems] = useState([]);

    function handleAddItems(item) {
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => items.filter((item) => item.id !== id));
    }

    function handleToggleItem(id) {
        setItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onToggleItem={handleToggleItem}
            />
            <Stats items={items} />
        </div>
    );
}

function Logo() {
    return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        // guard clause
        if (!description) return;

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now(),
        };
        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your ✈️ trip?</h3>
            <select
                value={quantity}
                // the value is coming from the props in the option
                onChange={(e) => setQuantity(+e.target.value)}
            >
                {/* trick to generate 20 options from 1 to 20 using from method */}
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            {/* controlled element using for the input field */}
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                        key={item.id}
                    />
                ))}
            </ul>
        </div>
    );
}

function Item({ item, onDeleteItem, onToggleItem }) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => {
                    onToggleItem(item.id);
                }}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
}

function Stats({ items }) {
    // early return as conditional rendering because we need no calculations
    if (!items.length)
        return (
            <p className="stats">
                <em>Start adding some items to your packing list 🚀</em>
            </p>
        );

    // derived states
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    const percentage = Math.round((numPacked / numItems) * 100);

    return (
        <footer className="stats">
            <em>
                {percentage === 100
                    ? "You got everything! Ready to go 💯"
                    : `👜 You have ${numItems} items on your list, and you already
                packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
}
