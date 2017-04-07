# script to take in a csv file and check that there are no duplicate entries

import csv


# Script to clean Cities_and_Towns_NTAD.csv

f = open('Cities_and_Towns_NTAD.csv', 'r', encoding='mac_roman')
csv_f = csv.reader(f)

cityDuplicates = {}
primKey = set()

cntr = 0
for row in csv_f:
	print(cntr)
	cntr += 1
	# Check for duplicate addresses
	c = (row[3], row[4], row[5])
	if c in cityDuplicates:
		tmp = cityDuplicates[c]
		tmp.append(row[0])
		cityDuplicates[c] = tmp
	else:
		cityDuplicates[c] = [row[0]]
	# Check for duplicate Primary Key's
	if row[0] in primKey:
		print("We have found a duplicate: " + str(row[0]))
	else:
		primKey.add(row[0])
	# Check that no cities or towns are listed with a negative population
	if cntr > 1 and int(row[4]) < 1:
		print("Negative population for city: " + str(row[3]) + " at FID: " + row[0])

# Print out the duplicate Cities and Towns
for k, v in cityDuplicates.items():
	if len(v) > 1:
		print("We have found a duplicate: " + str(k) + " at row(s) " + str(v))









