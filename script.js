const toDo = (title, description, dueDate, priority) => {
  const getTitle  = () => title;
  const getDescription  = () => description;
  const getDueDate  = () => dueDate;
  const getPriority  = () => priority;
  return {getTitle, getDescription, getDueDate, getPriority}
}

const project = (name, attributedToDoList) => {
  const getName  = () => name;
  const getAttributedToDoList  = () => attributedToDoList;
  const addToDoToProject = (toDo) => attributedToDoList.push(toDo);
  return {getName, getAttributedToDoList, addToDoToProject}
}

testToDo1 = toDo("test title 1", "test description 1", "test date 1", "urgent1");
testToDo2 = toDo("test title 2", "test description 2", "test date 2", "urgent2");
testToDo3 = toDo("test title 3", "test description 3", "test date 3", "urgent3");

testProject = project("test name", [testToDo1, testToDo2, testToDo3]);
console.log(testProject.getName());