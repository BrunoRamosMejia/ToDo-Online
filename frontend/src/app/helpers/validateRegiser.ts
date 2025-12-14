export const validateRegister = (input: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return {
    name: !input.name.trim() ? "Nombre es requerido" : "",
    email: !input.email.trim()
      ? "Email es requerido"
      : !/\S+@\S+\.\S+/.test(input.email)
      ? "Email no es válido"
      : "",
    password: !input.password
      ? "Contraseña es requerida"
      : input.password.length < 6
      ? "La contraseña debe tener al menos 6 caracteres"
      : "",
    confirmPassword: !input.confirmPassword
      ? "Confirmar contraseña es requerido"
      : input.password !== input.confirmPassword
      ? "Las contraseñas no coinciden"
      : "",
  };
};