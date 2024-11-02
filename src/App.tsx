import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Oppgave01 } from "./oppgaver/Oppgave01";
import { Layout } from "./components/Layout";

import { Oppgave13 } from "./oppgaver/Oppgave13";
import { Fasit01 } from "./oppgaver/Fasit01";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Oppgave01 />} />
          <Route path="fasit01" element={<Fasit01 />} />

          <Route path="opg2" element={<Oppgave01 />} />

          <Route path="opg13" element={<Oppgave13 />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}
