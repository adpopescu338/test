from bson.json_util import dumps
from bson import ObjectId
import json
from flask import Flask,request
app = Flask('__name__')
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("MONGO_URL"))
CORS(app)

@app.route('/viewtasks')
def viewtasks(): 
    return dumps(client.test.todos.find())

@app.route('/deletetasks')
def deletetasks():
   id = request.args.get('id')
   result = client.test.todos.delete_one({"_id": ObjectId(id)})
   print(result.deleted_count)
   if result.deleted_count:
      return '200'
   else:
      return '403'

@app.route('/addtask', methods=['GET'])
def addtask():
   name= request.args.get('name')
   client.test.todos.insert_one({"name":name, "created_at": datetime.now(), "status":'Uncompleted'})
   return '200'

@app.route('/complete', methods=['GET'])
def complete():
   id = request.args.get('id')
   client.test.todos.update_one({"_id": ObjectId(id)}, {"$set":{"status": "Completed", "completed_at": datetime.now()}})
   return '200'

@app.route('/undo-complete', methods=['GET'])
def undo_complete():
   id = request.args.get('id')
   client.test.todos.update_one({"_id": ObjectId(id)}, {"$set":{"status": "Uncompleted", "completed_at" : ""}})
   return '200'


@app.route('/edit_name', methods=['GET'])
def edit_name():
   id = request.args.get('id')
   name= request.args.get('name')
   result = client.test.todos.update_one({"_id": ObjectId(id)}, {"$set":{"name": name}})
   print('modified count',result.modified_count)
   return '200'

@app.route('/filter', methods=['GET'])
def filter():
   created_at = request.args.get('created_at')
   completed_at= request.args.get('endDate')
   status = request.args.get('status')
   filters = {}
   if(created_at):
    filters['created_at'] =  created_at
   if(completed_at):
     filters['completed_at'] = completed_at
   if(status):
      filters["status"] = status
   return dumps(client.test.todos.find(filters))



def main():
    try:
        # start web server
        app.run(port='5001')
    except:
        print('something went wrong')

if __name__ == '__main__':
    main()

