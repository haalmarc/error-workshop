import { fetchRandomName, postForm } from "../utils/postForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
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
  👉 Oppgave: Tillat å submitte skjemaet 
      uten at du som bruker trenger å endre noe i username-feltet
    
  - Løs bugen ved å splitte opp i egen form-komponent, 
    se https://tkdodo.eu/blog/react-query-and-forms#data-might-be-undefined

  💡 Bonus-spørsmål: Undersøk flere måter å løse problemet på. 
  Hvilken måte liker du best?
  Se også https://www.reddit.com/r/reactjs/comments/111mrek/react_hook_form_tanstack_usequery_async/
*/

export function Oppgave11() {
  const { data } = useQuery({
    queryKey: ["random-name"],
    queryFn: fetchRandomName,
  });

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
      <h1>Oppgave 11 - Oppsplitting</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label>
            Brukernavn
            <input
              type="text"
              {...register("username")}
              defaultValue={data?.name}
            />
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
