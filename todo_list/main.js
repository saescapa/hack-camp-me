var firebaseRootUrl = "https://sam-todo.firebaseio.com/";

var firebaseRoot = new Firebase(firebaseRootUrl);

window.onload = function() {
  var newTaskButton = document.getElementById("new-task-button");
  var todoList = document.getElementById("todo-list");

  function addNewTask(inputText,inputName,key,done) {
    var li = document.createElement("li");
    li.setAttribute("key", key);
    var span = document.createElement("span");
    span.innerHTML = inputText;
    var input = document.createElement("input");
    input.setAttribute("class", "toggle");
    input.setAttribute("type", "checkbox");
    
    var img = document.createElement("img");
    
    img.src = "https://i.imgur.com/BtLxCD6.png";
    img.setAttribute("class", "delete");
    
    var name = document.createElement("span");
    name.setAttribute("class", "name");
    name.innerHTML = inputName;
    
    todoList.appendChild(li);
    li.appendChild(img);
    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(name);
    
    img.onclick = function() {
      var parentLiElement = this.parentElement;
      var liKey = parentLiElement.getAttribute("key");
      var taskUrl = firebaseRootUrl + key;
      var taskRef = new Firebase(taskUrl);
      taskRef.remove();

      todoList.removeChild(parentLiElement);
    }
  }
  newTaskButton.onclick = function () {
    var taskText = prompt("Create new task");
    var taskName = prompt("Your Name: ");
    if(taskName == null && taskName == "") {
      taskName = "anonymous";
    }
    if(taskText !== null && taskText !== "") {
      
      var task = {};
      task.text = taskText;
      task.user = taskName;
      task.done = false; 
  
      firebaseRoot.push(task);
    } else {
      alert("Please input a task");
    }
  };
  firebaseRoot.on('child_added', function (snapshot) {
    var task = snapshot.val();
    var key = snapshot.key();  // <-- CHANGE
    addNewTask(task.text, task.user, key); // <-- CHANGE
  });
};