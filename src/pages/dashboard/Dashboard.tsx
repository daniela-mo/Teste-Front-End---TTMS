import { useEffect, useState } from "react";

import { LayoutBaseDePagina } from "../../shared/layouts";

import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

import axios from "axios";

export const Dashboard = () => {
  const [cotacao, setCotacao] = useState();

  const coinDesk = async () => {
    try {
      const res = await axios.get(
        "https://api.coindesk.com/v1/bpi/currentprice.json"
      );
      console.log(res);
      setCotacao(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    coinDesk();
  }, []);

  return (
    <LayoutBaseDePagina titulo="Página Inicial">
      <Box width="100%" display="flex">
        <Grid container margin={2}>
          <Grid item container>
            <Grid item xs={12} sm={12} md={8} lg={4} xl={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" align="center" padding={3}>
                    CoinDesk
                  </Typography>

                  <Box
                    padding={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center">
                    <Typography variant="h6">
                      Cotação: {cotacao?.bpi?.USD?.rate}
                    </Typography>
                  </Box>

                  <Box
                    padding={3}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column">
                    <Typography variant="h6">Ultima Atualização ás</Typography>
                    <Typography variant="h6">
                      {cotacao?.time?.updated.split(" ")[3]}
                    </Typography>
                    <Typography variant="body">(horário americano)</Typography>
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
