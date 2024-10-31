import { postForm } from "../utils/postForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "Brukernavn er påkrevd" }),
  password: z
    .string()
    .min(6, { message: "Passord må være minst 6 tegn langt" }),
});

type Inputs = z.infer<typeof schema>;

/* 
  👉 Oppgave: Ta i bruk TanStack Query med React Hook Form.
  - Bruk funksjonen fetchRandomName (fins i dette prosjektet) til å hente et navn. 
    Wrap denne i useQuery
  - Sett initiell verdi på username til å være navnet du henter
  - OBS. Det er noen diskrete bugs som introduseres med disse endringene. 
    Dette ser vi på i neste oppgave
  
  - Se https://tkdodo.eu/blog/react-query-and-forms


  💡 Bonus-spørsmål: Refresh siden, legg inn verdi i password (ikke username) og submit. 
    Hvorfor tror ikke skjemaet at du har en verdi der?
*/

export function Oppgave10() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await postForm(data.username, data.password);
      reset();
    } catch (e) {
      if (e instanceof Error) {
        setError("root", {
          message: e.message,
        });
      } else {
        setError("root", {
          message: "En ukjent feil oppstod",
        });
      }
    }
  };

  return (
    <div>
      <h1>Oppgave 10 - TanStack Query</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label>
            Brukernavn
            <input type="text" {...register("username")} />
            {errors.username && (
              <span className="errorMessage">{errors.username.message}</span>
            )}
          </label>
        </div>

        <div>
          <label>
            Passord
            <input type="password" {...register("password")} />
            {errors.password && (
              <span className="errorMessage">{errors.password.message}</span>
            )}
          </label>
        </div>

        <button className="submitButton" disabled={isSubmitting}>
          {isSubmitting ? "Laster" : "Opprett bruker"}
        </button>
        {errors.root && (
          <span className="errorMessage">{errors.root.message}</span>
        )}
      </form>
    </div>
  );
}
