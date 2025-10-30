import express, { json } from "express";
import events from "../data/events.js";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const collection = await db.collection("events"); //same for partners and payments ex: "partners, payments"
    const result = await collection.find({}).toArray();

    res.json(result);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const { description, guests, tables, type } = req.body; // replace with username email password (partners) (make unique for payments)
    //creating variables for guests tables type to store the data
    if (description && guests && tables && type) {
      //checking if values are valid
      const collection = await db.collection("events");
      let result = await collection.insertOne({
        description,
        guests,
        tables,
        type,
      });
      res.status(201).json(result);
    } else res.status(400).json({ error: "Insufficient Data" });
  });
router.get("/seed", async (req, res) => {
  const collection = await db.collection("events");
  let resultDelete = await collection.deleteMany({});
  let resultInsert = await collection.insertMany(events);
  res.send("Data base was reset");
});
router
  .route("/:id")
  .get(async (req, res, next) => {
    const collection = await db.collection("events");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    if (result) res.json(result);
    else next({ status: 404, message: "event not found" });
  })
  .patch(async (req, res, next) => {
  let collection = await db.collection("events");
  const { guests, tables, type } = req.body;
  const newBody ={}
  //to update and validate guests
  if (guests){
    newBody.guests = guests 
  }
  if (tables){
    newBody.tables = tables 
  }
  if (type){
    newBody.type = type 
  }
  console.log(newBody)
  let query = { _id: new ObjectId(req.params.id) };

  let result = await collection.updateOne(query, {$set: newBody});

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
  })
  .delete(async (req, res, next) => {
    let collection = await db.collection("events");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.deleteOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });
export default router;
