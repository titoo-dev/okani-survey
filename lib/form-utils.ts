export function convertFormDataToBoolean(value: string | boolean | undefined): boolean | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  if (typeof value === "boolean") return value;
  return value === "true";
}

export function convertBooleanToFormData(value: boolean | undefined): string {
  if (value === undefined || value === null) return "";
  return value ? "true" : "false";
}

export function convertDateToISO(value: string): string {
  if (!value) return "";
  try {
    const date = new Date(value);
    return date.toISOString();
  } catch {
    return value;
  }
}

export function convertISOToDate(value: string): string {
  if (!value) return "";
  try {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  } catch {
    return value;
  }
}

