import { useState } from "react";
import {
  PostError,
  postFormWithAxiosError as postFormWithError,
  queryKeyUsers,
} from "../utils/postForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/*
  💡 Refleksjonsspørsmål:
  - Er det rett å gi status 200 for noe som gir en feilmelding?
  - Når du prøver å submitte uten verdier i feltene, får du en 400-feil.
    Hvordan ville du ha inkludert en feilmelding for statuskoder?

  📖 Lesestoff:
  - https://medium.com/@func25/should-you-return-an-error-in-200-ok-response-8e7ffcdcb0f4
*/

interface NewUserRequest {
  username: string;
  password: string;
  requestedError?: PostError;
}

// ✅ Mapper errorReason til passende feilmeldinger
function getFriendlyErrorMessage(error: Error | null) {
  const errorReason = error?.message;

  switch (errorReason) {
    case "MAX_REQUESTS_REACHED":
      return "Du har prøvd å opprette for mange brukere. Prøv igjen senere.";
    case "TOO_SHORT_PASSWORD":
      return "Passordet er for kort. Prøv minst 6 tegn.";
    default:
      return "En ukjent feil skjedde. Prøv igjen senere.";
  }
}

export function Fasit07() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  // ✅ Henter ut isSuccess for å vise vellykket mutering
  const { mutate, error, isPending, isSuccess } = useMutation({
    mutationFn: (newUser: NewUserRequest) =>
      postFormWithError(
        newUser.username,
        newUser.password,
        newUser.requestedError
      ),

    onSuccess: (data) => {
      // ✅ Kaster feil hvis ikke suksess på en 200 status
      if (data?.isSuccess === false) {
        throw new Error(data.errorReason);
      }

      setUsername("");
      setPassword("");
      queryClient.invalidateQueries({ queryKey: queryKeyUsers });
    },
  });

  // ✅ Mapper errorReason til passende feilmeldinger
  const friendlyErrorMessage = getFriendlyErrorMessage(error);

  async function onSubmit(event: React.FormEvent, requestedError?: PostError) {
    event.preventDefault();

    mutate({ username, password, requestedError: requestedError });
  }

  return (
    <div>
      <h1>Fasit 7 - Tilpasset feilmelding</h1>
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

        {/* ✅ Ved suksess, vis vellykket-melding til bruker */}
        {isSuccess && <p>La til bruker</p>}

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
        {error && <p>{friendlyErrorMessage}</p>}
      </form>
    </div>
  );
}
