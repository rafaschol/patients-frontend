import { Link } from "react-router";
import PatientCard from "./PatientCard";
import { usePatients } from "../../hooks/usePatients";
import Loader from "../../components/Loader";

function PatientsList() {
  const { patients, patientsLoading: loading } = usePatients();

  return loading ? (
    <div className="h-screen">
      <Loader />
    </div>
  ) : (
    <>
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-2xl">List of patients</h1>
        <Link
          to="/patients/new"
          className="px-4 py-2 bg-teal-600 text-white rounded-md font-semibold text-sm hover:bg-teal-700 transition"
        >
          Register Patient
        </Link>
      </div>

      <hr className="h-px my-8 bg-gray-300 border-0" />

      <div className="space-y-5">
        {patients.length
          ? patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))
          : "Start registering patients to see them here."}
      </div>
    </>
  );
}

export default PatientsList;
