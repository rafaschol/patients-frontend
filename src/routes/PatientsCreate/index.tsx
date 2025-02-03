import { Link } from "react-router";
import { Patient } from "../../types/";
import { usePatients } from "../../hooks/usePatients";
import InputImageUpload from "../../components/InputImageUpload";
import Loader from "../../components/Loader";

function PatientsCreate() {
  const {
    addPatient,
    addPatientLoading: loading,
    addPatientErrors: errors,
  } = usePatients();

  const handleAddPatient = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const patient = Object.fromEntries(
      formData.entries(),
    ) as unknown as Patient;

    addPatient(patient);
  };

  const renderFieldErrors = (field: string) => {
    const fieldErrors = errors?.filter(({ source }) => source === field);
    if (!fieldErrors?.length) return null;

    return (
      <ul>
        {fieldErrors.map(({ message }) => (
          <li key={message} className="text-sm text-red-500 mt-1">
            {message}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleAddPatient}
        className="bg-white shadow-sm rounded-lg px-4 py-5 min-w-lg relative"
      >
        {loading && (
          <div className="absolute top-0 left-0 bg-white w-full h-full rounded-lg">
            <Loader />
          </div>
        )}

        <h1 className="text-2xl">Register New Patient</h1>

        <hr className="h-px my-5 bg-gray-300 border-0" />

        <fieldset className="mb-8 space-y-3">
          <div>
            <label
              htmlFor="name"
              className="block text-sm italic font-medium text-gray-800 mb-0.5"
            >
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="John Doe"
              // If I had more time, I'd use custom validations with the Constraint Validation API
              pattern="[a-zA-Z]*"
              className="block w-full px-2 py-1 bg-gray-50 border border-gray-300 text-gray-600 rounded"
            />
            {renderFieldErrors("name")}
          </div>

          <div>
            <label
              htmlFor="email_address"
              className="block text-sm italic font-medium text-gray-800 mb-0.5"
            >
              Email address:
            </label>
            <input
              type="email"
              name="email_address"
              id="email_address"
              required
              placeholder="john@example.com"
              // If I had more time, I'd use custom validations with the Constraint Validation API
              pattern="^[a-zA-Z0-9]+@gmail\.com$"
              className="block w-full px-2 py-1 bg-gray-50 border border-gray-300 text-gray-600 rounded"
            />
            {renderFieldErrors("email_address")}
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block text-sm italic font-medium text-gray-800 mb-0.5"
            >
              Phone number:
            </label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              placeholder="+598 99 123 456"
              className="block w-full px-2 py-1 bg-gray-50 border border-gray-300 text-gray-600 rounded"
            />
            {renderFieldErrors("phone_number")}
          </div>

          <div>
            <label
              htmlFor="document_image"
              className="block text-sm italic font-medium text-gray-800 mb-0.5"
            >
              Document image:
            </label>
            <InputImageUpload
              name="document_image"
              id="document_image"
              required
              className="block w-full px-2 py-1 bg-gray-50 border border-gray-300 text-gray-600 rounded"
            />
            {renderFieldErrors("document_image")}
          </div>
        </fieldset>

        <div className="grid grid-cols-2 gap-4">
          <Link
            to="/patients"
            type="button"
            className="px-4 py-2 text-center border cursor-pointer border-teal-600 text-teal-600 rounded-md font-semibold text-sm hover:bg-teal-50 transition"
          >
            Cancel
          </Link>
          <input
            type="submit"
            value="Add Patient"
            className="px-4 py-2 cursor-pointer bg-teal-600 text-white rounded-md font-semibold text-sm hover:bg-teal-700 transition"
          />
        </div>
      </form>
    </div>
  );
}

export default PatientsCreate;
