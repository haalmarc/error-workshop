import { postForm } from "../utils/postForm";
import { useForm, SubmitHandler } from "react-hook-form";

/*
  👉 Oppgave: Legg til validering av input-feltene.
  - Ingen av feltene kan være tomme
  - Passordet må være minst 6 tegn
  - Som bruker ønsker jeg å se en feilmelding

  💡 Bonus-spørsmål: Hvordan ville du lagt inn krav om "brukernavn må ha minst 1 tall"?
*/

type Inputs = {
  username: string;
  password: string;
};

export function Oppgave6() {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await postForm(data.username, data.password);
    reset();
  };

  return (
    <div>
      <h1>Oppgave 6 - Validering av felter</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label>
            Brukernavn
            <input type="text" {...register("username")} />
          </label>
        </div>

        <div>
          <label>
            Passord
            <input type="password" {...register("password")} />
          </label>
        </div>

        <button className="submitButton">Opprett bruker</button>
      </form>
    </div>
  );
}
