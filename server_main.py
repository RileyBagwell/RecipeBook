import os
from google.cloud import storage
import sqlite3
from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
from mysql.connector.constants import ClientFlag
import sys
import random

# levels (level_ID INTEGER UNIQUE, level INTEGER, level_subject TEXT, correct_answers INTEGER, incorrect_answers INTEGER, answered_questions INTEGER)
# questions (question_ID INTEGER UNIQUE, qsubject TEXT, qunit TEXT, question TEXT, answer TEXT, show_choices BOOLEAN, partial_credit BOOLEAN, user_submitted INTEGER)
# answers (answers_ID INTEGER, answer_ID INTEGER UNIQUE, body TEXT, is_correct BOOLEAN, explanation TEXT, frq TEXT)
# account_information (username TEXT, password TEXT, user_ID INTEGER UNIQUE, profile_pic TEXT, about_me TEXT, role TEXT)
# awards (awardee_ID INTEGER, asubject TEXT, aunit TEXT, kind TEXT, date_earned TIMESTAMP)
# activity_log (activity_ID INTEGER UNIQUE, active_user_ID INTEGER, time_active TIMESTAMP)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'server\gigaleague-37c0eba741e8.json'

storage_client = storage.Client()
# server information
config = {
  'user': 'root',
  'password': '1234',
  'host': '34.69.188.118',
  'client_flags': [ClientFlag.SSL],
  'ssl_ca': 'ssl/server-ca.pem',
  'ssl_cert': 'ssl/client-cert.pem',
  'ssl_key': 'ssl/client-key.pem',
}

class Cloud_Server:
  # returns all user data
  def get_user_infoID(self, user_ID):
    # connecting to database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('SELECT username, password, user_ID, profile_pic, about_me, role FROM account_information WHERE user_ID = '+str(user_ID))
    return cursor.fetchone()
    

  def get_user_infoUP(self, username, password):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('SELECT username, password, user_ID, profile_pic, about_me, role FROM account_information WHERE username = "'+username+'" AND password = "'+password+'"')
    x = cursor.fetchone()
    return x

  # returns a random question from a subject
  def get_question(self, subject):
    cnx = mysql.connector.connect(**config)
    count_cursor = cnx.cursor()
    count_cursor.execute('USE scholar_data') 
    count_cursor.execute('SELECT COUNT(*) FROM questions')
    count = count_cursor.fetchone()
    randpick = random.randint(0, count[0])
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('SELECT question_ID, qsubject, qunit, question, answer, show_choices, partial_credit, user_submitted FROM questions WHERE question_ID = '+str(randpick))
    return cursor.fetchone()

  # returns all the answers to a question
  def get_answers(self, qID):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('SELECT answers_ID, answer_ID, body, is_correct, explanation, frq FROM answers WHERE answers_ID = '+str(qID))
    return cursor.fetchall()

  def get_awards(self, awardee):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('SELECT asubject, aunit, kind, date_earned FROM awards WHERE awardee_ID = '+str(awardee))
    return cursor.fetchall()

  def give_award(self, awardee, sub, unit, kind):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    date = datetime.now().strftime("%D:%M:%Y")
    cursor.execute('INSERT INTO awards (awardee_ID, asubject, aunit, kind, date_earned) VALUES ('+str(awardee)+', '+sub+', '+unit+', '+kind+', '+date+')')

  # changes correct_answers, incorrect_answers, and level based on current scores and boolean if_correct.
  # still needs to update level based on new scores
  def update_user_rank(self, user_ID, if_correct, subject):
    cnx = mysql.connector.connect(**config)
    valcur = cnx.cursor()
    valcur.execute('USE scholar_data SELECT level, correct_answers, incorrect_answers, answered_questions FROM levels WHERE level_ID = '+str(user_ID)+'AND subject = '+subject)
    vals = valcur.fetchone()
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    # checks if user got question correct
    if if_correct == True:
      cursor.execute('UPDATE levels SET correct_answers = '+str(vals[3] + 1)+', answered_questions = '+ str(vals[5]+1) + ' WHERE level_ID = '+str(user_ID)+' AND subject ='+subject)
    else:
      cursor.execute('UPDATE levels SET incorrect_answers = '+str(vals[4] + 1)+', answered_questions = '+ str(vals[5]+1) + ' WHERE level_ID = '+str(user_ID)+' AND subject ='+subject)
    cnx.commit()
  
  # creates a new user
  def create_student(self, username, password):
    cnx = mysql.connector.connect(**config)
    cur = cnx.cursor()
    cur.execute('USE scholar_data')
    cur.execute('SELECT COUNT(*) FROM account_information')
    count = cur.fetchone()
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('INSERT INTO account_information (username, password, user_ID, profile_pic, about_me, role) VALUES ("'+username+'", "'+password+'", '+str(count[0]+1)+', "", "", "student")')
    cnx.commit()

  def create_teacher(self, username, password):
    cnx = mysql.connector.connect(**config)
    cur = cnx.cursor()
    cur.execute('USE scholar_data')
    cur.execute('SELECT COUNT(*) FROM account_information')
    count = cur.fetchone()
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('INSERT INTO account_information (username, password, user_ID, profile_pic, about_me, role) VALUES ("'+username+'", "'+password+'", '+str(count[0]+1)+', "", "", "teacher")')
    cnx.commit()

  def create_admin(self, username, password):
    cnx = mysql.connector.connect(**config)
    cur = cnx.cursor()
    cur.execute('USE scholar_data')
    cur.execute('SELECT COUNT(*) FROM account_information')
    count = cur.fetchone()
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('INSERT INTO account_information (username, password, user_ID, profile_pic, about_me, role) VALUES ("'+username+'", "'+password+'", '+str(count[0]+1)+', "", "", "admin")')
    cnx.commit()

  # creates timestamps of when user specific activities occur
  def create_timestamp(self, user_ID):
    timenow = datetime.now().timestamp()
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE scholar_data')
    cursor.execute('SELECT COUNT(*) FROM activity_log')
    x = cursor.fetchone()[0]
    cur = cnx.cursor()
    cur.execute('USE scholar_data')
    cur.execute('INSERT INTO activity_log (activity_ID, active_user_ID, time_active) VALUES ('+str(x)+', '+str(user_ID)+', '+str(timenow)+')')
    cnx.commit()

cnx = mysql.connector.connect(**config)
