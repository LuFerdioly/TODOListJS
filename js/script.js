function toggleDone(btn) {
    btn.parentElement.parentElement.classList.toggle('done');
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}

document.addEventListener("DOMContentLoaded", () => {
    const todoList = document.querySelector(".todo-list");
    const addTaskBtn = document.querySelector(".add-task");
    const formContainer = document.querySelector(".form-container");
    const taskForm = document.getElementById("task-form");

    // Mostrar ou esconder o formulário
    addTaskBtn.addEventListener("click", () => {
        formContainer.classList.toggle("hidden");
    });

    // Adicionar nova tarefa
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault(); // impede o recarregamento da página

        const titulo = document.getElementById("titulo").value;
        const categoria = document.getElementById("categoria").value;
        const prioridade = document.getElementById("prioridade").value;

        if (!titulo) return;

        const article = document.createElement("article");
        article.classList.add("todo-item");

        article.innerHTML = `
      <div class="todo-info">
        <h3>${titulo}</h3>
        <p>Categoria: ${categoria} | Prioridade: ${prioridade}</p>
      </div>
      <div class="todo-actions">
        <button class="check"><i class="fa-solid fa-circle-check"></i></button>
        <button class="edit"><i class="fa-solid fa-pen"></i></button>
        <button class="delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

        todoList.prepend(article); // adiciona no topo da lista
        taskForm.reset(); // limpa os campos
        formContainer.classList.add("hidden"); // esconde o formulário
        atualizarContadores();
    });

    // Editar, deletar e concluir tarefa
    todoList.addEventListener("click", (e) => {
        const botao = e.target.closest("button");
        if (!botao) return;
        const tarefa = botao.closest(".todo-item");

        if (botao.classList.contains("delete")) tarefa.remove();

        if (botao.classList.contains("edit")) {
            const novoTitulo = prompt("Novo título:", tarefa.querySelector("h3").innerText);
            if (novoTitulo) tarefa.querySelector("h3").innerText = novoTitulo;
        }

        if (botao.classList.contains("check")) {
            tarefa.classList.toggle("completed");
        }

        atualizarContadores();
    });

    // Atualiza os números das cards
    function atualizarContadores() {
        const tarefas = document.querySelectorAll(".todo-item");
        const concluidas = document.querySelectorAll(".todo-item.completed");

        document.querySelector(".card.pink span").textContent = tarefas.length;
        document.querySelector(".card.green span").textContent = concluidas.length;
        document.querySelector(".card.yellow span").textContent = tarefas.length - concluidas.length;
    }

    atualizarContadores(); // chamada inicial
});
