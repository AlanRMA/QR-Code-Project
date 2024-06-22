from pymongo import MongoClient
from bson import ObjectId

class MongoObject:
    def __init__(self, URI):
        self.client = MongoClient(URI)

    def create_collection(self, dbName, collectionName):
        db = self.client[dbName]
        if collectionName not in db.list_collection_names():
            db.create_collection(collectionName)
            print(f"Collection '{collectionName}' created in database '{dbName}'.")
        else:
            print(f"Collection '{collectionName}' already exists in database '{dbName}'.")

    def delete_collection(self, dbName, collectionName):
        db = self.client[dbName]
        db.drop_collection(collectionName)
        print(f"Collection '{collectionName}' deleted from database '{dbName}'.")

    def add_data(self, dbName, collectionName, data):
        db = self.client[dbName]
        db[collectionName].insert_one(data)
        print(f"Data added to collection '{collectionName}' in database '{dbName}'.")

    def remove_data(self, dbName, collectionName, query):
        db = self.client[dbName]
        deleted_count = db[collectionName].delete_many(query).deleted_count
        print(f"{deleted_count} document(s) deleted from collection '{collectionName}' in database '{dbName}'.")

    def query(self, dbName, collectionName, query):
        db = self.client[dbName]
        cursor = db[collectionName].find(query)
        results = [self.convert_objectid(doc) for doc in cursor]
        return results

    def get_all_documents(self, dbName, collectionName):
        db = self.client[dbName]
        cursor = db[collectionName].find()
        results = [self.convert_objectid(doc) for doc in cursor]
        return results

    def convert_objectid(self, doc):
        # Converte todos os ObjectIds para strings
        for key, value in doc.items():
            if isinstance(value, ObjectId):
                doc[key] = str(value)
        return doc

    def close(self):
        self.client.close()

    def __del__(self):
        self.close()