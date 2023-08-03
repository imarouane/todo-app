const tasksList = document.querySelector("#tasks__list");
const todoForm = document.querySelector(".todo__form");
let todoInput = document.querySelector("#todo-input");
const allTasksBtn = document.querySelectorAll(".all-tasks-btn");
const activeTasksBtn = document.querySelectorAll(".active-tasks-btn");
const completedTasksBtn = document.querySelectorAll(".completed-tasks-btn");
const filterTasksBtns = document.querySelectorAll(".filter-tasks button");
const clearCompletedTasksBtn = document.querySelector(".clear-completed-btn");

const focusInput = () => {
  todoInput.focus();
};

focusInput();

let tasks = [
  {
    id: 1,
    title: "Complete online JavaScript course",
    isDone: true,
  },
  {
    id: 2,
    title: "Jog around the park 3x",
    isDone: false,
  },
  {
    id: 3,
    title: "30 minutes running",
    isDone: false,
  },
  {
    id: 4,
    title: "Pick up groceries",
    isDone: false,
  },
  {
    id: 5,
    title: "Complete Todo App on Frontend Mentor",
    isDone: true,
  },
];

const getStoredTasks = () => {
  let stordeTasks = JSON.parse(localStorage.getItem("tasks"));
  stordeTasks !== null || "" ? (tasks = stordeTasks) : (tasks = []);
};
getStoredTasks();

const displayTasks = (tasks) => {
  tasks.forEach((task) => {
    let isDone = task.isDone;
    let title = task.title;
    let taskId = task.id;
    let content = `
        <li class="task ${isDone ? "completed" : ""}">
              <button class="check-btn circle" onclick="taskIsComplted(${taskId})" data-id="${taskId}">
                ${
                  isDone
                    ? '<img src="images/icon-check.svg" alt="icon"  />'
                    : ""
                }
              </button>
              <p class="task-text">${title}</p>
              <button class="delete-task-btn" onclick="deleteTask(${taskId})" data-id="${taskId}">
                <img src="images/icon-cross.svg" alt="icon" />
              </button>
        </li>
    `;
    tasksList.innerHTML += content;
  });
};

displayTasks(tasks);

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  tasksList.innerHTML = "";
  addTask(todoInput.value);
  storeTasks();
  displayTasks(tasks);
  todoInput.value = "";
  leftedTaskNumber();
});

const storeTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = (taskTitle) => {
  let tasksLength = tasks.length;
  let taskId = 1;
  if (tasksLength > 0) {
    let biggerTaskId = tasks.filter((task) => {
      return task.id >= tasksLength;
    });
    taskId = biggerTaskId[0].id + 1;
  }
  tasks.unshift({ id: taskId, title: taskTitle, isDone: false });
};

const taskIsComplted = (taskId) => {
  tasksList.innerHTML = "";
  let taskStatus = "all";
  for (const activeBtn of filterTasksBtns) {
    if (activeBtn.classList.contains("active")) {
      taskStatus = activeBtn.dataset.name;
    }
  }
  tasks.forEach((task) => {
    if (task.id === taskId) {
      let isComplted = task.isDone === true ? false : true;
      task.isDone = isComplted;
    }
  });
  switchDisplayedTasks(taskStatus);
  leftedTaskNumber();
  storeTasks();
};

const deleteTask = (taskId) => {
  tasksList.innerHTML = "";
  let taskStatus = "all";
  for (const activeBtn of filterTasksBtns) {
    if (activeBtn.classList.contains("active")) {
      taskStatus = activeBtn.dataset.name;
    }
  }
  tasks.forEach((task, index) => {
    if (task.id === taskId) {
      tasks.splice(index, 1);
    }
  });
  switchDisplayedTasks(taskStatus);
  leftedTaskNumber();
  storeTasks();
};

const leftedTaskNumber = () => {
  const leftItemsText = document.querySelector(".tasks-number");
  const leftedItems = tasks.filter((item) => {
    return item.isDone === false;
  });
  leftItemsText.innerHTML =
    leftedItems.length +
    `${leftedItems.length > 1 ? " items left" : " item left"}`;
};
leftedTaskNumber();

const activeTasks = () => {
  tasksList.innerHTML = "";
  const activeTasksArr = tasks.filter((task) => {
    return task.isDone === false;
  });
  displayTasks(activeTasksArr);
};

const completedTasks = () => {
  tasksList.innerHTML = "";
  const completedTasksArr = tasks.filter((task) => {
    return task.isDone === true;
  });
  displayTasks(completedTasksArr);
};

const activeBtn = (dataName) => {
  for (const btn of filterTasksBtns) {
    btn.classList.remove("active");
    if (btn.dataset.name === dataName) {
      btn.classList.add("active");
    }
  }
};

filterTasksBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let taskStatus = btn.dataset.name;
    switchDisplayedTasks(taskStatus);
  });
});

const switchDisplayedTasks = (taskStatus) => {
  switch (taskStatus) {
    case "active":
      activeTasks();
      activeBtn(taskStatus);
      break;
    case "completed":
      completedTasks();
      activeBtn(taskStatus);
      break;
    default:
      tasksList.innerHTML = "";
      displayTasks(tasks);
      activeBtn(taskStatus);
      break;
  }
};

clearCompletedTasksBtn.addEventListener("click", () => {
  const completedTasks = tasks.filter((task) => {
    return task.isDone === true;
  });

  if (completedTasks.length > 0) {
    completedTasks.forEach((task) => {
      deleteTask(task.id);
    });
    return;
  }
  alert("There is no completed tasks to clear!");
});
