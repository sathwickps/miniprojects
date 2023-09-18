// document.getElementById("login-btn").addEventListener("click", async function (event) {
//   event.preventDefault();

//   const userType = document.getElementById("user-type").value;
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   try {
//     const isPasswordValid = await validatePassword(username, password);

//     if (isPasswordValid) {
//       if (userType === "student") {
//         const hasSubmittedForm = await checkFormSubmission(username);
//         console.log(hasSubmittedForm);
//         if (hasSubmittedForm) {
//           alert("You have already submitted the form. Cannot login again.");
//         } else {
//           // Fetch subjects and display tables
//           const sem = localStorage.getItem("sem");
//           const subjects = await getSubjectBySem(sem);
//           displaySubjectTables(subjects);
//         }
//       } else if (userType === "admin") {
//         window.location.href = "adminpage.html";
//       } else {
//         alert("Please select a user type.");
//       }
//     } else {
//       alert("Password validation failed.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

    

//   async function validatePassword(username,pass){
//     let response=await fetch("http://127.0.0.1:5000/password/validate", {
//     method: "POST",
//     body: JSON.stringify({
//         usn: username,
//         password: pass        
//     }),
//     headers: {
//         "Content-type": "application/json"
//     }
//   });  
//   let data= await response.json();
//   console.log('validated');
//   return data.success;
//   }

//   async function getStudentDetails(username){
//     let response=await fetch("http://127.0.0.1:5000/student?usn="+username, {
//     method: "GET",    
//     headers: {
//         "Content-type": "application/json"
//     }
//   });  
//   let data= await response.json();
//   console.log('validated');
//   return data;
// }

async function checkFormSubmission(username) {
  try {
    const response = await fetch("http://127.0.0.1:5000/student/subjects?usn=" + username, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    });
    const data = await response.json();
    const compulsorySubjectsLength = data.compulsorySubjects.length;
    const optionalSubjectsLength = data.optionalSubjects.length;

    if (compulsorySubjectsLength === 0 && optionalSubjectsLength === 0) {
      return false; // User has not submitted the form
    } else {
      return true; // User has already submitted the form
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}


document.getElementById("login-btn").addEventListener("click", function(event) {
  event.preventDefault();

  let userType = document.getElementById("user-type").value;
  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;

  if (userType === "student") {
    validatePassword(username, pass).then(success => {
      if (success) {
        checkFormSubmission(username).then(hasFormSubmitted=>
          {
            console.log(hasFormSubmitted);
            if(!hasFormSubmitted){
              getStudentDetails(username).then(studValue => {
                localStorage.setItem("sem", studValue.sem);
                localStorage.setItem("usn", studValue.usn);
                localStorage.setItem("name", studValue.name);
                window.location.href = "sem.html";
              });    
            }
            else{
              alert("Form Already Submtted!!");
            }
          })
        // Fetch student details
             
      } else {
        alert("Password validation failed.");
      }
    }).catch(error => {
      console.error("Error:", error);
    });
  } else if (userType === "admin") {
   window.location.href = "adminpage.html";
  } else {
    alert("Please select a user type.");
  }
});

async function validatePassword(username, pass) {
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
  let data = await response.json();
  console.log('validated');
  return data.success;
}

async function getStudentDetails(username) {
  let response = await fetch("http://127.0.0.1:5000/student?usn=" + username, {
    method: "GET",    
    headers: {
      "Content-type": "application/json"
    }
  });  
  let data = await response.json();
  console.log('validated');
  return data;
}