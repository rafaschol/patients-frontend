import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Toaster } from "react-hot-toast";
import { PatientsProvider } from "./context/PatientsContext";
import PatientsList from "./routes/PatientsList";
import PatientsCreate from "./routes/PatientsCreate";

function AppRouter() {
  return (
    <BrowserRouter>
      <PatientsProvider>
        <Routes>
          <Route path="patients">
            <Route index element={<PatientsList />} />
            <Route path="new" element={<PatientsCreate />} />
          </Route>
          <Route path="*" element={<Navigate to="/patients" replace />} />
        </Routes>
      </PatientsProvider>

      <Toaster />
    </BrowserRouter>
  );
}

export default AppRouter;
