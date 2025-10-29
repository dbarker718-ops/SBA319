import express, { json } from "express";
import events from "../data/events.js";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    const collection = await db.collection("events");
    const result = await collection.find({}).toArray();

    res.json(result);
  })
  .post(async (req, res) => {
    console.log(req.body);
    const { description, guests, tables, type } = req.body;
    //creating variables for guests tables type to store the data
    if (description && guest && tables && type) {
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
    if (event) res.json(event);
    else next({ status: 404, message: "event not found" });
  })
  .patch(async (req, res, next) => {
    const collection = await db.collection("events");
    const event = events.find((l, i) => {
      if (l.id == req.params.id) {
        for (const key in req.body) {
          events[i][key] = req.body[key];
        }
        return true;
      }
    });
    if (event) res.json(event);
    else next({ status: 404, message: "event not found" });
  })
  .delete(async (req, res, next) => {
    const collection = await db.collection("events");
    const event = events.find((l, i) => {
      if (l.id == req.params.id) {
        events.splice(i, 1);
        return true;
      }
    });

    if (event) res.json(event);
    else next({ status: 404, message: "event not found" });
  });
export default router;
