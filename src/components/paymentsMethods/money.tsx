import { applyCpfMask } from "../../utils/masks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaMoney } from "../../utils/validationSchema";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type FormValues = {
  cpf: string;
  name: string;
  email: string;
};

function Money() {
  const cart = useSelector((state: RootState) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchemaMoney),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const cpfValue = watch("cpf");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            className="mt-4 p-2 w-full"
            placeholder="CPF"
            id="cpf"
            {...register("cpf")}
            value={applyCpfMask(cpfValue)}
            onChange={(e) => setValue("cpf", e.target.value)}
          />
          {errors.cpf && <p className="text-red-700">{errors.cpf.message}</p>}

          <input
            className="mt-4 p-2 w-full"
            type="text"
            placeholder="Nome"
            id="name"
            {...register("name")}
            onChange={(e) => setValue("name", e.target.value)}
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}

          <input
            className="mt-4 p-2 w-full"
            type="email"
            placeholder="E-mail"
            id="email"
            {...register("email")}
            onChange={(e) => setValue("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </div>

        <p className="text-base font-bold mt-8 text-neutral-600">
          Se direcione ao caixa com o dinheiro.
        </p>

        <Button
          variant="contained"
          className="mt-8 bg-primary hover:bg-amber-900 w-full disabled:cursor-not-allowed disabled:bg-neutral-300"
          type="submit"
          disabled={cart.totalQuantity < 1}
        >
          Finalizar pedido
        </Button>
      </form>
    </>
  );
}

export default Money;
