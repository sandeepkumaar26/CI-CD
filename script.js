let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let total = 0;

const list = document.getElementById("list");
const totalEl = document.getElementById("total");

// Load saved expenses on page load
expenses.forEach(exp => renderExpense(exp));

function addExpense() {
    const name = document.getElementById("name").value;
    const amount = document.getElementById("amount").value;

    if (name === "" || amount === "") return;

    const expense = {
        id: Date.now(),
        name,
        amount: Number(amount)
    };

    expenses.push(expense);
    saveData();
    renderExpense(expense);

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
}

function renderExpense(expense) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${expense.name} - ₹${expense.amount}
        <button onclick="removeExpense(${expense.id})">X</button>
    `;
    li.id = expense.id;
    list.appendChild(li);

    total += expense.amount;
    totalEl.innerText = total;
}

function removeExpense(id) {
    const expense = expenses.find(e => e.id === id);
    total -= expense.amount;

    expenses = expenses.filter(e => e.id !== id);
    document.getElementById(id).remove();

    saveData();
    totalEl.innerText = total;
}

function saveData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}
