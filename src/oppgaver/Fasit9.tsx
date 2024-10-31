import { postFormWithError } from "../utils/postForm";
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

export function Fasit9() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await postFormWithError(data.username, data.password);
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
      <h1>Fasit 9 - Zod</h1>
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
