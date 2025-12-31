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

/* =========================
   CONSTANTES
========================= */
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Semana iniciando en lunes (como Google Calendar)
const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

/* =========================
   CALENDAR LOGIC (FIX)
========================= */
function getCalendar(year, month) {
  const jsDay = new Date(year, month, 1).getDay(); // 0 = domingo
  const firstDay = jsDay === 0 ? 6 : jsDay - 1;    // lunes = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];

  // Espacios vacíos antes del día 1
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }

  // Días del mes
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return cells;
}

/* =========================
   COMPONENT
========================= */
export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();

  const calendar = getCalendar(year, month);

  const isToday = (day) =>
    day &&
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  return (
    <Paper
      elevation={8}
      sx={{
        maxWidth: 420,
        mx: "auto",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* =========================
          HEADER ROJO
      ========================= */}
      <Box
        sx={{
          bgcolor: "#c62828",
          color: "#fff",
          p: 3,
        }}
      >
        <Typography variant="caption" sx={{ opacity: 0.8 }}>
          {year}
        </Typography>

        <Typography variant="h4" fontWeight={800}>
          {DAYS[(today.getDay() + 6) % 7]}, {today.getDate()} de{" "}
          {MONTHS[today.getMonth()].slice(0, 3)}.
        </Typography>
      </Box>

      {/* =========================
          MES + FLECHAS
      ========================= */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        py={1.5}
      >
        <IconButton
          size="small"
          onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Typography fontWeight={600}>
          {MONTHS[month]} {year}
        </Typography>

        <IconButton
          size="small"
          onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* =========================
          DÍAS DE LA SEMANA
      ========================= */}
      <Grid container px={2}>
        {DAYS.map((d) => (
          <Grid item xs={12 / 7} key={d}>
            <Typography
              align="center"
              fontSize={12}
              color="text.secondary"
            >
              {d}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* =========================
          CALENDARIO
      ========================= */}
      <Grid container px={2} pb={2}>
        {calendar.map((day, index) => (
          <Grid item xs={12 / 7} key={index}>
            <Box
              sx={{
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {day && (
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: isToday(day)
                      ? "#c62828"
                      : "transparent",
                    color: isToday(day)
                      ? "#fff"
                      : "text.primary",
                    fontWeight: isToday(day) ? 700 : 400,
                  }}
                >
                  {day}
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
