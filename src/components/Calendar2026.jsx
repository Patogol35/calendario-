import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
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

// Semana inicia en lunes
const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

/* =========================
   LOGICA CALENDARIO
========================= */
function getCalendar(year, month) {
  const jsDay = new Date(year, month, 1).getDay(); // 0 = domingo
  const firstDay = jsDay === 0 ? 6 : jsDay - 1;    // lunes = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return cells;
}

/* =========================
   COMPONENTE
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
    <Box>
      {/* =========================
          TÍTULO
      ========================= */}
      <Typography
        variant="h3"
        fontWeight={800}
        textAlign="center"
        mb={1}
      >
        Calendario
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        mb={4}
      >
        Autor: Jorge Patricio Santamaría Cherrez
      </Typography>

      {/* =========================
          TARJETA CALENDARIO
      ========================= */}
      <Paper
        elevation={8}
        sx={{
          maxWidth: 420,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* HEADER AZUL */}
        <Box
          sx={{
            bgcolor: "#1976d2", // azul MUI
            color: "#fff",
            p: 3,
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            {year}
          </Typography>

          <Typography variant="h4" fontWeight={800}>
            {DAYS[(today.getDay() + 6) % 7]}, {today.getDate()} de{" "}
            {MONTHS[today.getMonth()].slice(0, 3)}.
          </Typography>
        </Box>

        {/* MES + FLECHAS */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1.5}
        >
          <IconButton onClick={() => setMonth(m => (m === 0 ? 11 : m - 1))}>
            <ChevronLeftIcon />
          </IconButton>

          <Typography fontWeight={600}>
            {MONTHS[month]} {year}
          </Typography>

          <IconButton onClick={() => setMonth(m => (m === 11 ? 0 : m + 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* DÍAS DE LA SEMANA */}
        <Box
          px={2}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
            mb: 1,
          }}
        >
          {DAYS.map((d) => (
            <Typography
              key={d}
              fontSize={12}
              color="text.secondary"
            >
              {d}
            </Typography>
          ))}
        </Box>

        {/* CALENDARIO */}
        <Box
          px={2}
          pb={2}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            rowGap: 8,
          }}
        >
          {calendar.map((day, i) => (
            <Box
              key={i}
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
                    bgcolor: isToday(day) ? "#1976d2" : "transparent",
                    color: isToday(day) ? "#fff" : "text.primary",
                    fontWeight: isToday(day) ? 700 : 400,
                  }}
                >
                  {day}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
