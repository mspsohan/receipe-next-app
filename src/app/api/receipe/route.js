import Server from 'next/server';
import { MongoClient } from "mongodb";


export async function GET(request) {

   const uri = process.env.MONGO_URI;
   const client = new MongoClient(uri);

   await client.connect();

   const database = client.db('receipeDB');
   const receipeCollection = database.collection('receipe');

   const data = await receipeCollection.find().toArray();
   console.log(data)

   // res.status(200).json(data);
   return Server.NextResponse.json(data);

}

export async function POST(request) {

   const uri = process.env.MONGO_URI;
   const client = new MongoClient(uri);

   await client.connect();

   const database = client.db('receipeDB');
   const receipeCollection = database.collection('receipe');
   const receipeData = request.body

   const data = await receipeCollection.insertOne(receipeData).toArray();
   console.log(data)

   // res.status(200).json(data);
   return Server.NextResponse.json(data);

}
