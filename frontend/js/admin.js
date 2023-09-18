document.addEventListener("DOMContentLoaded", () => {
    const usnInput = document.getElementById("usnInput");
    const getSubjectsBtn = document.getElementById("getSubjectsBtn");
    const subjectList = document.getElementById("subjectList");

    getSubjectsBtn.addEventListener("click", () => {
        const usn = usnInput.value;
        if (!usn) {
            alert("Please enter a USN");
            return;
        }

        fetch(`http://127.0.0.1:5000/student/subjects?usn=${usn}`)
            .then(response => response.json())
            .then(data => {
                subjectList.innerHTML = ""; // Clear previous results
                if (data.compulsorySubjects.length > 0 || data.optionalSubjects.length > 0) {
                    if (data.compulsorySubjects.length > 0) {
                        subjectList.innerHTML += "<h2>Compulsory Subjects:</h2>";
                        subjectList.innerHTML += "<ul>";
                        data.compulsorySubjects.forEach(subject => {
                            subjectList.innerHTML += `<li>${subject[1]} (Code: ${subject[0]}, Credits: ${subject[2]})</li>`;
                        });
                        subjectList.innerHTML += "</ul>";
                    }

                    if (data.optionalSubjects.length > 0) {
                        subjectList.innerHTML += "<h2>Optional Subjects:</h2>";
                        subjectList.innerHTML += "<ul>";
                        data.optionalSubjects.forEach(subject => {
                            subjectList.innerHTML += `<li>${subject[1]} (Code: ${subject[0]}, Credits: ${subject[2]})</li>`;
                        });
                        subjectList.innerHTML += "</ul>";
                    }
                } else {
                    subjectList.innerHTML = "No subjects found for the entered USN.";
                }
            })
            .catch(error => {
                console.error("Error:", error);
                subjectList.innerHTML = "An error occurred while fetching subjects.";
            });
    });
});