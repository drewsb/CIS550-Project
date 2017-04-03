# script to take in a csv file and check that there are no duplicate entries

import csv

f = open('Major_Sport_Venues.csv', 'r', encoding='mac_roman')
csv_f = csv.reader(f)

stadiumAddress = set()
primKey = set()

for row in csv_f:
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

