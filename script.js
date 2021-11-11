const toDo = (title, description, dueDate, priority, completion) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const setPriority = (inputPriority) => priority = inputPriority;
  const getCompletion = () => completion;
  const closeToDo = () => completion = false;
  const openToDo = () => completion = true;
  return { getTitle, getDescription, getDueDate, getPriority, getCompletion, setPriority, closeToDo, openToDo };
};

const project = (name, attributedToDoList) => {
  const getName = () => name;
  const getAttributedToDoList = () => attributedToDoList;
  const addToDoToProject = (toDo) => attributedToDoList.push(toDo);
  const deleteToDo = (index) => attributedToDoList.splice(index, 1);
  return { getName, getAttributedToDoList, addToDoToProject, deleteToDo };
};

const toDoList = (() => {
  let projectList = [project("default", [])];
  const getProjectList = () => projectList;
  const createProject = (inputName) => projectList.push(project(inputName, []));
  const addProjectToList = (inputProject) => projectList.push(inputProject);
  const displayProjectList = () => projectList.map(el => el.getName());
  const deleteProject = (index) => projectList.splice(index, 1);
  return {
    getProjectList,
    createProject,
    addProjectToList,
    displayProjectList,
    deleteProject
  };
})();

function displayProjectList() {
  const projectList = toDoList.getProjectList();
  const contentDiv = document.getElementById("project-view");
  const projectHead = document.createElement("div");
  projectHead.innerHTML = "Project:"
  projectHead.className = "project-head";
  contentDiv.appendChild(projectHead);
  for (let i = 0; i < projectList.length; i++) {
    const project = document.createElement("div");
    project.innerHTML = "> " + projectList[i].getName();
    project.className = "project-box";
    project.addEventListener("click", () => {
      resetToDoListView();
      displayProject(projectList[i], i);
    });
    contentDiv.appendChild(project);
  }
  const form = document.createElement("form");
  form.className = "project-form";

  const frm_text = document.createElement("input");
  frm_text.setAttribute("type", "text");
  frm_text.setAttribute("name", "project");
  frm_text.setAttribute("placeholder", "new project");
  frm_text.className = "text-field";

  let s = document.createElement("button");

  s.setAttribute("type", "button");
  s.innerHTML = "Add";

  s.addEventListener("click", () => {
    toDoList.createProject(frm_text.value);
    resetProjectList();
    displayProjectList();
  });

  form.appendChild(frm_text);
  form.appendChild(s);
  contentDiv.appendChild(form);
}

function resetProjectList() {
  const new_list = document.body.appendChild(document.createElement('aside'));
  new_list.id = "project-view";
  const old_list = document.getElementById("project-view");
  old_list.parentNode.replaceChild(new_list, old_list);
}

function resetToDoListView() {
  const new_form = document.body.appendChild(document.createElement('content'));
  new_form.id = "content-text";
  const old_form = document.getElementById("content-text");
  old_form.parentNode.replaceChild(new_form, old_form);
}

function initModal() {
  const btn = document.getElementById("myBtn");
  const span = document.getElementsByClassName("close")[0];
  const modal = document.getElementById("myModal");
  span.onclick = function () {
    modal.style.display = "none";
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function openModalToDo(input, deleteButton) {
  const modal = document.getElementById("myModal");

  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerHTML = "Title: " + input.getTitle();

  const modalDate = document.getElementById("modal-date");
  modalDate.innerHTML = "Due date: " + input.getDueDate();

  const oldDeleteButton = document.getElementById("delete-button");
  oldDeleteButton.parentNode.replaceChild(deleteButton, oldDeleteButton);

  const modalText = document.getElementById("modal-description-text");
  modalText.innerHTML = "Description: " + input.getDescription();
  modal.style.display = "block";
}


function displayProject(inputProject, projectIndex) {

  let procInputProject = inputProject;
  let procProjectIndex = projectIndex;

  if (procInputProject === undefined) {
    toDoList.createProject("default");
    procInputProject = toDoList.getProjectList()[0];
    procProjectIndex = 0;
  }

  const inputToDolist = procInputProject.getAttributedToDoList();
  const contentDiv = document.getElementById("content-text");

  const projectBox = document.createElement("div");
  projectBox.innerHTML = procInputProject.getName();
  projectBox.className = "content-project-box";
  contentDiv.appendChild(projectBox);


  const deleteProject = document.createElement("button");
  deleteProject.className = "delete-project-box";
  deleteProject.innerHTML = "Delete";
  deleteProject.addEventListener("click", () => {
    toDoList.deleteProject(projectIndex);
    resetToDoListView();
    displayProject(toDoList.getProjectList()[0], 0);
    resetProjectList();
    displayProjectList();
  });

  contentDiv.appendChild(deleteProject);


  for (let i = 0; i < inputToDolist.length; i++) {
    const toDoListBox = document.createElement("div");

    const titleBox = document.createElement("div");
    titleBox.innerHTML = inputToDolist[i].getTitle();
    titleBox.className = "param-box";
    titleBox.id = "title-box";

    const deleteToDo = document.createElement("button");
    deleteToDo.className = "completion-box";
    deleteToDo.id = "delete-button";
    deleteToDo.innerHTML = "Delete";
    deleteToDo.addEventListener("click", () => {
      procInputProject.deleteToDo(i);
      resetToDoListView();
      displayProject(procInputProject, procProjectIndex);
    });


    titleBox.addEventListener("click", () => {
      openModalToDo(inputToDolist[i], deleteToDo);
    });

    const dueDate = document.createElement("div");
    dueDate.innerHTML = inputToDolist[i].getDueDate();
    dueDate.className = "param-box";

    const priority = document.createElement("div");
    priority.innerHTML = inputToDolist[i].getPriority();
    priority.className = "param-box";

    const completion = document.createElement("button");

    if (inputToDolist[i].getCompletion()) {
      toDoListBox.className = "to-do-list-box closed";
      completion.className = "completion-box";
      completion.innerHTML = "Open";
      completion.addEventListener("click", () => {
        inputToDolist[i].closeToDo();
        resetToDoListView();
        displayProject(procInputProject, procProjectIndex);
      });
    } else {
      if (inputToDolist[i].getPriority() === "1") {
        toDoListBox.className = "to-do-list-box open-1";
      } else if (inputToDolist[i].getPriority() === "2") {
        toDoListBox.className = "to-do-list-box open-2";
      } else {
        toDoListBox.className = "to-do-list-box open-3";
      }
      completion.className = "completion-box-open";
      completion.innerHTML = "Close";
      completion.addEventListener("click", () => {
        inputToDolist[i].openToDo();
        resetToDoListView();
        displayProject(procInputProject, procProjectIndex);
      });
    };

    toDoListBox.appendChild(titleBox);
    toDoListBox.appendChild(dueDate);
    toDoListBox.appendChild(priority);
    toDoListBox.appendChild(completion);
    contentDiv.appendChild(toDoListBox);
  }

  const form = document.createElement("form");
  form.className = "to-do-list-form";

  const frm_title = document.createElement("input");
  frm_title.setAttribute("type", "text");
  frm_title.setAttribute("name", "title");
  frm_title.setAttribute("placeholder", "title");
  frm_title.className = "to-do-text-field";

  const frm_description = document.createElement("input");
  frm_description.setAttribute("type", "text");
  frm_description.setAttribute("name", "description");
  frm_description.setAttribute("placeholder", "description");
  frm_description.className = "to-do-text-field";

  const frm_due_date = document.createElement("input");
  frm_due_date.setAttribute("type", "date");
  frm_due_date.setAttribute("name", "due date");
  frm_due_date.className = "to-do-text-field";

  const frm_priority = document.createElement("select");
  frm_priority.setAttribute("name", "priority");
  frm_priority.className = "to-do-text-field";

  for (let j = 0; j < 3; j++) {
    let option = document.createElement("option");
    option.setAttribute("value", j + 1);
    option.innerHTML = j + 1;
    frm_priority.appendChild(option);
  }

  const create = document.createElement("button");

  create.className = "create-box";
  create.innerHTML = "Create";
  create.addEventListener("click", () => {
    procInputProject.addToDoToProject(toDo(frm_title.value, frm_description.value, frm_due_date.value, frm_priority.value, false));
    resetToDoListView();
    displayProject(procInputProject, procProjectIndex);
  });


  form.appendChild(frm_title);
  form.appendChild(frm_description);
  form.appendChild(frm_due_date);
  form.appendChild(frm_priority);
  form.appendChild(create);
  contentDiv.appendChild(form);
};

testToDo1 = toDo("test title 1", "test description 1", "test date 1", "1", true);
testToDo2 = toDo("test title 2", "test description 2", "test date 2", "2", false);
testToDo3 = toDo("test title 3", "test description 3", "test date 3", "3", true);
testProject = project("test name 1", [testToDo1, testToDo2, testToDo3]);
testToDo4 = toDo("test title 4", "test description 4", "test date 4", "1", false);
testProject.addToDoToProject(testToDo4);

testToDo5 = toDo("test title 5", "test description 5", "test date 5", "1", false);
testToDo6 = toDo("test title 6", "test description 6", "test date 6", "3", true);
testToDo7 = toDo("test title 7", "test description 7", "test date 7", "2", false);
testProject2 = project("test name 2", [testToDo5, testToDo6, testToDo7]);

toDoList.addProjectToList(testProject);
toDoList.addProjectToList(testProject2);
console.log(toDoList.displayProjectList());

displayProject(toDoList.getProjectList()[0], 0);
displayProjectList();
initModal();