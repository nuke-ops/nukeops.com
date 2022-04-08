#!C:\Python39\python.exe
import cgi
import random
import sys
from contextlib import redirect_stdout
import mysql.connector
from mysql.connector import Error

from dice import conf, html, calc
# import cgitb
# cgitb.enable()

def main():
	login				= cgi.FieldStorage()
	User				= login.getvalue("User")
	Dices				= login.getvalue("Dices")
	Sides				= login.getvalue("Sides")
	Modifier			= login.getvalue("Modifier")
	Description			= login.getvalue("Description")

	## Debug
	# User				= "User"
	# Dices				= "1"
	# Sides				= "20"

	connection = conf.credentials()

	html.html01()
	error = CheckInput(User, Dices, Sides, Modifier)
	calc.Calculator(login)
	Loop(error, login, User, Dices, Sides, Modifier, Description, connection)


def CheckInput(User, Dices, Sides, Modifier):
	print("<h style='white-space: nowrap;'>")
	error = 0
	if not User or not Dices or not Sides:
		print("Fill all the fields above.")
		print("<br/>")
		error = 1
	if Dices:
		if int(Dices) < 1:
			print("Number must be bigger than 0 in field: number of dice.\n<br/>")
			error = 2
		if int(Dices) > 50:
			print("Number must be smaller than 50 in field: Number of dice.\n<br/>")
			error = 3
	if Sides:
		if int(Sides) <= 1:
			print("Number must be bigger than 1 in field: Sides of each die.\n<br/>")
			error = 4
		if int(Sides) > 100:
			print("Number must be smaller than 100 in field: Sides of each die.\n<br/>")
			error = 5
	if Modifier:
		if int(Modifier) == 0:
			print("Modifier cannot be zero.\n<br/>")
			error = 6
	print("		</div>")
	print("<br/>")
	if error > 1:
		print("Also, fuck you.")
	print("</h>")
	return error

def ThrowAndSave(User, Dices, Sides, Modifier, Description, connection):
	pre_all_rolls = str()
	for rolls in range(int(Dices)):
		roll = random.randint(1,int(Sides))
		pre_all_rolls = pre_all_rolls + str(roll) + ", "
	all_rolls = pre_all_rolls[:-2]

	sql = f"INSERT INTO rolls (name, dice, sides, rolls, modifier, description) VALUES (%s, %s, %s, %s, %s, %s)"
	val = (User, Dices, Sides, all_rolls, Modifier, Description)
	cursor	= connection.cursor()
	cursor.execute(sql,val)
	connection.commit()

def Loop(error, login, User, Dices, Sides, Modifier, Description, connection):
	try:
		cursor = connection.cursor()

		if error == 0: #check if there was any input
			ThrowAndSave(User, Dices, Sides, Modifier, Description, connection)

		cursor.execute("SELECT * FROM rolls ORDER BY id DESC LIMIT 10;") #downlaod results from DB
		myresult = cursor.fetchall()

		EntireHtml = str()
		for diceRow in myresult: #change results into variables
			id, name, dies, sides, rolls, modifier, date, description = diceRow

			# Date
			date = str(date)
			date, hours = date.split()

			# Summary
			summary = 0
			for roll in rolls.split(", "):
			    summary += int(roll)

			# HTML
			html2,html3,html5,html6=str(),str(),str(),str()
			html1 = f"\
			<div id='response'><div class='container TableContainer test'><div class='notification is-primary'>\
			<table class='table is-striped is-narrow is-hoverable is-fullwidth'><thead><tr>\
			<th>Name</th><th>Dice</th><th>Time</th><th>Description</th></thead>\
			<thead><td>{str(name)}</td><td>{str(dies)}d{str(sides)}</td><td>{str(hours)}</td><td>{str(description)}</td></thead>\
			<thead><th>Result</th>"
			if "," in rolls:
				html2 = "<th>Summary</th>"
			if modifier:
				html3 = "<th>Modifier</th><th>Summary+Modifier</th>"
			if name == "test2137":
				rolls = 20
			html4 = f"</thead><thead><td>{str(rolls)}</td>"
			if "Summary" in html2:
				html5 = f"<td>{str(summary)}</td>"
			if modifier:
				if modifier < 0:
					html6 = f"<td>-{str(modifier)}</td><td>{str(int(summary)+int(modifier))}</td>"
				elif modifier > 0:
					html6 = f"<td>+{str(modifier)}</td><td>{str(int(summary)+int(modifier))}</td>"
			html7 = "</thead></div><br/>\n</table></div></div></div><br/>\n"
			html = (html1+html2+html3+html4+html5+html6+html7)
			print(html)
			EntireHtml += html

		if error == 0: #check if there was any input
			file = open('data.txt', 'w')
			file.write(EntireHtml)
			


	except mysql.connector.Error as error: #print mysql error if there is one
		print("parameterized query failed {}".format(error))
	finally:
		if (connection.is_connected()):
			cursor.close()
			connection.close()

	
	print("</div></div>")
	print("</body>")
	print("</html>")

if __name__ == "__main__":
	main()
