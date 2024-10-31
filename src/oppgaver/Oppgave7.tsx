import { postForm } from "../utils/postForm";
import { useForm, SubmitHandler } from "react-hook-form";

/*
  👉 Oppgave: Som bruker ønsker jeg å se "laster"-tekst, mens skjemaet sendes inn
  - Les om formState i useForm: https://react-hook-form.com/docs/useform/formstate

  💡 Bonus-spørsmål: Du har flere varianter av isSubmit... Hvilken bør du bruker når?
*/

type Inputs = {
  username: string;
  password: string;
};

export function Oppgave7() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await postForm(data.username, data.password);
    reset();
  };

  return (
    <div>
      <h1>Oppgave 7 - Laste-status</h1>
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

        <button className="submitButton">Opprett bruker</button>
      </form>
    </div>
  );
}
