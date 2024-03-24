import { useRoutes } from "react-router-dom";
import Main from "../screens/Main";
import Jobsite from "../screens/Jobsite";

export const dashboardRoutes = [
  {
    children: [
      { path: "/", element: <Main /> },
      { path: "/jobsite/:id", element: <Jobsite /> },
    ],
  },
];

export const Routes = () => {
  const routes = useRoutes(dashboardRoutes);

  return routes;
};
