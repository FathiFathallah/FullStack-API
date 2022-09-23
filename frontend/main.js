var data = document.getElementById('data');
var courseName = document.getElementById('courseName');
var courseCat = document.getElementById('courseCat');
var coursePrice = document.getElementById('coursePrice');
var courseDesc = document.getElementById('courseDesc');
var addBtn = document.getElementById('click');
var clearBtn = document.getElementById('clearbtn');
var deleteBtn = document.getElementById('deleteBtn');
var search = document.getElementById('search');


async function getData() {
    var response = await fetch(`http://localhost:3000/courses`);
    var data = await response.json();
    let courses = data.courses;
    showData(courses);
}

getData();


addBtn.onclick = function () {
    inputData();
}

clearBtn.onclick = function () {
    clear();
}

function clear() {
    courseName.value = "";
    courseCat.value = "";
    coursePrice.value = "";
    courseDesc.value = "";
}

deleteBtn.onclick = function () {
    deleteALL();
}

function deleteALL() {

    let text;
    if (confirm("This Action Would Delete All the Data!") == true) {
        fetch(`http://localhost:3000/deleteALL`, {
            // Adding method type
            method: 'DELETE',
        })
            // Converting to JSON
            .then(response => response.json())
            // Displaying results to console
            .then(json => {
                if (json.message == 'Success') {
                    getData();
                }
            });
    }
}

search.onkeyup = function () {
    getSearchedData(search.value);
}





function getSearchedData(text) {
    // POST request using fetch()
    fetch(`http://localhost:3000/searchedCourses`, {
        // Adding method type
        method: 'POST',
        // Adding body or contents to send
        body: JSON.stringify({ text }),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(json => {
            if (json.message == 'Success') {
                showData(json.courses);
            }
        });
}



function UpdateById(ID) {
    let id = ID;
    var course = {
        id: id,
        name: courseName.value,
        cat: courseCat.value,
        price: coursePrice.value,
        description: courseDesc.value
    }
    crudOperation('update', 'PUT', course);
}

function DeleteById(id) {
    var id = {
        id
    };
    crudOperation('delete', 'DELETE', id);
}


function showData(courses) {
    var result = ``;
    for (var i = 0; i < courses.length; i++) {
        result += `
            <tr>
                <td>${courses[i].id}</td>
                <td>${courses[i].name}</td>
                <td>${courses[i].cat}</td>
                <td>${courses[i].price}</td>
                <td>${courses[i].description}</td>
                <td><button   type="button" id="Update${courses[i].id}"  class="btn btn-outline-secandrey">UPDATE</button></td>
                <td><button type="button" id="Delete${courses[i].id}" class="btn btn-outline-danger">DELETE</button></td>
            </tr>
        `;
    }
    data.innerHTML = "";
    data.innerHTML = result;
    for (var j = 0; j < courses.length; j++) {
        let id = courses[j].id;
        let UpDateButton = document.getElementById(`Update${courses[j].id}`);
        let DeleteButton = document.getElementById(`Delete${courses[j].id}`);
        UpDateButton.onclick = function () {
            UpdateById(id);
        }
        DeleteButton.onclick = function () {
            DeleteById(id);
        }
    }
}



function inputData() {

    var course = {
        name: courseName.value,
        cat: courseCat.value,
        price: coursePrice.value,
        description: courseDesc.value,
    }
    crudOperation('addCourse', 'POST', course);
}

function crudOperation(endPoint, method, data) {


    // POST request using fetch()
    fetch(`http://localhost:3000/${endPoint}`, {
        // Adding method type
        method: method,
        // Adding body or contents to send
        body: JSON.stringify(data),
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

        // Converting to JSON
        .then(response => response.json())
        // Displaying results to console
        .then(json => {
            if (json.message == 'Success') {
                getData();
            }
        });
}