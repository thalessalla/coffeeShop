import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { loginSchema } from "../utils/validationSchema";
import { useLogin } from "../services/api/useAuthApi";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import bgCofee from "../../src/assets/coffe.webp";

type login = z.infer<typeof loginSchema>;

type LoginProps = {
  onLogin: (token: string) => void;
};

function Login({ onLogin }: LoginProps) {
  const { mutate: doLogin, isPending } = useLogin();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  // Fechar O alert de erro ao logar
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: login) => {
    doLogin(
      {
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: (data) => {
          login({
            email: values.email,
            password: values.password,
            token: data.data.token,
          });
          navigate("/dashboard");
          onLogin(data.data.token);
        },
        onError: () => {
          setOpen(true);
        },
      }
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({ resolver: zodResolver(loginSchema) });

  return (
    <>
      <div className="min-h-[100vh] flex max-w-[1200px] mx-4">
        <div className="flex mt-20 min-w-[100%] w-full">
          <div className="hidden md:block min-w-[50%]">
            <img src={bgCofee} alt="Ilustração de xicara" />
          </div>

          <div className="w-full min-w-[50%]  content-center">
            <form
              className=" flex flex-col bg-secondary gap-5  p-6 content-center py-20 rounded-md"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-4xl mb-4 text-primary font-bold">Login</h1>
              <input
                className=" p-2 w-full"
                type="text"
                {...register("email")}
                placeholder="Login"
              />
              {errors.email && (
                <p className="text-red-700">{errors.email.message}</p>
              )}
              <input
                className=" p-2 w-full"
                type="password"
                {...register("password")}
                placeholder="Senha"
              />
              {errors.password && (
                <p className="text-red-700">{errors.password.message}</p>
              )}

              <LoadingButton
                className="bg-primary text-white hover:bg-amber-900"
                type="submit"
                size="small"
                loading={isPending}
                loadingPosition="start"
                startIcon={<LoginIcon className="text-white" />}
                variant="contained"
              >
                Save
              </LoadingButton>
            </form>
          </div>
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              variant="filled"
              className="w-full"
            >
              E-mail ou senha incorretos
            </Alert>
          </Snackbar>
        </div>
      </div>
    </>
  );
}

export default Login;
