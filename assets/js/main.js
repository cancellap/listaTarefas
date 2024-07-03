// Seleciona o campo de entrada da nova tarefa
const inputTask = document.querySelector('.new-task');
// Seleciona o botão para adicionar uma nova tarefa
const btnAddTask = document.querySelector('.btn-add-task');
// Seleciona a lista de tarefas
const ulTaskList = document.querySelector('.task');
// Seleciona o botão para alternar o tema
const btnToggleTheme = document.querySelector('.btn-toggle-theme');
// Seleciona o container
const container = document.querySelector('.container');

// Cria um novo elemento 'li'
const createLi = () => document.createElement('li');

// Limpa o campo de entrada e foca novamente
const clearInput = () => {
    inputTask.value = '';
    inputTask.focus();
};

// Adiciona um botão de apagar a um elemento 'li'
const addDeleteBtn = (li) => {
    const btnDelete = document.createElement('button');
    btnDelete.textContent = 'Delete';
    btnDelete.classList.add('delete');
    li.appendChild(btnDelete);
};

// Adiciona um botão de editar a um elemento 'li'
const addEditBtn = (li) => {
    const btnEdit = document.createElement('button');
    btnEdit.textContent = 'Edit';
    btnEdit.classList.add('edit');
    li.appendChild(btnEdit);
};

// Adiciona um checkbox para marcar a tarefa como concluída
const addCompleteCheckbox = (li) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('complete');
    li.insertBefore(checkbox, li.firstChild);
};

// Cria uma nova tarefa
const createTask = (taskText) => {
    const li = createLi();
    li.textContent = taskText;
    addCompleteCheckbox(li);
    ulTaskList.appendChild(li);
    clearInput();
    addDeleteBtn(li);
    addEditBtn(li);
    saveTasks();
};

// Salva a lista de tarefas no localStorage
const saveTasks = () => {
    const liTasks = ulTaskList.querySelectorAll('li');
    const taskList = Array.from(liTasks).map(task => {
        return {
            text: task.innerText.replace('EditDelete', '').trim(),
            completed: task.classList.contains('completed')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(taskList));
};

// Adiciona as tarefas salvas do localStorage à lista
const addSavedTasks = () => {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
        const savedTaskList = JSON.parse(tasks);
        savedTaskList.forEach(task => {
            const li = createLi();
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            addCompleteCheckbox(li);
            ulTaskList.appendChild(li);
            addDeleteBtn(li);
            addEditBtn(li);
        });
    }
};

// Salva o tema no localStorage
const saveTheme = (isDarkMode) => {
    localStorage.setItem('darkMode', isDarkMode);
};

// Carrega o tema do localStorage
const loadTheme = () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
};

// Alterna o modo escuro
const toggleTheme = () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    saveTheme(isDarkMode);
};

// Evento de clique para adicionar uma nova tarefa
btnAddTask.addEventListener('click', () => {
    if (!inputTask.value) return;
    createTask(inputTask.value);
    clearInput();
});

// Evento de tecla para adicionar uma nova tarefa ao pressionar 'Enter'
inputTask.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (!inputTask.value) return;
        createTask(inputTask.value);
        clearInput();
    }
});

// Evento de clique para remover ou editar uma tarefa, e para marcar como concluída
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
        saveTasks();
    }

    if (e.target.classList.contains('edit')) {
        const li = e.target.parentElement;
        const newText = prompt('Edit your task:', li.firstChild.nextSibling.nodeValue.trim());
        if (newText !== null && newText.trim() !== '') {
            li.firstChild.nextSibling.nodeValue = newText;
            saveTasks();
        }
    }

    if (e.target.classList.contains('complete')) {
        const li = e.target.parentElement;
        li.classList.toggle('completed');
        saveTasks();
    }
});

// Evento de clique para alternar o modo escuro
btnToggleTheme.addEventListener('click', toggleTheme);

// Adiciona as tarefas salvas ao carregar a página
addSavedTasks();
// Carrega o tema ao carregar a página
loadTheme();
