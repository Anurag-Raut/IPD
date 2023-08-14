import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '~~/servers/connect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log(req.body);
        let {data}=req.body;
   
        const db=await connectToDatabase('OpenEstate');
        if(!db){
            return   res.status(400).json({ error: 'not connected to db' });
        }
        const coll=db.collection('properties');
        const query = { tokenId: data.tokenId };
        const update = { $set: data };

      
        const result = await coll.updateOne(query, update);
        console.log('done');
      
        res.status(200).json({ messsge:'done' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
