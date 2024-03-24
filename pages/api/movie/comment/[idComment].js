import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb"


/**
* @swagger
* /api/movie/comment/{idComment}:
*   get:
*     summary: Get a comment by id
*     parameters:
*       - in: path
*         name: idComment
*         required: true
*         schema:
*           type: string
*         description: Type the comment id to return
*     responses:
*       200:
*         description: Comment retrieved successfully
*       400:
*         description: Fail to return the comment - ID doesn't exist or not valid
*   post:
*     summary: Create a new comment
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               movieId:
*                 type: string
*                 description: The ID of the movie
*               author:
*                 type: string
*                 description: The author of the comment
*               content:
*                 type: string
*                 description: The content of the comment
*     responses:
*       201:
*         description: Comment created successfully
*       400:
*         description: Failed to create the comment - check provided data
*   put:
*     summary: Update an existing comment by id
*     parameters:
*       - in: path
*         name: idComment
*         required: true
*         schema:
*           type: string
*         description: The comment ID to update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               movieId:
*                 type: string
*                 description: The ID of the movie
*               author:
*                 type: string
*                 description: The author of the comment
*               content:
*                 type: string
*                 description: The content of the comment
*     responses:
*       200:
*         description: Comment updated successfully
*       400:
*         description: Failed to update the comment - ID doesn't exist or not valid
*   delete:
*     summary: Delete a comment by id
*     parameters:
*       - in: path
*         name: idComment
*         required: true
*         schema:
*           type: string
*         description: The comment ID to delete
*     responses:
*       200:
*         description: Comment deleted successfully
*       400:
*         description: Failed to delete the comment - ID doesn't exist or not valid
*/

export default async function handler(req, res) {
    const { idComment } = req.query;

    switch (req.method) {
        case "GET":

            const client = await clientPromise;
            const db = client.db("sample_mflix");
            const dbComment = await db.collection("comments").findOne({ _id: new ObjectId(idComment) });
            res.json({ status: 200, data: { Comment: dbComment } });
            break;

        case "POST":
          
            try {
                const clientPost = await clientPromise;
                const dbPost = clientPost.db("sample_mflix");

                const newComment = req.body;
                const resultPost = await dbPost.collection("comments").insertOne(newComment);

                res.json({ status: 201, data: { Comment: resultPost.ops[0] } });
            } catch (error) {
                console.error("Error adding a new Comment:", error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;

        case "PUT":
           
            try {
                const clientPut = await clientPromise;
                const dbPut = clientPut.db("sample_mflix");

                const updatedComment = req.body;
                const resultPut = await dbPut.collection("comments").updateOne(
                    { _id: new ObjectId(idComment) },
                    { $set: updatedComment }
                );

                if (resultPut.matchedCount > 0) {
                    res.json({ status: 200, message: "Comment updated successfully" });
                } else {
                    res.status(404).json({ status: 404, message: "Comment not found" });
                }
            } catch (error) {
                console.error("Error updating Comment:", error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;

        case "DELETE":

            try {
                const clientDelete = await clientPromise;
                const dbDelete = clientDelete.db("sample_mflix");

                const resultDelete = await dbDelete.collection("comments").deleteOne({ _id: new ObjectId(idComment) });

                if (resultDelete.deletedCount > 0) {
                    res.json({ status: 200, message: "Comment deleted successfully" });
                } else {
                    res.status(404).json({ status: 404, message: "Comment not found" });
                }
            } catch (error) {
                console.error("Error deleting Comment:", error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;

        default:
            res.status(405).json({ status: 405, message: "Method Not Allowed" });
            break;
    }
}