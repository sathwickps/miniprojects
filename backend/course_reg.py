import db
from flask import Flask,request,render_template,redirect,url_for,flash
from flask_cors import CORS,cross_origin

app = Flask(__name__)
CORS(app)


@app.route('/')
def login():    
    return render_template('login.html')

@app.route('/login',methods=['POST'])
def validation():
    if request.method == 'POST':
        username=request.json["usn"]
        password=request.json["password"]
        print(username)
        print(password)
        passwd=db.getPasswordbyUsn(username)[0]
        if passwd == password:
            return redirect(url_for('addSubjectsByUsn', usn=username))
        else:
            flash('Invalid username, password, or user type', 'error')
    return render_template('login.html')
# ---------------------------------------------------
@app.route("/subjects", methods=["POST"])
def addSubjectsByUsn():
    usn = request.json["usn"]
    subCodes = request.json["subCodes"]
    sem = request.json["sem"]
    for subCode in subCodes:
        db.insertIntoStudChoice(subCode, sem, usn)
    return { "success" : True }


# # /subjects?sem=2
# @app.route("/subjects", methods=["GET"])
# def getSubjectByUsn():
#     sem = request.args.get("sem")
    
#     compulsorySubjects = db.getSubjectsBySem(sem, 0)
#     optionalSubjects = db.getSubjectsBySem(sem, 1)

#     return { "compulsorySubjects": compulsorySubjects, "optionalSubjects": optionalSubjects }

# #/student?usn=1BY22MC058
# @app.route("/student", methods=["GET"])
# def getStudentByUsn():
#     usn = request.args.get("usn")    
#     studentDetails = db.getStudentDetails(usn)
#     return { "usn": studentDetails[0], "name": studentDetails[1], "sem": studentDetails[2] }

# #/students/subjects?usn=1BY22MC058
# @app.route("/student/subjects", methods=["GET"])
2# def getSubjectsByUsn():
#     usn = request.args.get("usn")
    
#     compulsorySub = db.getSubjectsByUsn(usn, 0)
#     optionalSub = db.getSubjectsByUsn(usn, 1)
    
#     return { "compulsorySubjects": compulsorySub, "optionalSubjects": optionalSub }



if __name__ == '__main__':
    app.run(debug=True)
