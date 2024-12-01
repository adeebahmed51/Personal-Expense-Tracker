const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render expenses
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.description} - ₹${expense.amount} (${expense.category})
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    expenseList.appendChild(li);
  });

  totalDisplay.textContent = total;
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to add expense
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  expenses.push({ description, amount, category });
  renderExpenses();
  form.reset();
});

// Function to delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Initial render
renderExpenses();
