export const validateStudent = (
  name: string | null,
  laastname: string | null,
  age: number | undefined
) => {
  const errors: {
    nameError: null | string;
    lastnameError: null | string;
    ageError: null | string;
  } = { nameError: null, lastnameError: null, ageError: null };

  if (!name || name.trim().length < 3) {
    errors.nameError = "El nombre debe tener al menos 3 caracteres.";
  }

  if (!laastname || laastname.trim().length < 2) {
    errors.lastnameError = "El Apellido debe tener al menos 2 caracteres.";
  }

  if (age === undefined || age < 5 || age > 18) {
    errors.ageError = "La edad debe estar entre 5 y 18 años.";
  }

  return errors;
};
