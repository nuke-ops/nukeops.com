def html01():
	print("Content-type: text/html")
	print("")
	print("<html lang='en'>")
	print("\
<head>\
	<meta charset='utf-8'>\
		<meta name='yes' content='Dice of gods'>\
		<meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'>\
		<meta name='viewport' content='width=device-width, initial-scale=1'>\
	<title>Dice of gods</title>\
<link rel='icon' href='/resources/images/nstrat.ico'>\
		<link rel='stylesheet' href='/resources/stylesheet/dice.css'>\
		<link rel='stylesheet' href='/resources/stylesheet/bulma.css'>\
	<script type='text/javascript' src='https://code.jquery.com/jquery-3.6.0.min.js'></script>\
		<script type='text/javascript' src='/resources/javascript/DiceClient.js'></script>\
		<link href='https://fonts.googleapis.com/css?family=Roboto&display=swap' rel='stylesheet'>\
</head>\
<body>\
<form method='post'>\
<div id=body class='BodyContainer'>\
	<div class='field has-addons'>\
	<div class='control'>\
		<input type='hidden' value='<?php echo $rand; ?>' name='randcheck' />\
					<input type='username'	name='User'			autocomplete='on'		class='input input is-small is-info'	placeholder='Name'>\
					<input type='number'	name='Dices'		value='1'				class='input is-small is-primary'		placeholder='Amount of dice'>\
					<input type='number'	name='Modifier'								class='input is-small is-info'			placeholder='Modifier'>\
			</div>\
				<div class='control'>\
					<input type='desc'		name='Description'							class='input input is-small is-info'	placeholder='Description'>\
					<input type='number'	name='Sides'		value='20'				class='input is-small is-primary'		placeholder='Sides of each die'>\
					<input type='text' 		name='placeholder'	 						class='input is-small is-info'			placeholder=' ' disabled>\
				</div>\
			<a href='stats/'>\
			<button class='button is-info' style='height:30px;'>Stats</button>\
			</a>\
			</div>\
		<div class='container is-fluid'>\
<div class='UnderFormContainer'>\
		<div class='notification is-primary UnderForm UnderFormForm'>\
		<INPUT type='submit'			value='Submit'	class='button is-info'		 		id=hidden-button></form>\
		")

if __name__ == "__main__":
	main()
