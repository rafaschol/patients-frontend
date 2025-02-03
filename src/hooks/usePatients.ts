import { useContext } from "react";
import { PatientsContext } from "../context/PatientsContext";

export const usePatients = () => useContext(PatientsContext);
