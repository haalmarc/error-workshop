import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Oppgave01 } from "./oppgaver/Oppgave01";
import { Layout } from "./components/Layout";

import { Oppgave13 } from "./oppgaver/Oppgave13";
import { Fasit01 } from "./oppgaver/Fasit01";
import { Oppgave02 } from "./oppgaver/Oppgave02";
import { Fasit02 } from "./oppgaver/Fasit02";
import { Oppgave03 } from "./oppgaver/Oppgave03";
import { Fasit03 } from "./oppgaver/Fasit03";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Oppgave01 />} />
          <Route path="fasit1" element={<Fasit01 />} />

          <Route path="opg2" element={<Oppgave02 />} />
          <Route path="fasit2" element={<Fasit02 />} />

          <Route path="opg3" element={<Oppgave03 />} />
          <Route path="fasit3" element={<Fasit03 />} />

          <Route path="opg13" element={<Oppgave13 />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}
