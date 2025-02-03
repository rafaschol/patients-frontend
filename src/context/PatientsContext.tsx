import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { StatusCodes } from "http-status-codes";
import { ApiError, ApiErrorElement, type Patient } from "../types/";
import * as patientsService from "../services/PatientsService";

type PatientsContextProps = {
  patients: Patient[];
  patientsLoading: boolean;
  addPatient: (patient: Patient) => void;
  addPatientLoading: boolean;
  addPatientErrors: ApiErrorElement[] | null;
};

type PatientsProviderProps = {
  children: React.ReactNode;
};

export const PatientsContext = createContext<PatientsContextProps>(null!);

export const PatientsProvider = ({ children }: PatientsProviderProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(false);
  const [addPatientLoading, setAddPatientLoading] = useState(false);
  const [addPatientErrors, setAddPatientErrors] = useState<
    ApiErrorElement[] | null
  >([]);

  const navigate = useNavigate();

  const getPatients = async () => {
    setPatientsLoading(true);
    try {
      const patients = await patientsService.getPatients();
      setPatients(patients);
    } catch (error) {
      toast.error(
        "A server communication error occurred. Please try again later.",
      );
    } finally {
      setPatientsLoading(false);
    }
  };

  const addPatient = async (patient: Patient) => {
    setAddPatientLoading(true);

    try {
      const newPatient = await patientsService.addPatient(patient);
      const patientsUpdated = [...patients, newPatient];
      setPatients(patientsUpdated);
      localStorage.setItem("patients", JSON.stringify(patientsUpdated));
      setAddPatientErrors(null);
      navigate("/patients");
      toast.success("Patient registered successfully.");
    } catch (error) {
      if (
        error instanceof ApiError &&
        [StatusCodes.BAD_REQUEST, StatusCodes.CONFLICT].includes(error.status)
      ) {
        setAddPatientErrors(error.errors ?? null);
      } else {
        toast.error(
          "A server communication error occurred. Please try again later.",
        );
      }
    } finally {
      setAddPatientLoading(false);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <PatientsContext.Provider
      value={{
        patients,
        patientsLoading,
        addPatient,
        addPatientLoading,
        addPatientErrors,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
