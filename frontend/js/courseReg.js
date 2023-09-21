let cump_sub;

async function getSubjectbySem(sem) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/subjects?sem=${sem}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

function onLoad() {
  event.preventDefault();
  const sem = localStorage.getItem("sem");
  getSubjectbySem(sem).then(subjects => {
    console.log(sem);
    const compulsorySubjects = subjects.compulsorySubjects;
    const optionalSubjects = subjects.optionalSubjects;
    let compulsoryTable = '<h3>Compulsory Courses</h3><table class="table"><tr><th>Code</th><th>Name</th><th>Credits</th><th>Action</th></tr>';
    for (const subject of compulsorySubjects) {
      compulsoryTable += `<tr><td>${subject[0]}</td><td>${subject[1]}</td><td>${subject[2]}</td><td><input type="checkbox" name="enableDisable" value="${subject[0]}"></td></tr>`;
    }
    compulsoryTable += '</table>';
    let optionalTable = '<h3>Optional Courses</h3><table class="table"><tr><th>Code</th><th>Name</th><th>Credits</th><th>Select</th></tr>';
    for (let i = 0; i < optionalSubjects.length; i++) {
      //const nameAttribute = i < 2 ? 'optionalChoice1' : 'optionalChoice2';
      optionalTable += `<tr><td>${optionalSubjects[i][0]}</td><td>${optionalSubjects[i][1]}</td><td>${optionalSubjects[i][2]}</td><td><input type="checkbox" name="optionalSubjects" value="${optionalSubjects[i][0]}" ${i < 2 ? 'unchecked' : ''}></td></tr>`;
    }

    optionalTable += '</table>';
    document.getElementById("table").innerHTML = compulsoryTable + optionalTable;
  });
}

function enableDisable(button) {
  const row = button.parentElement.parentElement;
  const code = row.cells[0].textContent;
}

async function validatePassword(username, pass) {
  try {
    let response = await fetch("http://127.0.0.1:5000/password/validate", {
      method: "POST",
      body: JSON.stringify({
        usn: username,
        password: pass
      }),
      headers: {
        "Content-type": "application/json"
      }
    });
    // Process the response if needed
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Add a hidden input field to store the selected subjects.
const subCodesInput = document.createElement("input");
subCodesInput.type = "hidden";
subCodesInput.name = "subCodes";
document.body.appendChild(subCodesInput);

// Add a function to collect the selected subjects and store them in the `subCodes` input field.
function collectSelectedSubjects() {
  const compulsorySubjects = document.querySelectorAll("input[type=checkbox][name=enableDisable]:checked");
  const optionalSubjects = document.querySelectorAll("input[type=checkbox][name=optionalSubjects]:checked");

  console.log(compulsorySubjects);
  // Check if all the checkboxes are selected.
  if (!compulsorySubjects.length) {
    alert("Please select all the compulsory subjects.");
    return ;
  }

  // Collect the selected subject codes.
  const subCodes = [];
  for (const subject of compulsorySubjects) {
    subCodes.push(subject.value);
  }
  // Collect optional subject codes
  for (const sub of optionalSubjects) {
    subCodes.push(sub.value);
  }

  // Store the selected subject codes in the `subCodes` hidden input field.
  subCodesInput.value = JSON.stringify(subCodes);
  console.log(subCodes);
  return;
}

// Add a submit button to the form and trigger the `collectSelectedSubjects()` function when it is clicked.
const submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.className="btn btn-primary"
submitButton.textContent = "Submit";
document.body.appendChild(submitButton);

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  collectSelectedSubjects();
  const subCodes = JSON.parse(subCodesInput.value);
  // Submit the form to the backend.
  try {
    const response = await fetch("http://127.0.0.1:5000/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usn: localStorage.getItem("usn"),
        sem: localStorage.getItem("sem"),
        subCodes: subCodes,
      }),
    });

    // Handle the response from the backend.
    if (response.status === 200) {
      
      window.location.href = "login.html";
      alert("Form submitted successfully!");
    } else {
      alert("Something went wrong. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});