import express from "express";
import partnerRouter from "./routes/partners.js";
import paymentRouter from "./routes/payments.js";
import eventRouter from "./routes/events.js";

const app = express();

app.set('view engine', 'ejs'); 
app.use(express.static("public"))
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next)=> {
  console.log("made request for", req.method, " ", req.url)
  next()
})
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api/partners", partnerRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/events", eventRouter);

app.use((req, res, next)=> {
 res.status(404).json({
  error: "Resource not found"
 })
})

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(4000, () => console.log("alive on http://localhost:4000/api"));
