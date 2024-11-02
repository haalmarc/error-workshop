import { useState } from "react";
import { fetchUsers, queryKeyUsers, User } from "../utils/postForm";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary01";

/*
  💡 Refleksjonsspørsmål:
  - Kan du ha for mange ErrorBoundaries?
  - Hvilke feil er det ErrorBoundary ikke fanger opp?

  📖 Lesestoff: 
  - https://www.brandondail.com/posts/fault-tolerance-react
  - https://legacy.reactjs.org/docs/error-boundaries.html
*/

export function Fasit01() {
  return (
    <ErrorBoundary>
      <Form />
    </ErrorBoundary>
  );
}

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data: users } = useQuery<User[]>({
    queryKey: queryKeyUsers,
    queryFn: fetchUsers,
    staleTime: 0,
  });

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Fasit 1 - ErrorBoundary</h1>
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
      <ul>
        {/* Sjekker ikke for undefined for å fremprovosere en feil. Kun for oppgavens skyld. */}
        {users!.map((u) => (
          <li key={u.id}>{`${u.username} ${u.password}`}</li>
        ))}
      </ul>
    </div>
  );
}
