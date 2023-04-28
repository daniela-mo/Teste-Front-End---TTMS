import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  Typography,
} from "@mui/material";

import { useState } from "react";

import "./styled.css";

import { useAuthContext } from "../../contexts";

interface ILoginProps {
  children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isAuthenticated) return <>{children}</>;

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center">
      <Card className="cardLogin">
        <Typography variant="h4">Login</Typography>
        <CardContent className="card">
          <Input
            placeholder="E-mail"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Box width="100%" display="flex" justifyContent="center">
            <Button variant="contained" onClick={() => login("", "")}>
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
