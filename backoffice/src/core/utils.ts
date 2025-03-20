export function cleanForm<T extends Record<string, unknown>>(
  form: T,
): Partial<T> {
  return Object.fromEntries(
    Object.entries(form).filter(
      ([_, val]) => val !== "" && val !== undefined && val !== null,
    ),
  ) as Partial<T>;
}
