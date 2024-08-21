document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-form');
    const authMsg = document.getElementById('result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const expense = document.getElementById('expense-name').value;
        const amount = document.getElementById('number').value;
        const date = document.getElementById('date').value;
        //  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        // const date =  new Date(formattedDate);

        const categoryName =  document.getElementById('category-name').value;
            // Get the selected radio button value
          // Get all radio buttons with the name 'expenseType'
        const paymentMethod = document.querySelectorAll('input[name="radio"]');

                let selectedValue = null;
                paymentMethod.forEach((radio) => {
                    if (radio.checked) {
                        selectedValue = radio.value;
                    }
                });


        try {
            const response = await fetch('http://localhost:3000/add_expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ expense, amount, date, categoryName, paymentMethod })
            });

            if (response.ok) {
                authMsg.textContent = "Added an Expense";
            } else {
                // If login fails, display an error message
                const errorData = await response.json();
                authMsg.textContent = errorData.message || "Error adding an expense.Please give it a short";
            }
        } catch (err) {
            authMsg.textContent = 'An error occurred. Please try again later.';
        }
    });
});