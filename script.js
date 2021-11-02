const toDoList = (() => {
  let projectList = [];
  const getProjectList = () => projectList;
  const createProject = (inputName) => projectList.push(project(inputName, []));
  const addProjectToList = (inputProject) => projectList.push(inputProject);
  const displayProjects = () => {
    for (let i = 0; i < projectList.length; i++) {
      console.log(projectList[i].getName());
      inputList = projectList[i].getAttributedToDoList();
      for (let j = 0; j < inputList.length; j++) {
        console.log(inputList[j].getTitle());
      }
    }
  };

  return {
    getProjectList,
    createProject,
    addProjectToList,
    displayProjects
  };
})();

const toDo = (title, description, dueDate, priority, completion) => {
  const getTitle  = () => title;
  const getDescription  = () => description;
  const getDueDate  = () => dueDate;
  const getPriority  = () => priority;
  const setPriority = (inputPriority) => priority = inputPriority;
  const getCompletion  = () => completion;
  const closeToDo  = () => completion = true;
  const openToDo  = () => completion = false;
  return {getTitle, getDescription, getDueDate, getPriority, getCompletion, setPriority, closeToDo, openToDo};
};

const project = (name, attributedToDoList) => {
  const getName  = () => name;
  const getAttributedToDoList  = () => attributedToDoList;
  const addToDoToProject = (toDo) => attributedToDoList.push(toDo);
  return {getName, getAttributedToDoList, addToDoToProject};
};


testToDo1 = toDo("test title 1", "test description 1", "test date 1", "urgent1");
testToDo2 = toDo("test title 2", "test description 2", "test date 2", "urgent2");
testToDo3 = toDo("test title 3", "test description 3", "test date 3", "urgent3");
testProject = project("test name", [testToDo1, testToDo2, testToDo3]);
testToDo4 = toDo("test title 4", "test description 4", "test date 4", "urgent4");
testProject.addToDoToProject(testToDo4);

toDoList.addProjectToList(testProject);
toDoList.displayProjects();