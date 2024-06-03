import * as z from "zod";

export const formSchema = z.object({
  cpf: z
    .string()
    .min(14, { message: "CPF deve ter 14 caracteres" })
    .refine(
      (value) => {
        const cpf = value.replace(/\D/g, "");
        if (cpf.length !== 11) return false;

        let sum;
        let remainder;
        sum = 0;
        if (cpf === "00000000000") return false;

        for (let i = 1; i <= 9; i++)
          sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++)
          sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        return true;
      },
      {
        message: "CPF inválido",
      }
    ),
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {
      message: "O nome deve incluir pelo menos um sobrenome",
    }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de email válido" })
    .min(5, { message: "O email deve ter pelo menos 5 caracteres" })
    .max(100, { message: "O email deve ter no máximo 100 caracteres" }),
  creditCardNumber: z
    .string()
    .length(16, {
      message: "O número do cartão de crédito deve ter 16 dígitos",
    })
    .regex(/^\d+$/, {
      message: "O número do cartão de crédito deve conter apenas dígitos",
    }),
  cvv: z
    .string()
    .min(3, { message: "O CVV deve ter pelo menos 3 dígitos" })
    .max(4, { message: "O CVV deve ter no máximo 4 dígitos" })
    .regex(/^\d+$/, { message: "O CVV deve conter apenas dígitos" }),
});

export const formSchemaMoney = z.object({
  cpf: z
    .string()
    .min(14, { message: "CPF deve ter 14 caracteres" })
    .refine(
      (value) => {
        const cpf = value.replace(/\D/g, "");
        if (cpf.length !== 11) return false;

        let sum;
        let remainder;
        sum = 0;
        if (cpf === "00000000000") return false;

        for (let i = 1; i <= 9; i++)
          sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++)
          sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
        return true;
      },
      {
        message: "CPF inválido",
      }
    ),
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" })
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)+$/, {
      message: "O nome deve incluir pelo menos um sobrenome",
    }),
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de email válido" })
    .min(5, { message: "O email deve ter pelo menos 5 caracteres" })
    .max(100, { message: "O email deve ter no máximo 100 caracteres" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Por favor, insira um endereço de  email valido" }),
  password: z.string(),
  // .min(5, { message: "A senha deve ter entre 5 e 15 caracteres" })
  // .max(15, { message: "A senha deve ter no maximo 15 caracteres" }),
});
