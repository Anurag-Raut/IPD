import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~~/servers/connect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        
        let {query}=req.body;
   
        const db=await connectToDatabase('OpenEstate_properties');
        if(!db){
            return   res.status(400).json({ error: 'not connected to db' });
        }
        const coll=db.collection('properties');
        console.log(query);
        const documents = await coll.find({
            ...query
          }).toArray();
        // console.log('documents',documents);
      
        res.status(200).json({ data:documents });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
