import { postForm } from "../utils/postForm";

/* 
  👉 Oppgave: Ta i bruk React Hook Form
  - Submit data ved bruk av useForm og SubmitHandler
  - Reset skjema

  - Se docs: https://react-hook-form.com/get-started

  💡 Bonus-spørsmål: Hva skiller det å bruke vanilla React med useState vs useForm?
*/

export function Oppgave5() {
  async function onSubmit() {
    await postForm("todo", "todo");
  }

  return (
    <div>
      <h1>Oppgave 5 - React Hook Form</h1>
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
