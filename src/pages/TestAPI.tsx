import { useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { Department, getAllDepartments } from "../api/cosiaApi";

export const TestAPI = () => {
  const [depts, setDepts] = useState<Department[]>([]);

  const fetchDepts = () => {
    console.log("Chirac");
    console.log(process.env.REACT_APP_API_URL);
    console.log(process.env);
    getAllDepartments()
      .then(res => {
        console.log("Hollande");
        console.log(res);
        setDepts(res.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <section>
      <h1>Departements</h1>
      <p>API_URL: {window._env_.API_URL}</p>
      <Button onClick={fetchDepts}>C'est parti pour les départements !!</Button>
      <ul>
        {depts.map(dep => {
          return (
            <li>
              {dep.number} - {dep.name}
              <ul>
                <li>{dep.status}</li>
                <li>{dep.geom}</li>
              </ul>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
