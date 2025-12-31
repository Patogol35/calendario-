import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import Calendar2026 from "./components/Calendar2026";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Calendar2026 />
      </Container>
    </ThemeProvider>
  );
}

export default App;
