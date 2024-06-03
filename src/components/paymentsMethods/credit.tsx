import { applyCpfMask, applyCvvMask } from "../../utils/masks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "../../utils/validationSchema";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type FormValues = {
  cpf: string;
  name: string;
  email: string;
  cvv: string;
  creditCardNumber: string;
};

function Credit() {
  const cart = useSelector((state: RootState) => state.cart);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
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
            type="text"
            placeholder="Número do Cartão de Crédito"
            id="creditCardNumber"
            {...register("creditCardNumber")}
            value={undefined}
            onChange={(e) => setValue("creditCardNumber", e.target.value)}
          />
          {errors.creditCardNumber && (
            <p className="text-red-700">{errors.creditCardNumber.message}</p>
          )}
          <input
            className="mt-4 p-2 w-full"
            type="text"
            placeholder="CVV"
            id="cvv"
            {...register("cvv")}
            value={undefined}
            onChange={(e) => setValue("cvv", applyCvvMask(e.target.value))}
          />
          {errors.cvv && <p className="text-red-700">{errors.cvv.message}</p>}

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
            value={undefined}
            onChange={(e) => setValue("name", e.target.value)}
          />
          {errors.name && <p className="text-red-700">{errors.name.message}</p>}

          <input
            className="mt-4 p-2 w-full"
            type="email"
            placeholder="E-mail"
            id="email"
            {...register("email")}
            value={undefined}
            onChange={(e) => setValue("email", e.target.value)}
          />
          {errors.name && (
            <p className="text-red-700">{errors.email?.message}</p>
          )}
        </div>

        <Button
          variant="contained"
          className="mt-8 bg-primary hover:bg-amber-900 w-full disabled:cursor-not-allowed disabled:bg-neutral-300 "
          type="submit"
          disabled={cart.totalQuantity < 1}
        >
          Finalizar pedido
        </Button>
      </form>
    </>
  );
}

export default Credit;
