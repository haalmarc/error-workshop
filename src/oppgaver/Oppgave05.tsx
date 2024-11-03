import { useState } from "react";
import {
  fetchUsersWithAxiosError,
  queryKeyUsers,
  User,
} from "../utils/postForm";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary01";
import { getFriendlyErrorMessage } from "./getFriendlyErrorMessage04";

/*
  👉 Oppgave: Utvid retry-håndtering.
  - console.log feil om 3 retries ble utført
    - Inkluder statuskode, melding fra responsen og URL fra forespørselen
  - Ikke retry ved status 4xx


  💡 Refleksjonsspørsmål:
  - Når trigges en retry i TanStack Query?
  - Hvorfor ikke prøve forespørselen på nytt ved 4xx?
*/

/*
  Denne logikken vil du egentlig ha direkte i queryClientProvider (se main.tsx),
  men legger logikken i denne filen, så oppgaveskillet er tydeligere.
*/
const maxRetries = 3;

// Ignorert regel, siden den vil utvides i oppgaven
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handleRetry(failureCount: number, error: Error) {
  // TODO: Utvid logikk, se oppgave
  return failureCount < maxRetries;
}

export function Oppgave05() {
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
    queryFn: fetchUsersWithAxiosError,
    staleTime: 0,
  });

  const friendlyErrorMessage = getFriendlyErrorMessage(error);

  if (isLoading) {
    return <p>Laster ...</p>;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Oppgave 5 - Retry</h1>
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

      {error && <p>{friendlyErrorMessage}</p>}
      <ul>
        {users?.map((u) => (
          <li key={u.id}>{`${u.username} ${u.password}`}</li>
        ))}
      </ul>
    </div>
  );
}
