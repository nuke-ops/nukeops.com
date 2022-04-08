#!C:\Python39\python.exe
import requests
import time
from contextlib import redirect_stdout

print("Content-type: text/html")
print("")
print("<html lang='en'>")
print("<head>")
print("		<title>Syndi-frame</title>")
print("			<link rel='icon' href='../resources/images/nstrat.ico'>")
print("			<meta charset='utf-8'>")
print("			<meta name='description' content='Nuke Ops-ss13'>")
print("		<meta name='viewport' content='width=device-width, initial-scale=1'>")
print("		<link rel='stylesheet' href='../resources/stylesheet/style.css'>")
print("			<link href='https://fonts.googleapis.com/css?family=Roboto&display=swap' rel='stylesheet'>")
print("	<script type='text/javascript' src='https://code.jquery.com/jquery-3.6.0.min.js'></script>")
print("		<script type='text/javascript' src='/resources/javascript/WfClient.js'></script>")
print("	<style>@font-face{font-family:joystixmonospace;src:url('../resources/fonts/joystix_monospace-webfont.woff')}</style>")
print("</head>")
print("<body>")
print("	<a href='../'> <button id='neon'><i>BACK</i> </button> </a>")
print("	</br>")
print("	</br>")
print("	<a>Yea.. I fucked up, so.. I'll fix that page, one day.</a>")
print("	</br>")
print("	</br>")

print("<div>")

url = 'https://api.warframestat.us/pc/cetusCycle'
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
webpage = requests.get(url, headers=headers).content
data = str(webpage)
data = ((data[3:])[:-2]).replace('"',"").split(":")
data = str(data)
data = ((data[1:])[:-1]).replace("'","").split(",")[-1]

print('cetus: ')
print("<a>")
print("		<div id='response'>")

print(data)

print("		</div>")
print("</a>")
print("<div>")
print("</body>")
print("</html>")
	