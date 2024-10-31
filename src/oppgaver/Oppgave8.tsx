import { postForm } from "../utils/postForm";
import { useForm, SubmitHandler } from "react-hook-form";

/* 
  👉 Oppgave: Legg til feilhåndtering om skjemaet feiler.
  - Bytt ut postForm med postFormWithError og vis en feilmelding når kallet feiler.
  - Hint: se https://react-hook-form.com/docs/useform/seterror

  💡 Bonus-spørsmål: Du kunne også brukt seterror til å sette validering i felter. Hva foretrekker du?
*/

type Inputs = {
  username: string;
  password: string;
};

export function Oppgave8() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await postForm(data.username, data.password);
    reset();
  };

  return (
    <div>
      <h1>Oppgave 8 - Feilende kall</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label>
            Brukernavn
            <input
              type="text"
              {...register("username", { required: "Brukernavn er påkrevd" })}
            />
            {errors.username && (
              <span className="errorMessage">{errors.username.message}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Passord
            <input
              type="password"
              {...register("password", {
                required: "Passord er påkrevd",
                minLength: {
                  value: 6,
                  message: "Passord må være minst 6 tegn langt",
                },
              })}
            />
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </label>
        </div>

        <button className="submitButton" disabled={isSubmitting}>
          {isSubmitting ? "Laster" : "Opprett bruker"}
        </button>
      </form>
    </div>
  );
}
