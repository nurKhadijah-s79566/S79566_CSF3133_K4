/*
ERRORS FOUND AND CORRECTED IN THE GIVEN CODE
1. grade.js, line 5: if (name = "") used assignment instead of comparison.
   Corrected by checking name.trim() === "".

2. grade.js, line 9: isNan() had incorrect capitalization.
   Corrected to isNaN().

3. grade.js, line 14: mark < 0 && mark > 100 can never be true.
   Corrected to mark < 0 || mark > 100.

4. grade.js, line 28: getElementByID() used the wrong capitalization.
   Corrected to getElementById().

5. grade.js, line 30: style.colour is not the JavaScript CSS property.
   Corrected to style.color.

6. grade.js, line 38: the loop started at i = 1, skipping grade A.
   Corrected to start at i = 0.

7. grade.js, line 42: innerHtml used incorrect capitalization.
    Corrected to innerHTML.

8. grade.js: The original successful form return allowed a page refresh.
    The corrected function returns false after displaying the result.

9. Part 2: Added empty-mark validation, grade-based colours, random mark,
    date/time display and the external CSS styling.
*/

// Check the student's name and mark, then calculate the grade.
function checkMark() {
    let name = document.getElementById("name").value.trim();
    let markInput = document.getElementById("mark").value.trim();

    // Check for an empty name.
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2: Check for an empty mark.
    if (markInput === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Check that the mark is numeric.
    if (isNaN(markInput)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert the input text into a number.
    let mark = Number(markInput);

    // Check that the mark is within the allowed range.
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Decide the grade using if...else if...else.
    let grade;

    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Display the student's result.
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = name + " got grade " + grade;

    // Change the result colour based on the grade.
    if (grade === "A" || grade === "B") {
        resultElement.style.color = "green";
    } else if (grade === "C") {
        resultElement.style.color = "orange";
    } else {
        resultElement.style.color = "red";
    }

    // Display the date and time when the grade was checked.
    document.getElementById("checkedTime").innerHTML =
        "Checked on: " + new Date();

    // Prevent the form from refreshing the page.
    return false;
}

// Display all four grades and their mark ranges using a for loop.
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark Range</th></tr>";

    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] +
            "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";

    document.getElementById("tableContainer").innerHTML = tableHTML;
}

// Generate a random whole-number mark from 0 to 100.
function generateRandomMark() {
    let randomMark = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomMark;
}
