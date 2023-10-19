import { useState } from "react";
import Button from "@codegouvfr/react-dsfr/Button";
import {
  Department,
  getAllDepartments,
  getAllDepartmentsAvecHttps,
  getAllDepartmentsSansCosia,
  getAllDepartmentsSansCosiaAvecHttps,
} from "../api/cosiaApi";

export const TestAPI = () => {
  const [depts, setDepts] = useState<Department[]>([]);
  const [depts2, setDepts2] = useState<Department[]>([]);
  const [depts3, setDepts3] = useState<Department[]>([]);
  const [depts4, setDepts4] = useState<Department[]>([]);

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

  const fetchDepts2 = () => {
    console.log(process.env.REACT_APP_API_URL);
    getAllDepartmentsAvecHttps()
      .then(res => {
        console.log("Hollande");
        console.log(res);
        setDepts2(res.data);
      })
      .catch(e => console.log(e));
  };

  const fetchDepts3 = () => {
    console.log(process.env.REACT_APP_API_URL);
    getAllDepartmentsSansCosia()
      .then(res => {
        console.log("Hollande");
        console.log(res);
        setDepts3(res.data);
      })
      .catch(e => console.log(e));
  };

  const fetchDepts4 = () => {
    console.log(process.env.REACT_APP_API_URL);
    getAllDepartmentsSansCosiaAvecHttps()
      .then(res => {
        console.log("Hollande");
        console.log(res);
        setDepts4(res.data);
      })
      .catch(e => console.log(e));
  };

  return (
    <section>
      <h1>Departements</h1>
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
      <h1>Departements HTTPS</h1>
      <Button onClick={fetchDepts2}>C'est parti pour les départements !! HTTPS</Button>
      <ul>
        {depts2.map(dep => {
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
      <h1>Departements SANS COSIA</h1>
      <Button onClick={fetchDepts3}>C'est parti pour les départements !! Bis</Button>
      <ul>
        {depts3.map(dep => {
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
      <h1>Departements SANS COSIA AVEC HTTPS</h1>
      <Button onClick={fetchDepts4}>C'est parti pour les départements !! Bis</Button>
      <ul>
        {depts4.map(dep => {
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
