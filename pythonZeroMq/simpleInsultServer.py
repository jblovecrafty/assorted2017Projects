#!/usr/bin/python
import zmq
import fileinput
import math
import json
from random import randint

###################################################################
# insult generator
###################################################################

#defaults
#
nameOfVictim = "Tim"
severityOfInsult = 1
typeOfInsult = 2
fileLocation = "insultList.txt"
showInsult = True

#open file with JSON
#
fileHandle = open(fileLocation, "r")

#read in JSON to data structure
#
jsonDataStructure = json.load(fileHandle)

#close file
#	
fileHandle.close()

# ZeroMQ Context
#
context = zmq.Context()

# Define the socket using the "Context"
#
sock = context.socket(zmq.REP)
sock.bind("tcp://127.0.0.1:5679")

# Run a simple "Insult" server
#
while True:	
	#victim, severity, type
	#
	message = sock.recv()
	message = message.split(",")
	
	severityOfInsult = int(message[1]);

	if((severityOfInsult < 0) or (severityOfInsult > 1)):
		severityOfInsult = 0
	
	if(len(message) > 3):
		typeOfInsultText = message[2].lower() + " " + message[3].lower()
	else:
		typeOfInsultText = message[2].lower() 
		
	print typeOfInsultText
	
	if(typeOfInsultText == 'your momma'):
		typeOfInsult = 0
	elif(typeOfInsultText == 'sarcasm'):
		typeOfInsult = 1
	elif(typeOfInsultText == 'literary'):
		typeOfInsult = 2
	elif(typeOfInsultText == 'non sequiter'):
		typeOfInsult = 3
	elif(typeOfInsultText == 'science'):
		typeOfInsult = 4
	elif(typeOfInsultText == 'obscure nerdery'):
		typeOfInsult = 5
	else:
		typeOfInsult = 0			
	
	
	#randomly pick insult
	#
	print len(jsonDataStructure["insults"][severityOfInsult]["listOfInsults"][typeOfInsult]["insultList"])
	maxRandToUse = (len(jsonDataStructure["insults"][severityOfInsult]["listOfInsults"][typeOfInsult]["insultList"])-1)
	randomInsult = randint(0, maxRandToUse)
	
	insultType = jsonDataStructure["insults"][severityOfInsult]["listOfInsults"][typeOfInsult]["typeOfInsult"]
	
	print "Insult Type: " + insultType
	insultText = jsonDataStructure["insults"][severityOfInsult]["listOfInsults"][typeOfInsult]["insultList"][randomInsult] % (message[0])
	
	sock.send_string("Insult From Server: " + insultText)
	print "Insult From Server: " + insultText