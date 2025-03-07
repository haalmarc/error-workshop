import { useState } from "react";
import { fetchUsers, queryKeyUsers, User } from "../utils/postForm";
import { useQuery } from "@tanstack/react-query";

/*
  👉 Oppgave: Hindre kræsj med ErrorBoundary
  - Kjør opp applikasjonen
  - Fjern isLoading- sjekken. Dette vil fremprovosere en kræsj
  - Ta i bruk ErrorBoundary for komponent Oppgave01 (ErrorBoundary er allerede lagd. Se ErrorBoundary.tsx)

  💡 Refleksjonsspørsmål:
  - Hvorfor kræsjer appen i utgangspunktet?
  - Hva er forskjellen på å sjekke for error i useQuery-tilstanden versus ErrorBoundary?

  📖 Lesestoff: 
  - https://www.brandondail.com/posts/fault-tolerance-react
  - https://legacy.reactjs.org/docs/error-boundaries.html
*/

export function Oppgave01() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: queryKeyUsers,
    queryFn: fetchUsers,
    staleTime: 0,
  });

  // 👇 Fjern laste-sjekken
  if (isLoading) {
    return <p>Laster ...</p>;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <div>
      <h1>Oppgave 1 - ErrorBoundary</h1>
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
