document.getElementById("login-btn").addEventListener("click", function(event) {
  event.preventDefault();

  let userType = document.getElementById("user-type").value;
  let username = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  
  


  validatePassword(username, pass).then(success => {
    
    if (success) {
      
      window.location.href = "sem1.html";
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

