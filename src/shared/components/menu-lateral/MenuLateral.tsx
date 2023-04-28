import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";
import { Box } from "@mui/system";
import axios from "axios";

import {
  useAppThemeContext,
  useDrawerContext,
  useAuthContext,
} from "../../contexts";
import { useEffect, useState } from "react";

interface IListItemLinkProps {
  to: string;
  icon: string;
  label: string;
  onClick: (() => void) | undefined;
}
const ListItemLink: React.FC<IListItemLinkProps> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface IMenuLateralProps {
  children: React.ReactNode;
}
export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const [pessoas, setPessoas] = useState();

  const adminUser = async () => {
    try {
      const res = await axios.get("http://localhost:3333/pessoas");
      console.log(res);
      setPessoas(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    adminUser();
  }, []);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();

  const { toggleTheme } = useAppThemeContext();
  const { logout } = useAuthContext();

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}>
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column">
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="body1" margin={2}>
              {pessoas?.nome}
            </Typography>
          </Box>

          <Divider />

          <Box flex={1}>
            <List component="nav">
              {drawerOptions.map((drawerOption) => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component="nav">
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary="Alternar tema" />
              </ListItemButton>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Icon>logout</Icon>
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
