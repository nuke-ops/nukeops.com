import re
from simpleeval import simple_eval
def Calculator(login):
	print("		<div class='TableContainer'>")
	Nyaa1		= login.getvalue("Nyaa","")
	Nyaa2		= Nyaa1[:1]
	regex1		= r"[^0-9\+\-\*\/\\\ \.\(\)\^]"
	regex2		= r"[^0-9\(]"
	matches1 	= re.search(regex1, Nyaa1)
	matches2 	= re.search(regex2, Nyaa2)
	print("		<form method='post'>")
	print("			<div class='container notification is-primary UnderForm UnderFormCalc' style='top:-130px;width:40%;'")
	print("			<div class='notification is-primary UnderForm UnderFormCalc'>")
	print("			<input name='Nyaa'		class='input is-small is-primary'					placeholder=")
	if not Nyaa1:
		print("'Fill me uwu'")
	else:
		if matches1 == None and matches2 == None:
			Nyaa = Nyaa1.replace("^","**")
			passed_regex = simple_eval(Nyaa)
			Nyaa = Nyaa.replace("**","^")
			Nyaa = Nyaa + "=" + str(passed_regex)
			print(Nyaa)
		else:
			print("error")
	print("'>")
	print("<input type='submit'		class='button is-info is-small'	value='Calculate'	id=hidden-button>")
	print("			</div>")
	print("			</div>")
	print("		</div>")
	print("		</form>")
