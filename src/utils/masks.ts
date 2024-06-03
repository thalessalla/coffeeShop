export const applyCpfMask = (value: string | undefined): string => {
  if (!value) return "";
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export function applyCreditCardMask(value: string): string {
  return value.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function applyCvvMask(value: string): string {
  return value.replace(/\D/g, "");
}
