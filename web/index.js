function saveStudent() {

    const emailInput = document.getElementById('exampleInputEmail1');
    const passwordInput = document.getElementById('exampleInputPassword1');

    const email = emailInput.value;
    const password = passwordInput.value;

    const url = 'http://192.168.1.35:8081/student/save?email= ' + email + '&password=' + password;

    const http = new XMLHttpRequest();

    http.onreadystatechange = function() {
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

function loadStudentsAjax() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';

    const http = new XMLHttpRequest();
    const url = 'http://192.168.1.35:8081/student/all';

    http.onreadystatechange = function() {
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
        }
    }

    http.open('GET', url, true);
    http.send();
}

function createRow(id, email, password) {
    return '        <tr>\n' +
        '                <th scope="row">' + id + '</th>\n' +
        '                <td>' + email + '</td>\n' +
        '                <td>' + password + '</td>\n' +
        '                <td></td>\n' +
        '            </tr>';
}
