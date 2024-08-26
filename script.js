document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const table = document.getElementById('student-table').querySelector('tbody');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    const renderStudents = () => {
        table.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            table.appendChild(row);
        });
    };

    const addStudent = (student) => {
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    };

    const editStudent = (index) => {
        const student = students[index];
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentID').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contactNumber').value = student.contact;
        form.onsubmit = (e) => {
            e.preventDefault();
            students[index] = {
                name: document.getElementById('studentName').value,
                id: document.getElementById('studentID').value,
                email: document.getElementById('email').value,
                contact: document.getElementById('contactNumber').value,
            };
            localStorage.setItem('students', JSON.stringify(students));
            alert("Student Edited Success!");
            form.reset();
            form.onsubmit = handleFormSubmit;
            renderStudents();
        };
    };

    const deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newStudent = {
            name: document.getElementById('studentName').value,
            id: document.getElementById('studentID').value,
            email: document.getElementById('email').value,
            contact: document.getElementById('contactNumber').value,
        };
        addStudent(newStudent);
        alert("Student Registered Success!");
        form.reset();
    };

    form.onsubmit = handleFormSubmit;
    renderStudents();

    // Expose the edit and delete functions to the global scope
    window.editStudent = editStudent;
    window.deleteStudent = deleteStudent;
});