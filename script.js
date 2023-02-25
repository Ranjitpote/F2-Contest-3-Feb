// Initialize empty tableData array
let tableData = [];

// Function to generate a new ID for each row
function generateID() {
  return tableData.length + 1;
}

// Function to validate input fields
function validateInputFields(name, roll, subject, marks, markedBy) {
  if (!name || !roll || !subject || !marks || !markedBy) {
    alert("Please fill in all fields.");
    return false;
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    alert("Please enter a valid number between 0 and 100 for marks.");
    return false;
  }

  if (!markedBy.includes("@")) {
    alert("Please enter a valid email address for markedBy.");
    return false;
  }

  return true;
}

// Function to add a new row to the table
function addNewRow() {
  // Get table body element and generate new ID
  const tableBody = document.querySelector("#table tbody");
  const newID = generateID();

  // Create new row element with input fields and save button
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${newID}</td>
    <td><input type="text" name="student-name"></td>
    <td><input type="text" name="student-roll"></td>
    <td><input type="text" name="subject"></td>
    <td><input type="text" name="marks"></td>
    <td><input type="text" name="marked-by"></td>
    <td><button class="save-row-btn">Save</button></td>
  `;

  // Add event listener to save button
  const saveBtn = newRow.querySelector(".save-row-btn");
  saveBtn.addEventListener("click", () => {
    // Get input field values
    const name = newRow.querySelector("input[name=student-name]").value;
    const roll = newRow.querySelector("input[name=student-roll]").value;
    const subject = newRow.querySelector("input[name=subject]").value;
    const marks = newRow.querySelector("input[name=marks]").value;
    const markedBy = newRow.querySelector("input[name=marked-by]").value;

    // Validate input fields
    if (!validateInputFields(name, roll, subject, marks, markedBy)) {
      return;
    }

    // Create new row object and add to tableData array
    const newRowData = {
      id: newID,
      student_name: name,
      student_roll: roll,
      subject: subject,
      marks: marks,
      markedBy: markedBy,
    };
    tableData.push(newRowData);

    // Log new row and tableData array to console
    console.log(newRowData);
    console.log(tableData);

    // Clear input fields and remove save button
    newRow.querySelectorAll("input").forEach((input) => (input.value = ""));
    saveBtn.remove();
  });

  // Append new row to table body
  tableBody.appendChild(row);
}

// Add event listener to "create new row" button
const addRowBtn = document.querySelector("#add-row-btn");
addRowBtn.addEventListener("click", addNewRow);

// Add event listener to "save" button
const saveBtn = document.querySelector("#save-btn");
saveBtn.addEventListener("click", () => {
  // Validate all input fields before saving
  let valid = true;
  document.querySelectorAll("#table tbody tr").forEach((row) => {
    const name = row.querySelector("input[name=student-name]").value;
    const roll = row.querySelector("input[name=student-roll]").value;
    const subject = row.querySelector("input[name=subject]").value;
    const marks = row.querySelector("input[name=marks]").value;
    const markedBy = row.querySelector("input[name=marked-by]").value;
    if (!validateInputFields(name, roll, subject, marks, markedBy)) {
      valid = false;
    }
  });

  // Save all rows if all input fields are valid
  if (valid) {
    const allRows = document.querySelectorAll("#table tbody tr");
    allRows.forEach((row) => {
      const name = row.querySelector("input[name=student-name]").value;
      const roll = row.querySelector("input[name=student-roll]").value;
      const subject = row.querySelector("input[name=subject]").value;
      const marks = row.querySelector("input[name=marks]").value;
      const markedBy = row.querySelector("input[name=marked-by]").value;
      const id = row.querySelector("td:first-child").textContent;
      const rowObject = {
        id: id,
        student_name: name,
        student_roll: roll,
        subject: subject,
        marks: marks,
        markedBy: markedBy,
      };
      tableData.push(rowObject);
    });
    // Log tableData array to console and clear table body
    console.log(tableData);
    document.querySelector("#table tbody").innerHTML = "";
  }
});
