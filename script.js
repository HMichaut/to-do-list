const toDo = (title, description, dueDate, priority, completion) => {
  const get = () => {
    return Object.freeze({"title": title, "description": description, "dueDate": dueDate.toISOString(), "priority": priority, "completion": completion});
  }

  const toJSON = () => {
    return get();
  }
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const setPriority = (inputPriority) => priority = inputPriority;
  const updateValues = (inputTitle, inputDescription, inputDueDate, inputPriority) => {
    title = inputTitle;
    description = inputDescription;
    dueDate = inputDueDate;
    priority = inputPriority;
  }
  const getCompletion = () => completion;
  const closeToDo = () => completion = false;
  const openToDo = () => completion = true;
  return { getTitle, getDescription, getDueDate, getPriority, getCompletion, setPriority, closeToDo, openToDo, updateValues, toJSON };
};

const project = (name, attributedToDoList) => {
  const get = () => {
    return Object.freeze({"name": name, "attributedToDoList": attributedToDoList});
  }

  const toJSON = () => {
    return get();
  }
  const getName = () => name;
  const getAttributedToDoList = () => attributedToDoList;
  const addToDoToProject = (toDo) => attributedToDoList.push(toDo);
  const deleteToDo = (index) => attributedToDoList.splice(index, 1);
  const getlastToDo = () => attributedToDoList[attributedToDoList.length - 1];
  return { getName, getAttributedToDoList, addToDoToProject, deleteToDo, getlastToDo, toJSON };
};

const toDoList = (() => {
  let projectListJSON = localStorage.getItem('ToDoProject');
  let projectList = [];

  console.log(projectListJSON);

  if (projectListJSON !== null) {
    for (let i = 0; i < JSON.parse(projectListJSON).length; i++) {
      let projectIter = JSON.parse(projectListJSON)[i];
      let projectToDoList = [];
      for (let i = 0; i < projectIter.attributedToDoList.length; i++) {
        let toDoIter = projectIter.attributedToDoList[i];
        projectToDoList.push(toDo(toDoIter.title, toDoIter.description, new Date(toDoIter.dueDate), toDoIter.priority, toDoIter.false));
      }
      projectList.push(project(projectIter.name, projectToDoList));
      
    }
  } else {
    projectList.push(project("default", []));
  };


  const get = () => {
    return Object.freeze(...projectList);
  }

  const toJSON = () => {
    return get();
  }

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
    deleteProject,
    toJSON
  };
})();



function saveToLocalStorage() {
  console.log(toDoList.getProjectList());
  console.log(toDoList.getProjectList());
  console.log(JSON.stringify(toDoList.getProjectList()));
  localStorage.setItem('ToDoProject', JSON.stringify(toDoList.getProjectList()));
};

function displayAllProjects () {
  const contentDiv = document.getElementById("project-view");
  const projectList = toDoList.getProjectList();

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
}

function addprojectForm () {
  const contentDiv = document.getElementById("project-view");
  const form = document.createElement("form");
  form.className = "project-form";

  const frm_text = document.createElement("input");
  frm_text.setAttribute("type", "text");
  frm_text.setAttribute("name", "project");
  frm_text.setAttribute("placeholder", "new project");
  frm_text.className = "text-field";

  let addButton = document.createElement("button");

  addButton.setAttribute("type", "button");
  addButton.innerHTML = "Add";

  addButton.addEventListener("click", () => {
    toDoList.createProject(frm_text.value);
    resetProjectList();
    displayProjectList();
    saveToLocalStorage();
  });

  form.appendChild(frm_text);
  form.appendChild(addButton);
  contentDiv.appendChild(form);
}

function displayProjectList() {
  const contentDiv = document.getElementById("project-view");
  const projectHead = document.createElement("div");
  projectHead.innerHTML = "Project:"
  projectHead.className = "project-head";
  contentDiv.appendChild(projectHead);

  displayAllProjects();
  addprojectForm ();
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

function initFormTitle (inputForm, input) {
  inputForm.setAttribute("type", "text");
  inputForm.setAttribute("name", "title");
  inputForm.setAttribute("placeholder", "title");
  inputForm.className = "to-do-text-field";
  inputForm.value = input.getTitle();
}

function initFormDescription (inputForm, input) {
  inputForm.setAttribute("rows", "5");
  inputForm.setAttribute("name", "description");
  inputForm.setAttribute("placeholder", "description");
  inputForm.className = "to-do-description-field";
  inputForm.value = input.getDescription();
}

function initFormDueDate (inputForm, input) {
  inputForm.setAttribute("type", "date");
  inputForm.setAttribute("name", "due date");
  inputForm.className = "to-do-text-field";
  inputForm.valueAsDate = input.getDueDate();
}

function initFormpriority (inputForm, input) {
  inputForm.setAttribute("name", "priority");
  inputForm.className = "to-do-text-field";

  for (let j = 0; j < 3; j++) {
    let option = document.createElement("option");
    option.setAttribute("value", j + 1);
    option.innerHTML = j + 1;
    inputForm.appendChild(option);
  }
  inputForm.value = input.getPriority();
}

function resetForm() {
  const new_form = document.body.appendChild(document.createElement('div'));
  new_form.id = "edit-form";
  const old_form = document.getElementById("edit-form");
  old_form.parentNode.replaceChild(new_form, old_form);
}


function openModalToDo(input, deleteButton, procInputProject, procProjectIndex) {
  const modal = document.getElementById("myModal");
  const form = document.createElement("form");
  form.className = "to-do-list-edit";

  const label_title = document.createElement("Label");
  label_title.innerHTML = "Title";

  const frm_title = document.createElement("input");
  initFormTitle(frm_title, input);

  const label_description = document.createElement("Label");
  label_description.innerHTML = "Description";

  const frm_description = document.createElement("textarea");
  initFormDescription(frm_description, input);

  const label_due_date = document.createElement("Label");
  label_due_date.innerHTML = "Due Date";

  const frm_due_date = document.createElement("input");
  initFormDueDate(frm_due_date, input);

  const label_priority = document.createElement("Label");
  label_priority.innerHTML = "Priority";

  const frm_priority = document.createElement("select");
  initFormpriority(frm_priority, input);

  const edit = document.createElement("button");

  edit.className = "create-box";
  edit.setAttribute("type", "button");
  edit.innerHTML = "Submit";
  edit.addEventListener("click", () => {
    input.updateValues(frm_title.value, frm_description.value, frm_due_date.valueAsDate, frm_priority.value);
    resetToDoListView();
    displayProject(procInputProject, procProjectIndex);
    modal.style.display = "none";
    saveToLocalStorage()
  });

  resetForm();

  const editForm = document.getElementById("edit-form");
  const br = document.createElement("br");

  form.append(label_title, br.cloneNode(), frm_title, br.cloneNode(), br.cloneNode(), label_description, br.cloneNode(),
              frm_description, br.cloneNode(), br.cloneNode(), label_due_date, br.cloneNode(), frm_due_date, 
              br.cloneNode(), br.cloneNode(), label_priority, br.cloneNode(), frm_priority, br.cloneNode(), 
              br.cloneNode(), edit, deleteButton);
  editForm.appendChild(form);

  modal.style.display = "block";
}

function initProjectBox(inputBox, inputProject) {
  const contentDiv = document.getElementById("content-text");
  inputBox.innerHTML = inputProject.getName();
  inputBox.className = "content-project-box";
  contentDiv.appendChild(inputBox);
}

function initDeleteButton() {
  const contentDiv = document.getElementById("content-text");
  const deleteProject = document.createElement("button");
  deleteProject.className = "delete-project-box";
  deleteProject.innerHTML = "Delete project";
  deleteProject.addEventListener("click", () => {
    toDoList.deleteProject(projectIndex);
    resetToDoListView();
    displayProject(toDoList.getProjectList()[0], 0);
    resetProjectList();
    displayProjectList();
    saveToLocalStorage();
  });

  contentDiv.appendChild(deleteProject);
}

function initTitleBox (inputBox, inputTitle) {
  inputBox.innerHTML = inputTitle;
  inputBox.className = "param-box";
  inputBox.id = "title-box";
};

function initDeleteToDo (deleteToDo, inputProject, projectIndex, iter) {
  const modal = document.getElementById("myModal");
  deleteToDo.className = "completion-box";
  deleteToDo.id = "delete-button";
  deleteToDo.innerHTML = "Delete";
  deleteToDo.setAttribute("type", "button");
  deleteToDo.addEventListener("click", () => {
    inputProject.deleteToDo(iter);
    resetToDoListView();
    displayProject(inputProject, projectIndex);
    modal.style.display = "none";
    saveToLocalStorage();
  });
}

function createToDoGrid (inputProject, projectIndex) {
  const contentDiv = document.getElementById("content-text");
  const inputToDolist = inputProject.getAttributedToDoList();

  for (let i = 0; i < inputToDolist.length; i++) {
    const toDoListBox = document.createElement("div");

    const titleBox = document.createElement("div");
    initTitleBox (titleBox, inputToDolist[i].getTitle());

    const deleteToDo = document.createElement("button");
    initDeleteToDo (deleteToDo, inputProject, projectIndex, i);

    titleBox.addEventListener("click", () => {
      openModalToDo(inputToDolist[i], deleteToDo, inputProject, projectIndex);
    });

    const dueDate = document.createElement("div");

    dueDate.innerHTML = inputToDolist[i].getDueDate().toISOString().split('T')[0];
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
        displayProject(inputProject, projectIndex);
        saveToLocalStorage();
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
        displayProject(inputProject, projectIndex);
        saveToLocalStorage();
      });
    };

    toDoListBox.append(titleBox, dueDate, priority, completion);

    contentDiv.appendChild(toDoListBox);
  }
}

function initNewToDoDelete (deleteButton, inputProject, projectIndex) {
  const modal = document.getElementById("myModal");

  deleteButton.className = "completion-box";
  deleteButton.id = "delete-button";
  deleteButton.innerHTML = "Delete";
  deleteButton.setAttribute("type", "button");
  deleteButton.addEventListener("click", () => {
    inputProject.deleteToDo(inputProject.getAttributedToDoList().length - 1);
    resetToDoListView();
    displayProject(inputProject, projectIndex);
    modal.style.display = "none";
  });
}

function displayProject(inputProject, projectIndex) {

  const contentDiv = document.getElementById("content-text");

  if (inputProject === undefined) {
    toDoList.createProject("default");
    inputProject = toDoList.getProjectList()[0];
    projectIndex = 0;
  }

  const projectBox = document.createElement("div");
  initProjectBox(projectBox, inputProject);

  initDeleteButton();
  createToDoGrid(inputProject, projectIndex);
  
  const newDeleteToDo = document.createElement("button");

  initNewToDoDelete (newDeleteToDo, inputProject, projectIndex);

  const newForm = document.createElement("button");
  newForm.className = "new-box";
  newForm.innerHTML = "New task";
  newForm.addEventListener("click", () => {
    inputProject.addToDoToProject(toDo("", "", new Date(), "1", false));
    const newToDolist = inputProject.getlastToDo();
    openModalToDo(newToDolist, newDeleteToDo, inputProject, projectIndex);
  });

  contentDiv.appendChild(newForm);
};

displayProject(toDoList.getProjectList()[0], 0);
displayProjectList();
initModal();