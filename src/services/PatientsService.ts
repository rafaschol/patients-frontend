import { ApiError, type ApiErrorElement, type Patient } from "../types/";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/patients";

export const getPatients = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new ApiError(response.statusText, response.status);

  const { data: patients }: { data: Patient[] } = await response.json();
  return patients;
};

export const addPatient = async (patient: Patient) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });
  if (!response.ok) {
    const { errors }: { errors: ApiErrorElement[] } = await response.json();
    throw new ApiError(response.statusText, response.status, errors);
  }

  const { data: newPatient }: { data: Patient } = await response.json();
  return newPatient;
};
