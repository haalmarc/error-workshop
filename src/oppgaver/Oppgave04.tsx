import { useState } from "react";
import {
  fetchUsersWithAxiosError,
  queryKeyUsers,
  User,
} from "../utils/postForm";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorBoundary } from "./ErrorBoundary01";

/*
  👉 Oppgave: Backend kaster en feilmelding. Vis den istedenfor generisk 500-feil.

  ✨ Endringer
  fetchUsersWithError er bytta ut med fetchUsersWithAxiosError.
  Sjekk den stygge feilmeldingen du får nå. Det må vi gjøre noe med.

  💡 Refleksjonsspørsmål:
  - Hvordan er formatet på Error annerledes enn AxiosError?

  📖 Lesestoff:
  - https://www.totaltypescript.com/tutorials/solving-typescript-errors/errors/fixing-x-is-of-type-unknown
  - https://www.youtube.com/watch?v=NGSck4aHfeQ
*/

export function Oppgave04() {
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
    // ✨ Siden sist, fetcheren kaster nå AxiosError istedenfor gamle Error
    queryFn: fetchUsersWithAxiosError,
    staleTime: 0,
    // ✨ Siden sist, fjerna throwOnError
  });

  if (isLoading) {
    return <p>Laster ...</p>;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Oppgave 4 - AxiosError</h1>
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
        {users?.map((u) => (
          <li key={u.id}>{`${u.username} ${u.password}`}</li>
        ))}
      </ul>
    </div>
  );
}
