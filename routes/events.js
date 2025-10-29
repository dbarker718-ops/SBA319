import express, { json } from "express";
import events from "../data/events.js";
import db from "../db/conn.js";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    if (req.query.eventId) {
      const event = events.find((l) => l.id == req.query.eventId);
      if (event) res.json(event);
      else next({ status: 404, message: "event not found" });
    } else {
      res.json(events);
    }
  })
  .post((req, res) => {
    console.log(req.body);
    if (req.body.description && req.body.bedrooms && req.body.bathrooms) {
      const event = {
        id: events[events.length - 1].id + 1,
        description: req.body.description,
        bedrooms: req.body.bedrooms,
        bathrooms: req.body.bathrooms,
      };
      events.push(event);
      res.status(201).json(events[events.length - 1]);
    } else res.status(400).json({ error: "Insufficient Data" });
  });

router
  .route("/:id")
  .get((req, res, next) => {
    const event = events.find((l) => l.id == req.params.id);
    if (event) res.json(event);
    else next({ status: 404, message: "event not found" });
  })
  .patch((req, res, next) => {
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
  .delete((req, res, next) => {
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
