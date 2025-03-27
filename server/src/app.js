import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import VM from "vm2";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/execute", async (req, res) => {
  const { code } = req.body;
  let output = []; // Store console.log outputs

  // Create a secure sandbox with custom console.log
  const vm = new VM({
    timeout: 1000, // Prevent infinite loops
    sandbox: {
      output,
      console: {
        log: (...args) => {
          args.forEach((arg) => {
            if (Array.isArray(arg)) {
              // Convert arrays to JSON string format
              output.push(JSON.stringify(arg));
            } else if (typeof arg === "object" && arg !== null) {
              // Keep objects as normal JSON objects
              output.push(arg);
            } else {
              // Convert everything else to a string
              output.push(String(arg));
            }
          });
        },
      },
    },
  });

  try {
    const result = vm.run(code); // Run user code safely
    //if (result !== undefined) output.push(String(result)); // Include result if not undefined
    res.json({ success: true, output });
    console.log(output);
  } catch (error) {
    res.json({ success: false, output: [`Error: ${error.message}`] });
  }
});

app.listen(PORT, () => {
  console.log("App is running on PORT", PORT);
});
