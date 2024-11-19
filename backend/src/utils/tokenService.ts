import speakeasy from "speakeasy";

// Función para generar el token de 2FA
export const generate2FAToken = (userId: string) => {
  // Asegurarnos de que el secreto esté definido
  const secret = process.env.SECRET_2FA;
  if (!secret) {
    throw new Error(
      "SECRET_2FA no está configurado en las variables de entorno"
    );
  }

  // Generar el token usando speakeasy sin la propiedad 'user'
  return speakeasy.totp({ secret });
};

// Función para verificar el token de 2FA
export const verify2FAToken = (userId: string, token: string) => {
  // Asegurarnos de que el secreto esté definido
  const secret = process.env.SECRET_2FA;
  if (!secret) {
    throw new Error(
      "SECRET_2FA no está configurado en las variables de entorno"
    );
  }

  // Verificar el token usando speakeasy
  return speakeasy.totp.verify({
    secret,
    token
  });
};
