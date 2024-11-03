import { useState } from "react";
import { fetchUsersWithError, queryKeyUsers, User } from "../utils/postForm";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary01";

/*
  👉 Oppgave: Vis en feilmelding via error-objektet fra TanStack Query ved feilende API-kall.

  ✨ Endringer
  Nå sjekkes det for undefined på users-objektet.
  fetchUsers er byttet ut med fetchUsersWithError.

  💡 Refleksjonsspørsmål:
  - Hvorfor fanges ikke feilen opp av ErrorBoundary?

  📖 Lesestoff: 
  - https://tanstack.com/query/latest/docs/framework/react/typescript#typing-the-error-field
*/

export function Oppgave02() {
  return (
    <ErrorBoundary>
      <Form />
    </ErrorBoundary>
  );
}

function Form() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data: users, isLoading } = useQuery<User[]>({
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
      <h1>Oppgave 2 - useQuery Error</h1>
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
        {/* ✨ Siden forrige oppgave, sjekkes det nå om users er undefined */}
        {users?.map((u) => (
          <li key={u.id}>{`${u.username} ${u.password}`}</li>
        ))}
      </ul>
    </div>
  );
}
