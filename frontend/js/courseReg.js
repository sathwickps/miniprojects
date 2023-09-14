let cump_sub;

async function getSubjectbySem(sem){
    let response=await fetch("http://127.0.0.1:5000/subjects?sem="+sem, {
    method: "GET",    
    headers: {
        "Content-type": "application/json"
    }
  });  
  let data= await response.json();
  console.log('validated');
  return data;
  }



  function onSubmitClick() {
    event.preventDefault();
    const sem = localStorage.getItem("sem");
    getSubjectbySem(sem).then(subjects => {
        const compulsorySubjects = subjects.compulsorySubjects;
        const optionalSubjects = subjects.optionalSubjects;
        let compulsoryTable = '<table><tr><th>Code</th><th>Name</th><th>Credits</th><th>Action</th></tr>';
        for (const subject of compulsorySubjects) {
            compulsoryTable += `<tr><td>${subject[0]}</td><td>${subject[1]}</td><td>${subject[2]}</td><td><input type="checkbox" name="enableDisable"></td></tr>`;
        }
        compulsoryTable += '</table>';
        let optionalTable = '<table><tr><th>Code</th><th>Name</th><th>Credits</th><th>Select</th></tr>';
        for (let i = 0; i < optionalSubjects.length; i++) {
            const nameAttribute = i < 2 ? 'optionalChoice1' : 'optionalChoice2';
            optionalTable += `<tr><td>${optionalSubjects[i][0]}</td><td>${optionalSubjects[i][1]}</td><td>${optionalSubjects[i][2]}</td><td><input type="radio" name="${nameAttribute}" value="${optionalSubjects[i][0]}" ${i < 2 ? 'checked' : ''}></td></tr>`;
        }
        optionalTable += '</table>';
        document.getElementById("table").innerHTML = compulsoryTable + optionalTable;
    });
}

function enableDisable(button) {
    const row = button.parentElement.parentElement;
    const code = row.cells[0].textContent; 
}
    

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
}
         
