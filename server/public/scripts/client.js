$(document).ready(init);

function init() {
    console.log('She ready!')

    $('.addButton').on('click', handleSubmit);
    $('.viewTask').on('click', '.js-check-btn', completedTask);
    $('.viewTask').on('click', '.js-btn-delete', deleteTask);

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

    console.log('In', taskToSend);

    postTask(taskToSend);

    $('.toDo').val('');
    $('.dueDate').val('');

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

        for (let aTask of task) {
            let formatTime = moment(aTask.date).format('MMMM Do YYYY');

            if (aTask.status == 'null') {
                $tr.append(`<td><input class="js-check-btn" data-id="${aTask.id}"></input></td>`)
            } else {
                $tr.append(`<td>  </td>`);
            }


            $tr.append(`<td>${aTask.task}</td>`);
            $tr.append(`<td>${formatTime}</td>`);

            $tr.append(`<td>${aTask.status}</td>`);

            $tr.append(`<button class="js-btn-delete" data-id="${aTask.id}">Delete</button></td>`);
            $('.viewTask').append($tr);
        }
    }
}


function changeStatus() {
    console.log('change of status');
}

// function handleDelete(event) {
//     const buttonDataObject = $(this).data();
//     console.log('in handle Delete');
//     const taskID = buttonDataObject.id;
     
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.value) {
//         deleteTask(taskID);
//         Swal.fire(
//           'Deleted!',
//           'Your file has been deleted.',
//           'success'
//         )
//       }
//     });
//   };

  function deleteTask(id) {
    $.ajax({
      type: 'DELETE',
      url: `/task/${id}`,
    }).then(function (response) {
      console.log('Response from server.', response);
      getTask();
    }).catch(function (error) {
      console.log('Error in DELETE', error)
      alert('Unable to delete task at this time. Please try again later.');
    });
  }