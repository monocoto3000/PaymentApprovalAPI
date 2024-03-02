import express from "express";
import { Signale } from "signale";

const app = express();
app.disable("x-powered-by");

const signale = new Signale();

app.use(express.json());

app.listen(3001, () => {
  signale.success("Server online in port 3001");
});

