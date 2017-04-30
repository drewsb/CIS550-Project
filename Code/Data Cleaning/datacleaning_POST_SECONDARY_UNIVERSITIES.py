# Script to take in a xls file and clean the data

import xlrd

# Script to clean POST_SECONDARY_UNIVERSITIES.xls

workbook = xlrd.open_workbook('POST_SECONDARY_UNIVERSITIES.xls') #or try encoding=cp1252
worksheet = workbook.sheet_by_index(0)

# Check that there are no duplicate university names in the data
universityName = set()
for row in worksheet.col(1):
	if row in universityName:
		print("Duplicate University Name: " + row)
	else:
		universityName.add(row)

print("done checking duplicate university names")

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












