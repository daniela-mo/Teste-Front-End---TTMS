// import { Button } from "@mui/material";
import { Dashboard } from "../pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useEffect } from "react";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/pagina-inicial",
        label: "Página Inicial",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
