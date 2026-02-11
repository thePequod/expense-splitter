import { useMemo, useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const canAdd = useMemo(() => {
    const n = name.trim();
    const a = Number(amount);
    return n.length > 0 && Number.isFinite(a) && a > 0;
  }, [name, amount]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canAdd) return;

    const expense = {
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: Number(amount),
      createdAt: Date.now(),
    };

    setExpenses((prev) => [expense, ...prev]);
    setName("");
    setAmount("");
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 520 }}>
      <h1 style={{ marginTop: 0 }}>Expense Splitter</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        Day 2: add expenses and render a list.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Expense name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Groceries"
            autoFocus
          />
        </label>

        <label style={{ display: "grid", gap: 6 }}>
          <span>Amount (AUD)</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 42.50"
            inputMode="decimal"
          />
        </label>

        <button type="submit" disabled={!canAdd}>
          Add expense
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ fontSize: 18, margin: "0 0 10px" }}>Expenses</h2>

      {expenses.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No expenses yet.</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {expenses.map((x) => (
            <li key={x.id} style={{ marginBottom: 6 }}>
              <strong>{x.name}</strong> — ${x.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}