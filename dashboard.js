const a = document.getElementById('overview');
const b = document.getElementById('add-expenses');
const c = document.getElementById('edit-expenses');
const d = document.getElementById('delete-expense');
const e = document.getElementById('budget-settings');
// const f = document.getElementById('sign-out');
const g = document.getElementById('user');

function handleViewClick() {
    window.location.replace('./view_expenses.html');
}

function handleAddExpensesClick() {
    window.location.replace('./add_expenses.html');
}

function handleEditExpensesClick() {
    window.location.replace('./edit_expenses.html');
}

function handleDeleteExpenseClick() {
    window.location.replace('./delete_expenses.html');
}

function handleBudgetSettingsClick() {
    window.location.replace('./budget_settings.html');
}

// function handleSignOutClick() {
//     window.location.replace('./login.html');
// }

function handleUserClick() {
    window.location.replace('./account_settings.html');
}

// Attach the event listeners to the buttons
a.onclick = handleViewClick;
b.onclick = handleAddExpensesClick;
c.onclick = handleEditExpensesClick;
d.onclick = handleDeleteExpenseClick;
e.onclick = handleBudgetSettingsClick;
// f.onclick = handleSignOutClick;
// g.onclick = handleUserClick;
