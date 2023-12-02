# pylint: disable=invalid-name
import os
import sys
import sqlite3
from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
from mysql.connector.constants import ClientFlag
from google.cloud import storage


# Profile ("userID"	TEXT, "screenname"	TEXT, "profilePicture"	TEXT, "followerList"	BLOB, "followingList"	BLOB, "postList"	BLOB)
# User ("username"	TEXT, "userID"	TEXT, "OAUTHTOKEN"	TEXT)
# Review" ("reviewID"	TEXT, "parentID"	TEXT, "rating"	INTEGER, "ifReviewReply"	INTEGER, "userID"	INTEGER, "reviewList"	BLOB)
# Post ("postID"	TEXT, "postTitle"	TEXT, "postImage"	TEXT, "postText"	BLOB, "userID"	INTEGER, "reviewList"	BLOB)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'server/graphic-armor-404821-e8315f662390.json'

storage_client = storage.Client()
# server information
config = {
  'user': 'root',
  'password': 'Reactor3465',
  'host': '34.69.255.245',
  'client_flags': [ClientFlag.SSL],
  'ssl_ca': 'ssl/server-ca.pem',
  'ssl_cert': 'ssl/client-cert.pem',
  'ssl_key': 'ssl/client-key.pem',
}

class Cloud_Server:
  # returns all user data
  def get_user_info(self, user_ID):
    # connecting to database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE recipe_book_info')
    cursor.execute('SELECT username, userID, OAUTHTOKEN FROM User WHERE user_ID = '+str(user_ID))
    return cursor.fetchone()
  
  def get_user_info_TOKEN(self, OAUTHTOKEN):
    # connecting to database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE recipe_book_info')
    cursor.execute('SELECT username, userID, OAUTHTOKEN FROM User WHERE OAUTHTOKEN = '+str(OAUTHTOKEN))
    return cursor.fetchone()
  
  # creates new user
  def create_user(self, username, OAUTHTOKEN):
    cnx = mysql.connector.connect(**config)
    cur = cnx.cursor()
    cur.execute('USE recipe_book_info')
    cur.execute('SELECT COUNT(*) FROM User')
    count = cur.fetchone()
    cursor = cnx.cursor()
    cursor.execute('USE recipe_book_info')
    cursor.execute('INSERT INTO User (username, userID, OAUTHTOKEN) VALUES ("'+username+'", "'+str(count)+'", '+OAUTHTOKEN+')')
    cnx.commit()

  # returns all profile data
  def get_profile_info(self, user_ID):
    # connecting to database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE recipe_book_info')
    cursor.execute('SELECT userID, screenname, profilePicture, followerList, followingList, postList FROM Profile WHERE user_ID = '+str(user_ID))
    return cursor.fetchone()
  
   # creates new profile
  def create_user(self, user_ID, screenname, profilePicture):
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE recipe_book_info')
    cursor.execute('INSERT INTO Profile (userID, screenname, profilePicture, followerList, followingList, postList) VALUES ("'+user_ID+'", "'+screenname+'", '+profilePicture+', "", "", "")')
    cnx.commit()

  # Post ("postID"	TEXT, "postTitle"	TEXT, "postImage"	TEXT, "postText"	BLOB, "userID"	INTEGER, "reviewList"	BLOB)

  def get_post_infoID(self, post_ID):
    # connecting to database
    cnx = mysql.connector.connect(**config)
    cursor = cnx.cursor()
    cursor.execute('USE recipe_book_info')
    cursor.execute('SELECT postID, postTitle, user_ID, postImage, postText, userID, reviewList FROM account_information WHERE postID = '+str(post_ID))
    return cursor.fetchone()
  
  #gets 10 latest posts, add a buffer for earlier posts
  def get_ten_posts(self, buffer):
    cnx = mysql.connector.connect(**config)
    count_cursor = cnx.cursor()
    count_cursor.execute('USE scholar_data') 
    count_cursor.execute('SELECT COUNT(*) FROM questions')
    count = count_cursor.fetchone()
    count = count - buffer
    if count < 1:
      return -1
    post_list = []
    for post_ID in range(count - 10, count + 1):
      if(post_ID < 0):
        break
      cursor = cnx.cursor()
      cursor.execute('USE scholar_data') 
      cursor.execute('SELECT postID, postTitle, user_ID, postImage, postText, userID, reviewList FROM account_information WHERE postID = '+str(post_ID))
      post_list.append(cursor.fetchone())
    return post_list
