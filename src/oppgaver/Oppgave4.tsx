import { useState } from "react";
import { postForm } from "../utils/postForm";

/* 
  👉 Oppgave: Legg til feilhåndtering om skjemaet feiler.
  - Bytt ut postForm med postFormWithError og vis en feilmelding når kallet feiler.

  💡 Bonus-spørsmål: Hva er forskjellen på å vise feilmeldingen med en ErrorBoundary vs med state?
*/

export function Oppgave4() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

    await postForm(username, password);

    setIsLoading(false);

    setUsername("");
    setPassword("");
  }

  return (
    <div>
      <h1>Oppgave 4 - Feiling ved kall</h1>
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

        <button className="submitButton" type="submit" disabled={isLoading}>
          {isLoading ? "Laster" : "Opprett bruker"}
        </button>
      </form>
    </div>
  );
}
