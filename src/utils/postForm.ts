import axios from "axios";

export async function postForm(username: string, password: string) {
  await axios.post(
    "http://localhost:8000/users",
    JSON.stringify({
      username,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function postFormWithError(username: string, password: string) {
  await new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Brukernavn allerede i bruk")), 2000)
  );
}

export async function fetchUsers(): Promise<User[]> {
  const response = await axios.get("http://localhost:8000/users");
  if (response.status !== 200) {
    throw new Error("Failed to fetch users");
  }
  return response.data;
}

export interface User {
  id: string;
  username: string;
  password: string;
}
export async function fetchFirstUser(): Promise<User> {
  const response = await fetchUsers();
  return response[0];
}

export const queryKeyUsers = ["users"];
