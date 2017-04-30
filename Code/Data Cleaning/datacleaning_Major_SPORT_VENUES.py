# Script to take in a csv file and clean the data

import csv

#Script to clean Major_Sports_Venues.csv

f = open('Major_Sport_Venues.csv', 'r', encoding='mac_roman')
csv_f = csv.reader(f)

stadiumAddress = set()
primKey = set()

cntr = 0
for row in csv_f:
	print(cntr)
	cntr += 1
	# Check for duplicate addresses
	s = (row[2], row[3], row[5], row[6])
	if s in stadiumAddress:
		print("We have found a duplicate: " + str(s))
	else:
		stadiumAddress.add(s)
	# Check for duplicate Primary Key's
	if row[0] in primKey:
		print("We have found a duplicate: " + str(row[0]))
	else:
		primKey.add(row[0])

print("done")