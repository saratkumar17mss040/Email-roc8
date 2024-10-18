import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Email from "./pages/Email";
import NotFoundPage from "./pages/NotFound";
import { EmailContextProvider, useEmailContext } from "./context/EmailContext";

export default function App() {
  return (
    <Router>
      <EmailContextProvider>
        <Routes>
          {/* Define the base page and other routes */}
          <Route path="/" element={<Email />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </EmailContextProvider>
    </Router>
  );
}
