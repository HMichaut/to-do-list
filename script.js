const toDo = (title, description, dueDate, priority, completion) => {
  const getTitle = () => title;
  const getDescription = () => description;
  const getDueDate = () => dueDate;
  const getPriority = () => priority;
  const setPriority = (inputPriority) => priority = inputPriority;
  const getCompletion = () => completion;
  const closeToDo = () => completion = true;
  const openToDo = () => completion = false;
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
  // {
  //   projectList.map(el => el.getName());
  //   // for (let i = 0; i < projectList.length; i++) {
  //   //   console.log(projectList[i].getName());
  //   // inputList = projectList[i].getAttributedToDoList();
  //   // for (let j = 0; j < inputList.length; j++) {
  //   //   console.log(inputList[j].getTitle());
  //   // }
  // };
  return {
    getProjectList,
    createProject,
    addProjectToList,
    displayProjectList
  };
})();

function displayProject(inputProject) {
  const inputToDolist = inputProject.getAttributedToDoList();
  const contentDiv = document.getElementById("content-text");
  for (let i = 0; i < inputToDolist.length; i++) {
    const toDoListBox = document.createElement("div");
    toDoListBox.className = "to-do-list-box";

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

    toDoListBox.appendChild(titleBox);
    toDoListBox.appendChild(descriptionBox);
    toDoListBox.appendChild(dueDate);
    toDoListBox.appendChild(priority);
    contentDiv.appendChild(toDoListBox);
  }
};

testToDo1 = toDo("test title 1", "test description 1", "test date 1", "urgent1");
testToDo2 = toDo("test title 2", "test description 2", "test date 2", "urgent2");
testToDo3 = toDo("test title 3", "test description 3", "test date 3", "urgent3");
testProject = project("test name 1", [testToDo1, testToDo2, testToDo3]);
testToDo4 = toDo("test title 4", "test description 4", "test date 4", "urgent4");
testProject.addToDoToProject(testToDo4);

testToDo5 = toDo("test title 5", "test description 5", "test date 5", "urgent5");
testToDo6 = toDo("test title 6", "test description 6", "test date 6", "urgent6");
testToDo7 = toDo("test title 7", "test description 7", "test date 7", "urgent7");
testProject2 = project("test name 2", [testToDo5, testToDo6, testToDo7]);

toDoList.addProjectToList(testProject);
toDoList.addProjectToList(testProject2);
console.log(toDoList.displayProjectList());

displayProject(testProject2);