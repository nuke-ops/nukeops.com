import mysql.connector
def credentials():
	connection = mysql.connector.connect(
	  host="host",
	  user="user",
	  password="password",
	  database="database"               )
	return connection
