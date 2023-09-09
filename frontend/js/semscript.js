document.getElementById("go-btn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    let selectedSemester = document.getElementById("semester").value;
  
    if (selectedSemester === "1st") {
      // Redirect to the 1st semester page
      window.location.href = "sem1.html";
    } else if (selectedSemester === "2nd") {
      // Redirect to the 2nd semester page
      window.location.href = "sem2.html";
    } else {
      alert("Please select a semester.");
    }
  });
  