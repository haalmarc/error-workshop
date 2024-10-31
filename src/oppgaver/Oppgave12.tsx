import { RandomName, fetchRandomName, postForm } from "../utils/postForm";
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
  👉 Oppgave: Ta i bruk useMutation
  - Wrap postForm med useMutation
  - Hent nye data for query "users" (se variabel queryKeyUsers) etter innsending
  - Reset felter etter mutering
  - Bruk laste-status fra muteringen

  - Se https://tkdodo.eu/blog/react-query-and-forms

  💡 Bonus-spørsmål: Hva er forskjellen på onSuccess i useMutation vs i muteringsfunksjonen?
*/

export function Oppgave12() {
  const { data } = useQuery({
    queryKey: ["random-name"],
    queryFn: fetchRandomName,
  });

  if (!data) {
    return <p>Fant ingen data</p>;
  }

  return <Form data={data} />;
}

interface FormProps {
  data: RandomName;
}

function Form({ data }: FormProps) {
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
      <h1>Oppgave 12 - useMutation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div>
          <label>
            Brukernavn
            <input
              type="text"
              {...register("username")}
              defaultValue={data.name}
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
