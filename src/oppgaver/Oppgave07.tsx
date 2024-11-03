import { useState } from "react";
import {
  PostError,
  postFormWithAxiosError as postFormWithError,
  queryKeyUsers,
} from "../utils/postForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/*
  👉 Oppgave: Vis passende feilmelding avhengig av type feil

  - Endepunktet returnerer {isSuccess: boolean, errorReason: PostError}
    - Hvis ikke suksess, gi en passende feilmelding utifra errorReason
    - Hvis suksess, gi melding om suksessfull lagt til bruker 

  ✨ Jeg har nå lagt til noen flere knapper, for å fremprovosere visse feil

  💡 Refleksjonsspørsmål:
  - Hvordan kan du vite om endepunktet serverer på format error.message eller {errorReason}?
*/

interface NewUserRequest {
  username: string;
  password: string;
  requestedError?: PostError;
}

export function Oppgave07() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate, error, isPending } = useMutation({
    mutationFn: (newUser: NewUserRequest) =>
      postFormWithError(
        newUser.username,
        newUser.password,
        newUser.requestedError
      ),

    onSuccess: () => {
      setUsername("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: queryKeyUsers });
    },
  });

  async function onSubmit(event: React.FormEvent, requestedError?: PostError) {
    event.preventDefault();

    mutate({ username, password, requestedError: requestedError });
  }

  return (
    <div>
      <h1>Oppgave 7 - Tilpasset feilmelding</h1>
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

        <button className="submitButton" type="submit" disabled={isPending}>
          Opprett bruker
        </button>
        {/* ✨ Legger til knapper for å trigge feilmeldinger */}
        <button
          className="submitButton"
          type="button"
          disabled={isPending}
          onClick={(e) => onSubmit(e, "UNKNOWN")}
        >
          UNKNOWN
        </button>
        <button
          className="submitButton"
          type="button"
          disabled={isPending}
          onClick={(e) => onSubmit(e, "TOO_SHORT_PASSWORD")}
        >
          TOO_SHORT_PASSWORD
        </button>
        <button
          className="submitButton"
          type="button"
          disabled={isPending}
          onClick={(e) => onSubmit(e, "MAX_REQUESTS_REACHED")}
        >
          MAX_REQUESTS_REACHED
        </button>
        {error && <p>En feil skjedde</p>}
      </form>
    </div>
  );
}
