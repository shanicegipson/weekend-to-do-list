$(document).ready(init);

function init(){
    console.log('She ready!')

    $('.addButton').on('click', handleSubmit)
}


function handleSubmit() {
    let taskToSend = {
        task: $('.toDo').val(),
        date: $('.dueDate').val(),
    };
     
    console.log('In', taskToSend);

    postTask(taskToSend);

    $('.toDo').val('');
    $('.dueDate').val('');

}

function postTask(taskToSend) {
$.ajax({
    type: 'POST',
    url:'/task',
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
    type:'GET',
    url: '/task'
}).then(function (response) {
    console.log('Response from server: ', response);
    // renderTask(response)
}).catch(function (error) {
    console.log('Error in GET', error);
})
}

function renderText(koalas) {
    $('.taskList').empty();
  
    for (let i = 0; i < koalas.length; i += 1) {
      let koala = koalas[i];
      // For each book, append a new row to our table
  
      let $tr = $('<tr></tr>');
      $tr.data('koala', koala);
      $tr.append(`<td>${koala.name}</td>`);
      $tr.append(`<td>${koala.age}</td>`);
      $tr.append(`<td>${koala.gender}</td>`);
      $tr.append(`<td>${koala.ready_to_transfer}</td>`);
      $tr.append(`<td>${koala.notes}</td>`);
  
      if(koala.ready_to_transfer =='N'){
        $tr.append(`<td><button class="js-btn-markAsReady btn" data-id="${koala.id}">Ready for Transfer</button></td>`)
      }else{
        $tr.append(`<td>  </td>`);
      }
      
      $tr.append(`<button class="js-btn-delete btn" data-id="${koala.id}">Delete</button></td>`);
      $('#viewKoalas').append($tr);
    }
  }


function completedTask() {
console.log('task complete');
  }

function changeStatus() {
    console.log('change of status');
}