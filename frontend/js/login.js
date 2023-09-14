document.getElementById("login-btn").addEventListener("click", function(event) {
    event.preventDefault();
  
    // let userType = document.getElementById("user-type").value;
    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    localStorage.setItem("usn",username);
  
    validatePassword(username, pass).then(success => {
      if (success) {
        // fetch datas
        let studDetails=getStudentDetails(username).then(studValue=>{
          localStorage.setItem("sem",studValue.sem);
          localStorage.setItem("usn",studValue.usn);
          localStorage.setItem("name",studValue.name);
        });
          
        
         window.location.href = "sem.html";
      } else {
        alert("Password validation failed.");
      }
    }).catch(error => {
      console.error("Error:", error);
    });
  });
  
  async function validatePassword(username,pass){
    let response=await fetch("http://127.0.0.1:5000/password/validate", {
    method: "POST",
    body: JSON.stringify({
        usn: username,
        password: pass
        
    }),
    headers: {
        "Content-type": "application/json"
    }
  });

  
  let data= await response.json();
  console.log('validated');
  return data.success;
  }

  async function getStudentDetails(username){
    let response=await fetch("http://127.0.0.1:5000/student?usn="+username, {
    method: "GET",    
    headers: {
        "Content-type": "application/json"
    }
  });  
  let data= await response.json();
  console.log('validated');
  return data;
  }
 
  