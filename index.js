// index.js
const express = require("express");
const { exec } = require("child_process");

const app = express();
const port = 3000;

app.use(express.json());

app.post("/create-prosody-user", (req, res) => {
  const { user, domain, password } = req.body;
  const command = `prosodyctl register ${user} ${domain} ${password}`;
  console.log("command", command);
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res
        .status(500)
        .json({ message: "Error executing command", error: error.message });
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res
        .status(500)
        .json({ message: "Command executed with errors", error: stderr });
    }
    console.log(`stdout: ${stdout}`);
    res
      .status(200)
      .json({ message: "Command executed successfully", output: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
