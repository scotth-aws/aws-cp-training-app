#
# This function is triggered by an API GW call
#
import json, urllib, boto3, csv
from boto3.dynamodb.conditions import Key
from decimal import Decimal
import decimal
import os
import random


class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal):
            return {"__Decimal__": str(obj)}
        # Let the base class default method raise the TypeError
        return json.JSONEncoder.default(self, obj)


TABLE_NAME = "cp-training-questions"


def process_event(event):
    try:
        dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
        table = dynamodb.Table(TABLE_NAME)
    except Exception as e:
        print("Unable to create dynamodb resource ", format(e))

    try:
        print("Event received by Lambda function: " + json.dumps(event, indent=2))

        if "queryStringParameters" in event:
            if "category" in event["queryStringParameters"]:
                category = urllib.parse.unquote_plus(
                    event["queryStringParameters"]["category"]
                )
                print("category ", category)
    except Exception as e:
        print("Unable to parse request ", format(e))

    try:
        random_number = random.randint(1, 4)
        
        dbresponse = table.query(
            KeyConditionExpression=Key('PK').eq(str(random_number)) & Key('SK').eq(str(random_number))
        )
    except Exception as e:
        print("Unable to retrieve data from DynamoDB table", format(e))
    else:
        response = {
            "isBase64Encoded": "false",
            "statusCode": 200,
             "headers": {
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Credentials': 'true',
            },
            "body": json.dumps(dbresponse["Items"], cls=DecimalEncoder),
        }
        print(response)
        return response


# This handler is executed every time the Lambda function is triggered
def lambda_handler(event, context):
    response = process_event(event)
    return response