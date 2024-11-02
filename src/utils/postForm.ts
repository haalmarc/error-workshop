export async function postForm(username: string, password: string) {
  const response = await fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  await response.json();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function postFormWithError(username: string, password: string) {
  await new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Brukernavn allerede i bruk")), 2000)
  );
}

export async function fetchUsers(): Promise<User[]> {
  const response = await fetch("http://localhost:8000/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
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
