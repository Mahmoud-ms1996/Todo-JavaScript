
// Set Up All Variables
let input = document.querySelector(".add-task input");
let addButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let countTasks = document.querySelector(".stats-task span");
let completedTasks= document.querySelector(".completed-tasks span");
let TryAgain = 0;
let i;
let inputList = [];


// Focus On Input Field
window.onload = function(){
    input.focus();
}

// Adding Task
addButton.onclick = function(){

    // If Input is Empty
    if(input.value === ''){

            Swal.fire({
                icon: 'error',
                title: 'Title Must Be Filled Out',
                text: 'Please Enter A Title',
            })
        
    }else{

      let noTasksMsg = document.querySelector(".no-tasks-message");

      // Check If Span With No Tasks Message Is Exist
      if (document.body.contains(document.querySelector(".no-tasks-message"))){
        
        // Remove No Tasks Message
        noTasksMsg.remove();
      }

        //Add input text to array 
        inputList.push(input.value);
        //Check if there is a deplicate value 
        dupArray(inputList);
        localStorage.setItem(input.value, 'InputValue')
         
        //Add if there is no deplicate value 
        if (TryAgain === 0){

          // Create Main Span Element
        let mainSpan = document.createElement("span");

        // Create Delete Button
        let deletebtn = document.createElement("span");

        // Create The Main Span Text
        let text = document.createTextNode(input.value);
        
        // Create the Delete Button Text
        let deleteText = document.createTextNode("Delete");

        // Add Text To Main Span
        mainSpan.appendChild(text);

        // Add Class To Main Span
        mainSpan.className = 'task-box'

        // Add Text To Delete Buttom
        deletebtn.appendChild(deleteText);

        // Add Class To Delete Button
        deletebtn.className = 'delete';

        // Add Delete Button To Main Span
        mainSpan.appendChild(deletebtn);

        // Add The Task to the Container
        tasksContainer.appendChild(mainSpan);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your Task Has Been Added',
            showConfirmButton: false,
            timer: 1500
          })

        // Empty The input field
        input.value = '';

        // refocus to input field
        input.focus();
        
        
      }
    }
    // count Tasks
    calculateTasks();
};

// function to Check if There is a deplicate input
function dupArray(arr) {
  for (i = 0; i < arr.length; i++) {
      if (arr.indexOf(arr[i]) != i && arr.indexOf(arr[i]) != -1) {
          Swal.fire({
            icon: 'error',
            title: 'Deplicate input!',
            text: 'You Already have this input declared!',
          },arr[i]);
          arr.pop();
          TryAgain = 1;
          console.log(arr);
        } else {
          TryAgain = 0;
        }
  }
}
    
document.addEventListener('click', function(e){

    // Delete Task
    if (e.target.className == 'delete'){

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
              )
              // Remove Currnet task
              e.target.parentNode.remove();
              
              // Check if the last Tasks = 0 and then we put the function no tasks to show
              if(tasksContainer.childElementCount == 0){
                createNoTasks();
              }
            }
          })
        }
        // refocus to input field
        input.focus();

    // Finish Task
    if(e.target.classList.contains('task-box')){

        // Toggle Class 'finished'
        e.target.classList.toggle('finished');
        
    }

    // count Tasks
    calculateTasks();

})

// Function To Create No Tasks Message
function createNoTasks(){

  // Create Message Span Element
  let msgSpan = document.createElement("span");

  // Create The Text Message
  let msgText = document.createTextNode("No Tasks To Show"); 

  // Add Text To Message Span Element
  msgSpan.appendChild(msgText);

  // Add Class To Message Span
  msgSpan.className = 'no-tasks-message';

  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);

  
}

// Function To Calculate Tasks
function calculateTasks(){

  // Calculate Number Tasks
  countTasks.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
  
  // Calculate Completed Tasks
  completedTasks.innerHTML = document.querySelectorAll('.tasks-content .finished').length;

}

// window.localStorage.setItem("all", tasksContainer.innerHTML);