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
  return { getName, getAttributedToDoList, addToDoToProject };
};

const toDoList = (() => {
  let projectList = [project("default", [])];
  const getProjectList = () => projectList;
  const createProject = (inputName) => projectList.push(project(inputName, []));
  const addProjectToList = (inputProject) => projectList.push(inputProject);
  const displayProjectList = () => projectList.map(el => el.getName());
  return {
    getProjectList,
    createProject,
    addProjectToList,
    displayProjectList
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
      displayProject(projectList[i]);
    });
    contentDiv.appendChild(project);
  }
  const form = document.createElement("form");
  form.className = "project-form";

  const frm_text= document.createElement("input");
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

function displayProject(inputProject) {
  const inputToDolist = inputProject.getAttributedToDoList();
  const contentDiv = document.getElementById("content-text");

  const projectBox = document.createElement("div");
  projectBox.innerHTML = inputProject.getName();
  projectBox.className = "content-project-box";
  contentDiv.appendChild(projectBox);
  
  for (let i = 0; i < inputToDolist.length; i++) {
    const toDoListBox = document.createElement("div");

    const titleBox = document.createElement("div");
    titleBox.innerHTML = inputToDolist[i].getTitle();
    titleBox.className = "param-box";

    const descriptionBox = document.createElement("div");
    descriptionBox.innerHTML = inputToDolist[i].getDescription();
    descriptionBox.className = "param-box";

    const dueDate = document.createElement("div");
    dueDate.innerHTML = inputToDolist[i].getDueDate();
    dueDate.className = "param-box";

    const priority = document.createElement("div");
    priority.innerHTML = inputToDolist[i].getPriority();
    priority.className = "param-box";

    const completion = document.createElement("button");
    
    if (inputToDolist[i].getCompletion()) {
      toDoListBox.className = "to-do-list-box";
      completion.className = "completion-box";
      completion.innerHTML = "Open";
      completion.addEventListener("click", () => {
        inputToDolist[i].closeToDo();
        resetToDoListView();
        displayProject(inputProject);
      });
    } else {
      toDoListBox.className = "to-do-list-box-open";
      completion.className = "completion-box-open";
      completion.innerHTML = "Close";
      completion.addEventListener("click", () => {
        inputToDolist[i].openToDo();
        resetToDoListView();
        displayProject(inputProject);
      });
    };

    toDoListBox.appendChild(titleBox);
    toDoListBox.appendChild(descriptionBox);
    toDoListBox.appendChild(dueDate);
    toDoListBox.appendChild(priority);
    toDoListBox.appendChild(completion);
    contentDiv.appendChild(toDoListBox);
  }
};

testToDo1 = toDo("test title 1", "test description 1", "test date 1", "urgent1", true);
testToDo2 = toDo("test title 2", "test description 2", "test date 2", "urgent2", false);
testToDo3 = toDo("test title 3", "test description 3", "test date 3", "urgent3", true);
testProject = project("test name 1", [testToDo1, testToDo2, testToDo3]);
testToDo4 = toDo("test title 4", "test description 4", "test date 4", "urgent4");
testProject.addToDoToProject(testToDo4);

testToDo5 = toDo("test title 5", "test description 5", "test date 5", "urgent5", false);
testToDo6 = toDo("test title 6", "test description 6", "test date 6", "urgent6", true);
testToDo7 = toDo("test title 7", "test description 7", "test date 7", "urgent7", false);
testProject2 = project("test name 2", [testToDo5, testToDo6, testToDo7]);

toDoList.addProjectToList(testProject);
toDoList.addProjectToList(testProject2);
console.log(toDoList.displayProjectList());

displayProject(toDoList.getProjectList()[0]);
displayProjectList()