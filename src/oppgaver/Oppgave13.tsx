import {
  RandomName,
  fetchRandomName,
  postForm,
  queryKeyUsers,
} from "../utils/postForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  👉 Oppgave: Legg til datepicker
  - Bruk Controller fra React Hook Form
  - Legg til nytt felt i zod-skjemaet
  - Bytt ut funksjon "postForm" med "postFormWithBirthday"

  - Se https://react-hook-form.com/docs/usecontroller/controller
    og https://zod.dev/?id=dates-1

  💡 Bonus-spørsmål: Hvorfor kan du ikke bruke register-funksjonen for eksterne inputfelter?
*/

export function Oppgave13() {
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
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: Inputs) =>
      postForm(formData.username, formData.password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeyUsers });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        setError("root", {
          message: error.message,
        });
      } else {
        setError("root", {
          message: "En ukjent feil oppstod",
        });
      }
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    mutate(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div>
      <h1>Oppgave 13 - Controller</h1>
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

        <button className="submitButton" disabled={isPending}>
          {isPending ? "Laster" : "Opprett bruker"}
        </button>
        {errors.root && (
          <span className="errorMessage">{errors.root.message}</span>
        )}
      </form>
    </div>
  );
}
