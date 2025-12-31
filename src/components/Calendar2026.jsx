import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS_SHORT = ["D", "L", "M", "M", "J", "V", "S"]; // D L M M J V S

function buildCalendar(year, month) {
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0=Domingo, 6=Sábado
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  // Rellenar con espacios vacíos hasta el primer día del mes
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(null);
  }

  // Agregar los días del mes
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return cells;
}

export default function Calendar2026() {
  const [month, setMonth] = useState(0); // Enero por defecto
  const year = 2026;
  const today = new Date();

  const calendar = buildCalendar(year, month);

  // Función para saber si un día es hoy
  const isToday = (day) => {
    return (
      day &&
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  // Formatear fecha actual para encabezado rojo
  const todayFormatted = today.toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).replace(".", "").replace(",", "");

  return (
    <Box sx={{ p: 2, maxWidth: 400, mx: "auto" }}>
      {/* ENCABEZADO ROJO */}
      <Box
        sx={{
          bgcolor: "#d32f2f", // Rojo como en tu ejemplo
          color: "white",
          p: 2,
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={500}>
          {today.getFullYear()}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {todayFormatted}
        </Typography>
      </Box>

      {/* CALENDARIO */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: "0 0 8px 8px",
          bgcolor: "background.paper",
          border: "1px solid #e0e0e0",
        }}
      >
        {/* HEADER DE MES */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <IconButton onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}>
            <ChevronLeftIcon />
          </IconButton>

          <Typography variant="h6" fontWeight={600}>
            {MONTHS[month]} de {year}
          </Typography>

          <IconButton onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* CABECERA DE DÍAS */}
        <Grid container spacing={0.5} mb={1}>
          {DAYS_SHORT.map((d, i) => (
            <Grid item xs={12 / 7} key={i}>
              <Typography
                align="center"
                fontSize="0.9rem"
                color="text.secondary"
                fontWeight={600}
              >
                {d}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* CUADRÍCULA DE DÍAS */}
        <Grid container spacing={0.5}>
          {calendar.map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              <Box
                sx={{
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1,
                  bgcolor: isToday(day)
                    ? "#1976d2" // Azul como en tu ejemplo si quieres resaltar hoy
                    : "transparent",
                  color: isToday(day)
                    ? "white"
                    : "text.primary",
                  fontWeight: isToday(day) ? 700 : 400,
                }}
              >
                {day && <Typography>{day}</Typography>}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
