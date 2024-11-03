import { useState } from "react";
import {
  PostError,
  postFormWithAxiosError as postFormWithError,
  queryKeyUsers,
} from "../utils/postForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/*
  👉 Oppgave: Vis feilmelding ved feilende mutering

  💡 Refleksjonsspørsmål:
  - Hvordan er feilhåndteringen i useMutation annerledes enn useQuery?
*/

interface NewUserRequest {
  username: string;
  password: string;
  requestedError: PostError;
}

export function Oppgave06() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
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

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    mutate({ username, password, requestedError: "UNKNOWN" });
  }

  return (
    <div>
      <h1>Oppgave 6 - Feilmelding ved mutering</h1>
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
      </form>
    </div>
  );
}
