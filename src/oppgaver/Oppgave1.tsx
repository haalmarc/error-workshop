import { postForm } from "../utils/postForm";

/* 
    👉 Oppgave: Bytt ut hardkodede verdier i postForm med verdier fra inputfeltene
    - Bruk useState for å holde rede på verdiene
    - Reset skjemafelter etter innsending

    - Se docs: https://react.dev/reference/react/useState#examples-basic

    💡 Bonus-spørsmål: Hva er forskjellen på et kontrollert og ukontrollert skjema?
*/

export function Oppgave1() {
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    await postForm("todo", "todo");
  }

  return (
    <div>
      <h1>Oppgave 1 - Vanilla React</h1>
      <form onSubmit={onSubmit} className="form">
        <div>
          <label>
            Brukernavn
            <input type="text" />
          </label>
        </div>

        <div>
          <label>
            Passord
            <input type="password" />
          </label>
        </div>

        <button className="submitButton">Opprett bruker</button>
      </form>
    </div>
  );
}
