import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { VM } from "vm2";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/execute", (req, res) => {
  const { code } = req.body;

  let logs = []; // Store logs here

  const vm = new VM({
    timeout: 2000, // Prevent infinite loops
    sandbox: {
      console: {
        log: (...args) => logs.push(args.join(" ")), // Capture console.log()
        error: (...args) => logs.push("ERROR: " + args.join(" ")),
        warn: (...args) => logs.push("WARNING: " + args.join(" ")),
      },
    },
  });

  try {
    vm.run(code);
    res.json({ output: logs.join("\n") }); // Send logs as a formatted string
  } catch (error) {
    res.json({ output: "Error: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log("App is running on PORT", PORT);
});
