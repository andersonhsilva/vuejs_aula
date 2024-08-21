const newTodoObj = {
    text: '',
    done: false,
};

const app = {
    data() {
        return {
            newTodo: { ...newTodoObj }, // Define os valores padrão do formulário
            todos: [], // Para armazenar a nova tarefa a ser adicionada
        };
    },

    methods: {
        addTodo() {
            if (this.newTodo.text.trim() !== '') {
                this.todos.push({ ...this.newTodo }); // Adiciona um clone da instancia de newTodo à lista
                this.newTodo = { ...newTodoObj }; // Redefine um clone do newTodo para os dados inicial do formulario

                localStorage.setItem('todos', JSON.stringify(this.todos));
            } else {
                alert('Informe o nome de uma tarefa para continuar');
            }
        },

        toggleDone(todo) {
            todo.done = !todo.done; // Alterna entre feito = true / não feito = false
        },

        clearTodos() {
            this.todos = []; // Limpa todas as tarefas
        },

        storeLocalTodos(){
            console.log('running... storeLocalTodos');        
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }

    },

    created() {
        // carrega ou nao os dados do local storage para a variavel this.todos do metodo data() do vue
        var todos = localStorage.getItem('todos');
        this.todos = todos ? JSON.parse(todos) : [];
    },

};

Vue.createApp(app).mount('#app');
