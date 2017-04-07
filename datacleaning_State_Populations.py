# Script to take in a xls file and clean the data

import xlrd

# Script to clean State_Populations.xls

workbook = xlrd.open_workbook('State_Populations.xls') #or try encoding=cp1252
worksheet = workbook.sheet_by_index(0)

# Check that all primary keys in the data (State) are indeed unique
primaryKey = set()
for row in worksheet.col(0):
	if row in primaryKey:
		print("Duplicate primary key: " + row)
	else:
		primaryKey.add(row)

print("done checking primary keys")

# Check that no data cells are left empty
for i in range(worksheet.nrows):
	for j in range(worksheet.ncols):
		# print(str(i) + " : " + str(j))
		# print("(" + str(i) + ", " + str(j) + ")" + str(worksheet.cell(i, j).value))
		if worksheet.cell(i, j).value == " ":
			print("We have found an empty cell at location: (" + str(i) + ", " + str(j) + ")")

print("done checking that no data cells are left empty")

# Check that all population values are valid (i.e. not negative values in the data)
for i in range(1, worksheet.nrows):
	for j in range(1, worksheet.ncols):
		# print(str(i) + " : " + str(j))
		# print("(" + str(i) + ", " + str(j) + ")" + str(worksheet.cell(i, j).value))
		if int(worksheet.cell(i, j).value) < 1:
			print("Invalid population  at location: (" + str(i) + ", " + str(j) + ")")

print("done checking validity of population data entries")


