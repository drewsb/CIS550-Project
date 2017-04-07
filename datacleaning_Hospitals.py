# Script to take in a xls file and clean the data

import xlrd

# Script to clean Hospitals.xls

workbook = xlrd.open_workbook('Hospitals.xls') #or try encoding=cp1252
worksheet = workbook.sheet_by_index(0)

# Check that there are no duplicate hospital names in the data
hospitalName = set()
for row in worksheet.col(1):
	if row in hospitalName:
		print("Duplicate Hostpial Name: " + row)
	else:
		hospitalName.add(row)

print("done checking duplicate hostpial names")

# Check that all primary keys in the data (FID) are indeed unique
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

# Check that all zip codes are valid (i.e. not negative values in the data)
cntr = 0
for row in worksheet.col(5):
	cntr += 1
	if cntr > 1 and int(row.value) < 1:
		print("Zipcode is a negative value: " + str(row))

print("done checking that all zip codes are not negative values")








