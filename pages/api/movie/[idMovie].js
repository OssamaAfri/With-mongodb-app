import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

/**
* @swagger
* paths:
*   /api/movie/{idMovie}:
*     get:
*       summary: Get a movie by id
*       parameters:
*         - in: path
*           name: idMovie
*           required: true
*           schema:
*             type: string
*           description: Type the movie id to return
*       responses:
*         200:
*           description: Movie retrieved successfully
*         400:
*           description: Fail to return the movie - ID doesn't exist or not valid
* 
*     post:
*       summary: Create a new movie entry
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 title:
*                   type: string
*                   description: The title of the movie
*                 director:
*                   type: string
*                   description: The director of the movie
*                 releaseYear:
*                   type: string
*                   description: The release year of the movie
*       responses:
*         201:
*           description: Movie created successfully
*         400:
*           description: Failed to create the movie - check provided data
* 
*     put:
*       summary: Update an existing movie by id
*       parameters:
*         - in: path
*           name: idMovie
*           required: true
*           schema:
*             type: string
*           description: The movie ID to update
*       requestBody:
*         required: true
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 title:
*                   type: string
*                   description: The title of the movie
*                 director:
*                   type: string
*                   description: The director of the movie
*                 releaseYear:
*                   type: string
*                   description: The release year of the movie
*       responses:
*         200:
*           description: Movie updated successfully
*         400:
*           description: Failed to update the movie - ID doesn't exist or not valid
* 
*     delete:
*       summary: Delete a movie by id
*       parameters:
*         - in: path
*           name: idMovie
*           required: true
*           schema:
*             type: string
*           description: The movie ID to delete
*       responses:
*         200:
*           description: Movie deleted successfully
*         400:
*           description: Failed to delete the movie - ID doesn't exist or not valid
*/

export default async function handler(req, res) {
    const { idMovie } = req.query;

    switch (req.method) {
        case "GET":
            // GET /movie/:idMovie - Retrieve a movie by ID
            const client = await clientPromise;
            const db = client.db("sample_mflix");
            const dbMovie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
            res.json({ status: 200, data: { movie: dbMovie } });
            break;

        case "POST":
            // POST /movie/:idMovie - Add a new movie (you can add movie details in the request body)
            try {
                const clientPost = await clientPromise;
                const dbPost = clientPost.db("sample_mflix");

                // Placeholder: Replace the following line with your logic to add a new movie
                const newMovie = req.body; // Assuming request body contains movie details
                const resultPost = await dbPost.collection("movies").insertOne(newMovie);

                res.json({ status: 201, data: { movie: resultPost.ops[0] } });
            } catch (error) {
                console.error("Error adding a new movie:", error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;

        case "PUT":
            // PUT /movie/:idMovie - Update a movie by ID (you can update movie details in the request body)
            try {
                const clientPut = await clientPromise;
                const dbPut = clientPut.db("sample_mflix");

                // Placeholder: Replace the following line with your logic to update a movie
                const updatedMovie = req.body; // Assuming request body contains updated movie details
                const resultPut = await dbPut.collection("movies").updateOne(
                    { _id: new ObjectId(idMovie) },
                    { $set: updatedMovie }
                );

                if (resultPut.matchedCount > 0) {
                    res.json({ status: 200, message: "Movie updated successfully" });
                } else {
                    res.status(404).json({ status: 404, message: "Movie not found" });
                }
            } catch (error) {
                console.error("Error updating movie:", error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;

        case "DELETE":
            // DELETE /movie/:idMovie - Delete a movie by ID
            try {
                const clientDelete = await clientPromise;
                const dbDelete = clientDelete.db("sample_mflix");

                // Placeholder: Replace the following line with your logic to delete a movie
                const resultDelete = await dbDelete.collection("movies").deleteOne({ _id: new ObjectId(idMovie) });

                if (resultDelete.deletedCount > 0) {
                    res.json({ status: 200, message: "Movie deleted successfully" });
                } else {
                    res.status(404).json({ status: 404, message: "Movie not found" });
                }
            } catch (error) {
                console.error("Error deleting movie:", error);
                res.status(500).json({ status: 500, message: "Internal Server Error" });
            }
            break;

        default:
            res.status(405).json({ status: 405, message: "Method Not Allowed" });
            break;
    }
}