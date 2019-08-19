$(document).ready(init);

function init() {
    console.log('She ready!')

    $('.addButton').on('click', handleSubmit);
    $('.viewTask').on('click', '.js-check-btn', completedTask);
    $('.viewTask').on('click', '.js-btn-delete', clickDeleteTask);

    getTask();
}

function completedTask(event) {
    console.log('task complete');
}

function handleSubmit() {
    let taskToSend = {
        task: $('.toDo').val(),
        date: $('.dueDate').val(),
    };

    postTask(taskToSend);

    $('.toDo').val('');
    $('.dueDate').val('');

}

function clickDeleteTask(event) {
    const buttonDataObject = $(this).data();
    const taskId = buttonDataObject.id;

    deleteTask(taskId);
}

function postTask(taskToSend) {
    $.ajax({
        type: 'POST',
        url: '/task',
        data: taskToSend,
    }).then(function (response) {
        console.log('Response from server: ', response);
        getTask();
    }).catch(function (error) {
        console.log('Error in POST', error);
        alert('Unable to add task at this time. Please try again later.');
    })
}

function getTask() {
    $.ajax({
        type: 'GET',
        url: '/task'
    }).then(function (response) {
        console.log('Response from server: ', response);
        renderTask(response)
    }).catch(function (error) {
        console.log('Error in GET', error);
    })
}

function renderTask(task) {

    $('.viewTask').empty();

    for (let i = 0; i < task.length; i += 1) {
        let aTask = task[i];
        
        let $tr = $('<tr></tr>');
        $tr.data('task', aTask);
        let formatTime = moment(aTask.date).format('MMMM Do YYYY');
        $tr.append(`<td>${aTask.task}</td>`);
        $tr.append(`<td>${formatTime}</td>`);
        $tr.append(`<button class="js-btn-delete" data-id="${aTask.id}">Delete</button></td>`);
        $('.viewTask').append($tr); 
    }
}


function changeStatus(taskId){
    $.ajax({
      type: 'PUT',
      url: `/task/${taskId}`,
      }).then(function(response) {
        console.log('Response from server.', response);
        getTask();
      }).catch(function(error) {
        console.log('Error in PUT', error)
        alert('Unable to update task at this time. Please try again later.');
      });
  }


function deleteTask(taskId) {
    $.ajax({
        type: 'DELETE',
        url: `/task/${taskId}`,
    }).then(function (response) {
        console.log('Response from server.', response);
        getTask();
    }).catch(function (error) {
        console.log('Error in DELETE', error)
        alert('Unable to delete task at this time. Please try again later.');
    });
}