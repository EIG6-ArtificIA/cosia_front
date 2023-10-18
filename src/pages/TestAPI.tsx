import { useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import { Department, getAllDepartments } from "../api/cosiaApi";

export const TestAPI = () => {
  const [depts, setDepts] = useState<Department[]>([]);

  const fetchDepts = () => {
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
      <Button onClick={fetchDepts}>C'est parti pour les départements !!</Button>
      <h1>Departements</h1>
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
