document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('changeColorButton');
    const taskForm = document.getElementById('taskForm');
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const formFeedback = document.getElementById('formFeedback');

    button.addEventListener('click', () => {
        const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ffcc99', '#cc99ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    });

    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            const tasksList = document.getElementById('tasksList');
            data.slice(0, 10).forEach(task => {
                const listItem = document.createElement('li');
                listItem.textContent = task.title;
                listItem.className = 'list-group-item';
                if (task.completed) {
                    listItem.style.textDecoration = 'line-through';
                }
                tasksList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        taskForm.classList.add('was-validated');
        if (taskForm.checkValidity() === false) {
            e.stopPropagation();
            return;
        }

        formFeedback.textContent = 'Task added successfully!';
        formFeedback.style.color = 'green';
        taskForm.reset();
        taskForm.classList.remove('was-validated');
    });
});
