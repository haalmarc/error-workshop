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
import axios from "axios";

/*
  💡 Refleksjonsspørsmål:
  - Hva er det viktigste å ha med når du logger feilen?
  - Hva er forskjellen på data.message og error.message?
  - Queries har en standard retry på 3 ganger, mens muteringer har ingen. Hvorfor det?
*/

const maxRetries = 3;

// eslint-disable-next-line react-refresh/only-export-components
export function handleRetryFasit05(failureCount: number, error: Error) {
  if (axios.isAxiosError(error)) {
    const statusCode = error.status;

    if (statusCode && statusCode >= 400 && statusCode < 500) {
      return false;
    }

    if (failureCount === maxRetries) {
      console.log(
        `Max retries (${failureCount}) reached. URL: ${
          error?.request?.responseURL
        } Status: ${statusCode}. Message: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`,
        error
      );

      return false;
    }
  }

  if (failureCount === maxRetries) {
    console.log(
      `Max retries (${failureCount}) reached. Message: ${
        error.message || "Unknown error"
      }`,
      error
    );
  }

  return failureCount < maxRetries;
}

export function Fasit05() {
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
      <h1>Fasit 5 - Retry</h1>
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
