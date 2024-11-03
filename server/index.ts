import express from "express";
import cors from "cors";

const app = express();
const PORT = 8000;

const serverDelay = 500;

app.use(cors());
app.use(express.json());

interface User {
  username: string;
  password: string;
  id: string;
}

const users: User[] = [
  { id: "1", username: "Formeriko", password: "123456" },
  { id: "2", username: "UfoSorm", password: "654321" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/faulty-users", (req, res) => {
  res.status(500).json({ message: "Brukerdata ikke tilgjengelig" });
});

type PostError = "UNKNOWN" | "TOO_SHORT_PASSWORD" | "MAX_REQUESTS_REACHED";
app.post("/faulty-users", (req, res) => {
  const requestedError = req.body?.requestedError as PostError;
  console.log("req", requestedError);

  // If no error, add user
  if (!requestedError) {
    const newUser = req.body;
    if (!newUser.username) {
      return res.status(400).json({ error: "Username required" });
    }

    if (!newUser.password) {
      return res.status(400).json({ error: "Password required" });
    }

    const checkedUser = {
      username: newUser.username,
      password: newUser.password,
      id: (users.length + 1).toString(),
    };

    users.push(checkedUser);

    setTimeout(() => {
      res.json(users);
    }, serverDelay);

    return;
  }

  // If requested error, set certain error

  let status = 500;
  let errorReason = "UNKNOWN";

  if (requestedError === "TOO_SHORT_PASSWORD") {
    status = 200;
    errorReason = "TOO_SHORT_PASSWORD";
  }
  if (requestedError === "MAX_REQUESTS_REACHED") {
    status = 200;
    errorReason = "MAX_REQUESTS_REACHED";
  }

  res.status(status).json({ isSuccess: false, errorReason: errorReason });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.username) {
    return res.status(400).json({ error: "Username required" });
  }

  if (!newUser.password) {
    return res.status(400).json({ error: "Password required" });
  }

  const checkedUser = {
    username: newUser.username,
    password: newUser.password,
    id: (users.length + 1).toString(),
  };

  users.push(checkedUser);

  setTimeout(() => {
    res.json(users);
  }, serverDelay);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
