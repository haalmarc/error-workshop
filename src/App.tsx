import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Oppgave1 } from "./oppgaver/Oppgave1";
import { Layout } from "./components/Layout";

import { Oppgave13 } from "./oppgaver/Oppgave13";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Oppgave1 />} />

          <Route path="opg2" element={<Oppgave1 />} />

          <Route path="opg13" element={<Oppgave13 />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}
