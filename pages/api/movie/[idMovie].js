import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

/**
 * @swagger
 * /api/movie/{movieId}:
 *   get:
 *     summary: Get a movie by ID
 *     parameters:
 *     - in: path
 *       name: movieId
 *       required: true
 *       schema:
 *         type: string
 *       description: Numeric ID of the movie to get
 *     responses:
 *       200:
 *         description: Succeded request.
 *       400:
 *         description: The movie dosen't exist or is not valid.
 *   post:
 *      summary: Insert a new movie
 *      parameters:
 *      - in: path
 *        name: movieId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future inserted movie
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *      responses:
 *        200:
 *         description: Succeded request.
 *        400:
 *         description: The movie dosen't exist or is not valid.
 *   put:
 *      summary: Replace data on an existing movie.
 *      parameters:
 *      - in: path
 *        name: movieId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future replaced movie
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *      responses:
 *         200:
 *          description: Succeded request.
 *         400:
 *          description: The movie dosen't exist or is not valid.
 *   delete:
 *      summary: Delete an existing movie.
 *      parameters:
 *      - in: path
 *        name: movieId
 *        required: true
 *        schema:
 *          type: string
 *        description: Numeric ID of the future deleted movie
 *      responses:
 *         200:
 *          description: Succeded request.
 *         400:
 *          description: The movie dosen't exist or is not valid.
 */

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    let result;

    // Extrait l'ID du film de l'URL pour GET, PUT, DELETE, ou du corps de la requête pour POST
    const id = req.method === 'POST' ? req.body._id : req.query.idMovie;

    switch (req.method) {
        case "GET":
            // Récupère un film par son ID
            const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });
            if (!movie) {
                return res.status(404).json({ message: "Movie not found" });
            }
            return res.status(200).json(movie);

        case "POST":
            // Crée un nouveau film, en s'attendant à recevoir l'_id dans le corps de la requête
            try {
                result = await db.collection("movies").insertOne({ ...req.body, _id: new ObjectId(id) });
                return res.status(201).json({ message: "Movie added successfully", data: result.ops[0] });
            } catch (error) {
                console.error("Error adding a new movie:", error);
                return res.status(500).json({ message: "Server error", error });
            }

        case "PUT":
            // Met à jour un film existant par son ID
            try {
                result = await db.collection("movies").updateOne({ _id: new ObjectId(id) }, { $set: req.body });
                if (result.matchedCount === 0) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json({ message: "Movie updated successfully" });
            } catch (error) {
                console.error("Error updating movie:", error);
                return res.status(500).json({ message: "Server error", error });
            }

        case "DELETE":
            // Supprime un film par son ID
            try {
                result = await db.collection("movies").deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 0) {
                    return res.status(404).json({ message: "Movie not found" });
                }
                return res.status(200).json({ message: "Movie deleted successfully" });
            } catch (error) {
                console.error("Error deleting movie:", error);
                return res.status(500).json({ message: "Server error", error });
            }

        default:
            // Répond avec une erreur si la méthode HTTP n'est pas prise en charge
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            return res.status(405).json({ message: "Method Not Allowed" });
    }
}