#script to take in local instance of data and populate AWS DynamoDB table

from __future__ import print_function # Python 2/3 compatibility
import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb', region_name='us-east-1', endpoint_url="http://localhost:8000")

table = dynamodb.Table('US_Hospitals')

with open("file-path here ********") as json_file:
    hospitals = json.load(json_file, parse_float = decimal.Decimal)
    for hospital in hospitals:
    	#******* TODO include a variable denoting the row number in the excel file, this will be our PRIMARY KEY
    	name = hospital['NAME']
    	address = hospital['ADDRESS']
    	city = hospital['CITY']
    	state = hospital['STATE']
    	zipCode = hospital['ZIP']

        print("Adding hospital:", name, address, city, state, zipCode)

        table.put_item(
           Item={
               'name': name,
               'address': address,
               'city': city,
               'state': state,
               'zipCode': zipCode
            }

