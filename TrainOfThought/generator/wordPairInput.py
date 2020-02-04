
import json

# main

fileName = "wordPairs.json"

print("Reading in file")
file = open(fileName, mode='r')

root = json.load( file )
file.close()

wordPairs = root["word pairs"]

while(True):
	inputString = input("Enter a word pair: ")
	stringList = inputString.split(" ")

	if (len(stringList) != 2):
		break

	first = stringList[0]
	second = stringList[1]

	if first in wordPairs:
		list = wordPairs[first]
	else:
		list = []
		wordPairs[first] = list

	if not second in list:
		list.append(second)
	else:
		print("%s has already been entered" % inputString)

print("Writing data to file")
file = open(fileName, mode="w")
json.dump(root, file, indent="	")

file.close()