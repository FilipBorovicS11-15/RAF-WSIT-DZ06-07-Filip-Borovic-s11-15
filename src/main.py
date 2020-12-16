import json

from flask import Flask,render_template,url_for,request
import mysql.connector

app = Flask(__name__)

def konekcija():
   mydb = mysql.connector.connect(
      host="localhost",
      user="root",
      password="",
      database="raspored"
   )

   return mydb

@app.route('/predavac', methods=['GET','POST'])
def predavac():
   pretrazeno = request.form['predavac']
   pretrazeno = pretrazeno.rstrip()
   pretrazeno = pretrazeno.lstrip()

   mydb = konekcija()
   kursor = mydb.cursor()
   kursor.execute("SELECT * FROM raspored WHERE nastavnik LIKE '%"+str(pretrazeno)+"%'")
   res = kursor.fetchall()

   res = json.dumps(res)
   return res

@app.route('/ucionica', methods=['GET','POST'])
def ucionica():
   pretrazeno = request.form['ucionica']
   pretrazeno = pretrazeno.rstrip()
   pretrazeno = pretrazeno.lstrip()

   mydb = konekcija()
   kursor = mydb.cursor()
   kursor.execute("SELECT * FROM raspored WHERE grupe LIKE '%"+str(pretrazeno)+"%'")
   res = kursor.fetchall()

   res = json.dumps(res)
   return res

@app.route('/raspored')
def raspored():
   mydb = konekcija()
   kursor = mydb.cursor()
   kursor.execute("SELECT * FROM raspored")
   res = kursor.fetchall()

   kursor.execute("SELECT DISTINCT nastavnik, grupe FROM raspored GROUP BY nastavnik")
   res2 = kursor.fetchall()

   return render_template("index.html",res=res,res2=res2)

@app.route('/podaci', methods=['GET','POST'])
def podaci():
    pretrazeno = request.form['pretrazeno']

    mydb = konekcija()
    kursor = mydb.cursor()
    kursor.execute("SELECT * FROM raspored WHERE predmet LIKE '%"+str(pretrazeno)+"%' OR nastavnik LIKE '%"+str(pretrazeno)+"%'")
    res = kursor.fetchall()

    res = json.dumps(res)
    return res

if __name__ == '__main__':
   app.run()