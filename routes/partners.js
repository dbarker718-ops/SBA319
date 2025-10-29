import express, { json } from "express";
import partners from "../data/partners.js";
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    res.json(partners);
  })
  .post((req, res) => {
    console.log(req.body);
    if (req.body.username && req.body.email && req.body.password) {
      if (partners.find((u) => u.username == req.body.username)) {
        res.status(409).json({ error: "Username Already Taken" });
        return;
      }
      const partner = {
        id: partners[partners.length - 1].id + 1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      };
      partners.push(partner);
      res.status(201).json(partners[partners.length - 1]);
    } else res.status(400).json({ error: "Insufficient Data" });
  });
export default router;
