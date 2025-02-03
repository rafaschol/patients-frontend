import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Patient } from "../../types/";

type PatientCardProps = {
  patient: Patient;
};

function PatientCard({ patient }: PatientCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-white shadow-sm rounded-lg cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <button className="p-6 flex items-center gap-6 w-full">
        <img
          src={patient.document_image}
          alt={patient.name}
          className="h-24 rounded-md"
        />
        <span className="text-2xl text-gray-700">
          Patient -{" "}
          <span className="text-gray-400 uppercase">{patient.name}</span>
        </span>

        {expanded ? (
          <ChevronUpIcon className="ml-auto size-6 text-gray-500" />
        ) : (
          <ChevronDownIcon className="ml-auto size-6 text-gray-500" />
        )}
      </button>
      <div className={`text-gray-500 px-6 pb-5 ${!expanded ? "hidden" : ""}`}>
        <hr className="h-px bg-gray-200 border-0 mb-4" />
        <p>
          <strong>Email address:</strong> {patient.email_address}
        </p>
        {patient.phone_number && (
          <p>
            <strong>Phone number:</strong> {patient.phone_number}
          </p>
        )}
      </div>
    </div>
  );
}

export default PatientCard;
