import { useState } from "react";
import { fetchUsersWithError, queryKeyUsers, User } from "../utils/postForm";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary01";

/*
  👉 Oppgave: Trigg Error Boundary fra feilen du får fra useQuery sin error.

  💡 Refleksjonsspørsmål:
  - Hvorfor kan du ønske å vise feil via ErrorBoundary istedenfor Error-objektet?

  📖 Lesestoff:
  - https://tkdodo.eu/blog/react-query-error-handling
*/

export function Oppgave03() {
  return (
    <ErrorBoundary>
      <Form />
    </ErrorBoundary>
  );
}

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: queryKeyUsers,
    queryFn: fetchUsersWithError,
    staleTime: 0,
  });

  if (isLoading) {
    return <p>Laster ...</p>;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Oppgave 3 - useQuery Error vs Error Boundary</h1>
      <form onSubmit={onSubmit} className="form">
        <div>
          <label>
            Brukernavn
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Passord
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button className="submitButton" type="submit">
          Opprett bruker
        </button>
      </form>

      <h2>Eksisterende brukere</h2>
      {error && <p>{error.message}</p>}
      <ul>
        {/* 👇 Siden forrige oppgave, sjekkes det nå om users er undefined */}
        {users?.map((u) => (
          <li key={u.id}>{`${u.username} ${u.password}`}</li>
        ))}
      </ul>
    </div>
  );
}
