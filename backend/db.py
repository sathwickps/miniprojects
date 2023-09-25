import sqlite3

def connect():
    conn = sqlite3.connect('StudentDB.db')
    return conn

def closeConnection(conn):
    conn.close()

def getPasswordbyUsn(usn):
    con = connect()
    cur = con.cursor()
    cur.execute("SELECT password FROM login WHERE usn = ?", (usn,))
    userPassword = cur.fetchone()
    closeConnection(con)
    return userPassword

def getStudentDetails(usn):
    con = connect()
    cur = con.cursor()
    cur.execute("SELECT * FROM student where usn = ?", (usn,))
    userSem = cur.fetchone()
    closeConnection(con)
    return userSem

def insertIntoStudChoice(sub_code, sem, usn):
    con = connect()
    cur = con.cursor()
    cur.execute("INSERT INTO stud_choice (sub_code, sem, usn) VALUES (?, ?, ?)", (sub_code, sem, usn))
    con.commit()
    closeConnection(con)

def getAdminPassword(username):
    con = connect()
    cur = con.cursor()
    cur.execute("SELECT password FROM admin WHERE username = ?", (username,))
    password = cur.fetchone()
    closeConnection(con)
    return password

def getSubjectsBySem(sem, optional):
    con = connect()
    cur = con.cursor()
    cur.execute("SELECT sub_code, sub_name, credits FROM subject WHERE sem = ? AND optional = ?", (sem, optional))
    subDetails = cur.fetchall()
    closeConnection(con)
    return subDetails

def getSubjectsByUsn(usn, optional):
    con = connect()
    cur = con.cursor()
    cur.execute("SELECT sc.sub_code, sub.sub_name, sub.credits FROM stud_choice AS sc JOIN student as s ON sc.usn = s.usn JOIN subject as sub ON sub.sub_code = sc.sub_code WHERE s.usn = ? AND sub.optional = ?", (usn, optional))
    subjects = cur.fetchall()
    closeConnection(con)
    return subjects