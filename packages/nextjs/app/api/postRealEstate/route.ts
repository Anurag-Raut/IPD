import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '~~/servers/connect';

export async function POST(req: NextResponse) {
    try {
        let {data}=await req.json();
   
        const db=await connectToDatabase('OpenEstate_properties');
        if(!db){
            return NextResponse.json({ error: 'not connected to db' },{status:400});
        }
        const coll=db.collection('properties');
        await coll.insertOne(data);
        console.log('done');
      
        return NextResponse.json({ messsge:'done' },{status:200});

    } catch (error) {
        console.error(error);
       return NextResponse.json({ error: 'Internal Server Error' },{status:500});
    }
}
