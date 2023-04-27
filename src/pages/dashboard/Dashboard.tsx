import { LayoutBaseDePagina } from "../../shared/layouts";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

export const Dashboard = () => {
  return (
    <LayoutBaseDePagina titulo="Página Inicial">
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container>
            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center">
                    Título
                  </Typography>

                  <Box
                    padding={6}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography variant="h1">29</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </LayoutBaseDePagina>
  );
};
