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
  💡 Refleksjonsspørsmål:
  - Hvordan kan du sørge for at feilmeldingen backend sender er som forventet i frontend?
*/

export function Fasit04() {
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

  // ✅ Mapper nå error over til en feilmelding
  const friendlyErrorMessage = getFriendlyErrorMessage(error);

  if (isLoading) {
    return <p>Laster ...</p>;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Fasit 4 - AxiosError</h1>
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

      {/* ✅ Mapper nå error over til en finere feilmelding */}
      {error && <p>{friendlyErrorMessage}</p>}
      <ul>
        {users?.map((u) => (
          <li key={u.id}>{`${u.username} ${u.password}`}</li>
        ))}
      </ul>
    </div>
  );
}
