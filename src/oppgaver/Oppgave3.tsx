import { useState } from "react";
import { postForm } from "../utils/postForm";

/*
  👉 Oppgave: Legg til lasting-status
  - Vis "laster" på knappen mens det lastes
  - Ikke tillat å sende inn flere ganger mens det lastes

  💡 Bonus-spørsmål: Hva skjer om brukeren lukker siden mens forespørselen pågår?
*/

export function Oppgave3() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function validateForm() {
    let isValid = true;

    if (username.trim() === "") {
      setUsernameError("Brukernavn kan ikke være tomt");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Passord kan ikke være tomt");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Passord må være minst 6 tegn langt");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    await postForm(username, password);

    setUsername("");
    setPassword("");
  }

  return (
    <div>
      <h1>Oppgave 3 - Laste-status</h1>
      <form onSubmit={onSubmit} className="form">
        <div>
          <label>
            Brukernavn
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {usernameError && (
              <span className="errorMessage">{usernameError}</span>
            )}
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
            {passwordError && (
              <span className="errorMessage">{passwordError}</span>
            )}
          </label>
        </div>

        <button className="submitButton" type="submit">
          Opprett bruker
        </button>
      </form>
    </div>
  );
}
