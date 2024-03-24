import clientPromise from "../../lib/mongodb";

//pages/api/comments.js
/**
* @swagger
* /api/comments:
*   get:
*      description: Returns comments
*      responses:
*       200:
*           description: Display Comments
*/

export default async function handler(req, res) {
const client = await clientPromise;
const db = client.db("sample_mflix");
const movies = await db.collection("comments").find({}).limit(10).toArray();
res.json({ status: 200, data: movies });
}