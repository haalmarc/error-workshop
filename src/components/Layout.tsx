import { useQuery } from "@tanstack/react-query";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { fetchUsers, queryKeyUsers } from "../utils/postForm";

function formatDateToDDMMYYYY(date: string) {
  const asDate = new Date(date);
  const day = String(asDate.getDate()).padStart(2, "0");
  const month = String(asDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = asDate.getFullYear();

  return `🎉 ${day}.${month}.${year} 🎉`;
}

// Liste over oppgaver og fasit
const taskList = [
  { path: "/", label: "Oppgave 1" },
  { path: "/opg2", label: "Oppgave 2" },
  { path: "/opg3", label: "Oppgave 3" },
  { path: "/opg4", label: "Oppgave 4" },
  { path: "/fasit4", label: "Fasit 4" },
  { path: "/opg5", label: "Oppgave 5" },
  { path: "/opg6", label: "Oppgave 6" },
  { path: "/opg7", label: "Oppgave 7" },
  { path: "/opg8", label: "Oppgave 8" },
  { path: "/opg9", label: "Oppgave 9" },
  { path: "/fasit9", label: "Fasit 9" },
  { path: "/opg10", label: "Oppgave 10" },
  { path: "/opg11", label: "Oppgave 11" },
  { path: "/opg12", label: "Oppgave 12" },
  { path: "/opg13", label: "Oppgave 13" },
  { path: "/fasit13", label: "Fasit 13" },
];

interface User {
  username: string;
  password: string;
  birthday?: string;
  id: string;
}

export function Layout() {
  const { data: users } = useQuery<User[]>({
    queryKey: queryKeyUsers,
    queryFn: fetchUsers,
    staleTime: 0,
    refetchInterval: 20 * 1000,
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Finn indeksen til nåværende oppgave eller fasit
  const currentIndex = taskList.findIndex(
    (task) => task.path === location.pathname
  );

  const handleNext = () => {
    if (currentIndex < taskList.length - 1) {
      navigate(taskList[currentIndex + 1].path);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(taskList[currentIndex - 1].path);
    }
  };

  return (
    <div className="layout-container">
      <h1>Form Workshop</h1>
      <nav>
        <div>
          <h2>Vanilla React</h2>
          <ul>
            {taskList.slice(0, 5).map((task, index) => (
              <li
                key={index}
                style={{
                  fontWeight:
                    task.path === location.pathname ? "bold" : "normal",
                }}
              >
                <Link
                  to={task.path}
                  style={{
                    textDecoration:
                      task.path === location.pathname ? "underline" : "none",
                  }}
                >
                  {task.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>React hook form</h2>
          <ul>
            {taskList.slice(5, 11).map((task, index) => (
              <li
                key={index}
                style={{
                  fontWeight:
                    task.path === location.pathname ? "bold" : "normal",
                }}
              >
                <Link
                  to={task.path}
                  style={{
                    textDecoration:
                      task.path === location.pathname ? "underline" : "none",
                  }}
                >
                  {task.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>TanStack Query</h2>
          <ul>
            {taskList.slice(11).map((task, index) => (
              <li
                key={index}
                style={{
                  fontWeight:
                    task.path === location.pathname ? "bold" : "normal",
                }}
              >
                <Link
                  to={task.path}
                  style={{
                    textDecoration:
                      task.path === location.pathname ? "underline" : "none",
                  }}
                >
                  {task.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div>
        <button
          className="submitButton"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Forrige Oppgave
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === taskList.length - 1}
        >
          Neste Oppgave
        </button>
      </div>

      <hr />

      <Outlet />

      <h2>Eksisterende brukere</h2>
      <ul>
        {users?.map((u) => (
          <li key={u.id}>{`${u.username} ${u.password} ${
            u?.birthday ? formatDateToDDMMYYYY(u.birthday) : ""
          }`}</li>
        ))}
      </ul>
    </div>
  );
}
