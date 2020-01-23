function saveStudent() {

    const emailInput = document.getElementById('exampleInputEmail1');
    const passwordInput = document.getElementById('exampleInputPassword1');

    const email = emailInput.value;
    const password = passwordInput.value;

    const url = 'http://192.168.1.35:8081/student/save?email= ' + email + '&password=' + password;

    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadStudentsAjax();
            console.log('Student has been saved successfully. ');
            emailInput.value = '';
            passwordInput.value = '';
        }
    }

    http.open('GET', url, true);
    http.send();
}

function loadStudents() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';

    let studentList = [
        {id: 32, email: 'b@c.com', password: 'pass1'},
        {id: 38, email: 's@c.com', password: 'pass2'},
        {id: 39, email: 'r@c.com', password: 'pass3'},
    ];

    let rows = '';
    for (let i = 0; i < studentList.length; i++) {
        rows += createRow(
            studentList[i].id,
            studentList[i].email,
            studentList[i].password
        );
    }

    tableBody.innerHTML = rows;
}

function showSpinner() {
    const spinnerBox = document.getElementById('mySpinner');
    spinnerBox.innerHTML = '<div class="spinner-border text-primary" role="status"  >\n' +
        '                <span class="sr-only">Loading...</span>\n' +
        '            </div>';
}

function hideSpinner() {
    const spinnerBox = document.getElementById('mySpinner');
    spinnerBox.innerHTML = '';
}

function loadStudentsAjax() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';
    // show spinner
    showSpinner();
    const http = new XMLHttpRequest();
    const url = 'http://192.168.1.35:8081/student/all';

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const studentList = JSON.parse(this.responseText);
            let rows = '';
            for (let i = 0; i < studentList.length; i++) {
                rows += createRow(
                    studentList[i].id,
                    studentList[i].email,
                    studentList[i].password
                );
            }
            tableBody.innerHTML = rows;
            setTimeout(hideSpinner, 1000);
        }
    }

    http.open('GET', url, true);
    http.send();
}

function createRow(id, email, password) {
    return '        <tr>\n' +
        '                <th scope="row">' + id + '</th>\n' +
        '                <td id="email' + id + '">' + email + '</td>\n' +
        '                <td id="password' + id + '">' + password + '</td>\n' +
        '                <td>' +
        '<button class="btn btn-warning" onclick="showEditModal(' + id + ')">edit</button>' +
        '</td>\n' +
        '            </tr>';
}

function showEditModal(id) {
    const emailColumn = document.getElementById('email' + id);
    const passwordColumn = document.getElementById('password' + id);

    $("#editId").val(id);
    $("#editEmail").val(emailColumn.innerText);
    $("#editPassword").val(passwordColumn.innerText);

    $("#editModal").modal('show');

}

function editStudent() {
    const id = $("#editId").val();
    const email = $("#editEmail").val();
    const password = $("#editPassword").val();

    console.log(id + ', ' + email + ', ' + password);

    const url = 'http://localhost:8081/student/edit?id=' + id + '&email=' + email + '&password=' + password;

    console.log(url);

    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $("#editModal").modal('hide');
            loadStudentsAjax();
        }
    };

    http.open('GET', url, true);
    http.send();
}

