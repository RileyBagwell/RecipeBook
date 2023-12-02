import os
from google.cloud import storage
import sqlite3
from datetime import datetime
import mysql.connector
from mysql.connector import errorcode
from mysql.connector.constants import ClientFlag
import sys
import random

# Profile ("userID"	TEXT, "screenname"	TEXT, "profilePicture"	TEXT, "followerList"	BLOB, "followingList"	BLOB, "postList"	BLOB)
# User ("username"	TEXT, "userID"	TEXT, "OAUTHTOKEN"	TEXT)
# Review" ("reviewID"	TEXT, "parentID"	TEXT, "rating"	INTEGER, "ifReviewReply"	INTEGER, "userID"	INTEGER, "reviewList"	BLOB)
# Post ("postID"	TEXT, "postTitle"	TEXT, "postImage"	TEXT, "postText"	BLOB, "userID"	INTEGER, "reviewList"	BLOB)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'server\graphic-armor-404821-e8315f662390.json'

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