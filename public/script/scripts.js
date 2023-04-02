var numberOfStudents = 0;
var canBeUpdated = "1";

function addStudents(name) {
    if (canBeUpdated == "0") {
        alert("Marks cannot be added after final submission !!!");
    } else if (numberOfStudents < 4) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/addClick");
        xhr.setRequestHeader("Content-Type", "application/json");
        const data = {
            name: name,
        };
        xhr.send(JSON.stringify(data));
        numberOfStudents++;
    } else alert("No more students can be added!!!");
}

function removeStudents(name) {
    if (canBeUpdated == "0") {
        alert("Marks cannot be added after final submission !!!");
    } else if (numberOfStudents < 4) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/removeClick");
        xhr.setRequestHeader("Content-Type", "application/json");
        const data = {
            name: name,
        };
        xhr.send(JSON.stringify(data));
        numberOfStudents--;
        location.reload();
    } else alert("No more students can be added!!!");
}

function submitForm(event, name) {
    if (canBeUpdated == "0") {
        alert("Marks cannot be added after final submission !!!");
    } else {
        event.preventDefault();

        console.log(name);
        // Get the form values
        // Get the form values
        const m1 = document.querySelector("#marks1").value;
        const m2 = document.querySelector("#marks2").value;
        const m3 = document.querySelector("#marks3").value;

        console.log(m1);
        console.log(m2);
        console.log(m3);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/add-student");
        xhr.setRequestHeader("Content-Type", "application/json");
        const data = {
            name: name,
            marks1: m1,
            marks2: m2,
            marks3: m3,
        };
        xhr.send(JSON.stringify(data));
    }
}

function disableInputs() {
    // Disable input fields

    var inputs = document.querySelectorAll("input");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
        localStorage.setItem(inputs[i].id + "-disabled", "true"); // store the disabled state
    }

    // Disable remove buttons
    var removeBtns = document.querySelectorAll("button");
    for (var i = 0; i < removeBtns.length; i++) {
        if (removeBtns[i].textContent === " Remove ") {
            removeBtns[i].disabled = true;
            localStorage.setItem(
                removeBtns[i].previousSibling.textContent + "-disabled",
                "true"
            ); // store the disabled state
        }
    }

    // Disable form submit buttons
    var submitBtns = document.querySelectorAll('form input[type="submit"]');
    for (var i = 0; i < submitBtns.length; i++) {
        submitBtns[i].disabled = true;
    }
    localStorage.setItem("finalSubmitBtn-disabled", "true"); // store the disabled state of the final submit button
}

// Check stored state and disable elements
window.addEventListener("load", function () {
    var inputs = document.querySelectorAll("input");
    for (var i = 0; i < inputs.length; i++) {
        if (localStorage.getItem(inputs[i].id + "-disabled") === "true") {
            inputs[i].disabled = true;
        }
    }

    var removeBtns = document.querySelectorAll("button");
    for (var i = 0; i < removeBtns.length; i++) {
        if (
            removeBtns[i].textContent === "Remove" &&
            localStorage.getItem(
                removeBtns[i].previousSibling.textContent + "-disabled"
            ) === "true"
        ) {
            removeBtns[i].disabled = true;
        }
    }

    var finalSubmitBtn = document.getElementById("finalSubmitBtn");
    if (localStorage.getItem("finalSubmitBtn-disabled") === "true") {
        disableInputs();
    }
    //document.querySelector("#addStudentLink").setAttribute("href", "#");
});
