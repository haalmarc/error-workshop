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
