const a = document.getElementById('arrow-back');
const b = document.getElementById('edit');
const c = document.getElementById('add');

function handleBack() {
     window.location.replace('./dashboard.html');
}

function handleEdit() {
     window.location.replace('./edit_expenses.html');
}

function handleDelete() {
     window.location.replace('./delete_expenses.html');
}

a.onclick = handleBack;
b.onclick = handleEdit;
c.onclick = handleDelete;