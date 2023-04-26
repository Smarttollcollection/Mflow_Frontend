import React, { useEffect } from "react";
import "./Home.css";
import MenuAppBar from "./MenuAppBar";
import InformationTable from "../components/InformationTable";
// import AppBar from "@mui/material/AppBar";
// import CameraIcon from "@mui/icons-material/PhotoCamera";
import CssBaseline from "@mui/material/CssBaseline";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Grid } from "@mui/material";
// import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

export default function Home() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3333/authen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          // alert('authen Success')
        } else {
          alert("authen failed");
          localStorage.removeItem("token");
          window.location = "/login";
        }
        console.log("Success:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <AppBar position="relative" className="appbar">
        <Toolbar className="appbarContent">
          
          <Typography variant="h6" color="inherit" noWrap>
            M-Flow
          </Typography>
          <Grid>
            <Link onClick={handleLogout}>logout</Link>
          </Grid>
        </Toolbar>
      </AppBar> */}
      <MenuAppBar />
      <main>
        {/* Hero unit */}

        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Card>
            <CardContent
              component="form"
              sx={{ "& > :not(style)": { m: 1.5, width: "16.2vw" } }}
              autoComplete="off"
            >
              <TextField id="plate2" label="PLATE 1" variant="outlined" />
              <TextField id="plate2" label="PLATE 2" variant="outlined" />
              <TextField id="province" label="PROVINCE" variant="outlined" />
            </CardContent>
            <CardContent
              component="form"
              sx={{ "& > :not(style)": { m: 1.5, width: "25vw" } }}
              autoComplete="off"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </CardContent>
            <CardActions className="cardActionbut">
              <Button variant="outlined" color="primary">
                SEARCH
              </Button>
              <Button variant="outlined" color="error">
                RESET
              </Button>
            </CardActions>
          </Card>
        </Container>
        <CardContent>
          <Grid className="containerData">
            <Grid className="textData">
              <a>Data Table</a>
            </Grid>
            <InformationTable />
          </Grid>
        </CardContent>
      </main>
      {/* Footer */}

      {/* End footer */}
    </ThemeProvider>
  );
}
