export const validateSubject = (
  name: string | null,
  description: string | null,
  existingNames: string[]
) => {
  const errors: {
    nameError: null | string;
    descriptionError: null | string;
  } = { nameError: null, descriptionError: null };

  if (!name || name.trim().length < 3) {
    errors.nameError = "El nombre debe tener al menos 3 caracteres.";
  } else if (existingNames.includes(name.trim())) {
    errors.nameError = "El nombre ya existe.";
  }

  if (description && description.length > 200) {
    errors.descriptionError =
      "La descripción no puede superar los 200 caracteres.";
  }

  return errors;
};
