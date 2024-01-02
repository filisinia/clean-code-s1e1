//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector("#new-task");//Add a new task.
const addButton = document.querySelector(".todo__add-btn");//first button
const incompleteTaskHolder = document.querySelector(".todo__incomplete");//ul of #incompleteTasks
const completedTasksHolder = document.querySelector(".todo__completed");//completed-tasks


//New task list item
const createNewTaskElement = function(taskString) {

  const todoItem = document.createElement("section");

  //input (checkbox)
  const checkBox = document.createElement("input");//checkbx
  //label
  const label = document.createElement("label");//label
  //input (text)
  const editInput = document.createElement("input");//text
  //button.edit
  const editButton = document.createElement("button");//edit button

  //button.delete
  const deleteButton = document.createElement("button");//delete button
  const deleteButtonImg = document.createElement("img");//delete button image

  label.innerText = taskString;
  label.classList.add('todo__label');

  //Each elements, needs appending
  todoItem.classList.add("todo__item");

  checkBox.type="checkbox";
  checkBox.classList.add("todo__check");

  editInput.type="text";
  editInput.classList.add("todo__field");

  editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
  editButton.classList.add("todo__btn", "todo__edit-btn");

  deleteButton.classList.add("todo__btn", "todo__delete-btn");
  deleteButtonImg.src ='./remove.svg';
  deleteButtonImg.classList.add("todo__img");
  deleteButton.appendChild(deleteButtonImg);


  //and appending.
  todoItem.appendChild(checkBox);
  todoItem.appendChild(label);
  todoItem.appendChild(editInput);
  todoItem.appendChild(editButton);
  todoItem.appendChild(deleteButton);
  return todoItem;
}



const addTask = function() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const todoItem = createNewTaskElement(taskInput.value);

  //Append todoItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(todoItem);
  bindTaskEvents(todoItem, taskCompleted);

  taskInput.value = "";

}

//Edit an existing task.

const editTask = function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  const todoItem = this.parentNode;

  const editInput = todoItem.querySelector(".todo__field");
  const label = todoItem.querySelector(".todo__label");
  const editBtn = todoItem.querySelector(".todo__edit-btn");
  const containsClass = todoItem.classList.contains("todo__edit-task");
  //If class of the parent is .editmode
  if (containsClass) {

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else{
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    todoItem.classList.toggle("todo__edit-task");
};


//Delete task.
const deleteTask = function() {
  console.log("Delete Task...");

  const todoItem = this.parentNode;
  const todoState = todoItem.parentNode;
  //Remove the parent list item from the ul.
  todoState.removeChild(todoItem);

}


//Mark task completed
const taskCompleted = function() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const todoItem = this.parentNode;
  completedTasksHolder.appendChild(todoItem);
  bindTaskEvents(todoItem, taskIncomplete);

}


const taskIncomplete = function() {
  console.log("Incomplete Task...");
//Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const todoItem = this.parentNode;
  incompleteTaskHolder.appendChild(todoItem);
  bindTaskEvents(todoItem,taskCompleted);
}



const ajaxRequest = function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  const checkBox = taskListItem.querySelector(".todo__check");
  const editButton = taskListItem.querySelector(".todo__edit-btn");
  const deleteButton = taskListItem.querySelector(".todo__delete-btn");


  //Bind editTask to edit button.
  editButton.addEventListener("click", editTask);
  //Bind deleteTask to delete button.
  deleteButton.addEventListener("click", deleteTask);
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.addEventListener("change", checkBoxEventHandler);
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.