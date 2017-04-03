# script to take in a csv file and check that there are no duplicate entries

import csv

# Script to clean Major_Sports_Venues.csv

# f = open('Major_Sport_Venues.csv', 'r', encoding='mac_roman')
# csv_f = csv.reader(f)

# stadiumAddress = set()
# primKey = set()

# for row in csv_f:
#     # Check for duplicate addresses
#     s = (row[2], row[3], row[5], row[6])
#     if s in stadiumAddress:
#         print("We have found a duplicate: " + str(s))
#     else:
#         stadiumAddress.add(s)
#     # Check for duplicate Primary Key's
#     if row[0] in primKey:
#         print("We have found a duplicate: " + str(row[0]))
#     else:
#         primKey.add(row[0])





# Script to clean Cities_and_Towns_NTAD.csv

f = open('Cities_and_Towns_NTAD.csv', 'r', encoding='mac_roman')
csv_f = csv.reader(f)

cityDuplicates = {}
primKey = set()

# cntr = 0
for row in csv_f:
    # print(cntr)
    # cntr += 1
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
# Print out the duplicate Cities and Towns
for k, v in cityDuplicates.items():
    if len(v) > 1:
        print("We have found a duplicate: " + str(k) + " at row(s) " + str(v))









