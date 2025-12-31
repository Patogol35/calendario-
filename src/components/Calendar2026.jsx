import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

function buildCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Domingo
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];

  // Días del mes anterior (vacíos pero visibles como números grises si se quiere)
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }

  // Días del mes actual
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrentMonth: true });
  }

  // Días del siguiente mes (opcional: rellenar hasta 6 semanas → 42 celdas)
  const totalCells = 42; // 6 semanas
  const remaining = totalCells - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, isCurrentMonth: false });
  }

  return cells;
}

export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();
  const theme = useTheme();

  const calendar = buildCalendar(year, month);

  return (
    <Box>
      {/* TÍTULO */}
      <Typography
        variant="h3"
        textAlign="center"
        fontWeight={800}
        mb={0.5}
        color="primary"
      >
        Calendario 2026
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        mb={4}
      >
        Autor: Jorge Patricio Santamaría Cherrez
      </Typography>

      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
        }}
      >
        {/* HEADER */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={3}
        >
          <IconButton
            onClick={() => setMonth((m) => (m === 0 ? 11 : m - 1))}
            size="large"
          >
            <ChevronLeftIcon fontSize="large" />
          </IconButton>

          <Typography variant="h5" fontWeight={700} sx={{ flexGrow: 1, textAlign: 'center' }}>
            {MONTHS[month]} {year}
          </Typography>

          <IconButton
            onClick={() => setMonth((m) => (m === 11 ? 0 : m + 1))}
            size="large"
          >
            <ChevronRightIcon fontSize="large" />
          </IconButton>
        </Box>

        {/* CABECERAS DE DÍAS */}
        <Grid container mb={1.5}>
          {DAYS.map((d) => (
            <Grid item xs={12 / 7} key={d}>
              <Typography
                align="center"
                fontWeight={700}
                color="text.disabled"
                sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
              >
                {d}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* CALENDARIO */}
        <Grid container spacing={0.5}>
          {calendar.map(({ day, isCurrentMonth }, index) => {
            const isToday =
              isCurrentMonth &&
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day;

            const isWeekend = index % 7 === 0 || index % 7 === 6;

            return (
              <Grid item xs={12 / 7} key={index}>
                <Box
                  sx={{
                    height: { xs: 48, sm: 64 },
                    borderRadius: 1.5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: isToday
                      ? theme.palette.primary.main
                      : isCurrentMonth
                        ? isWeekend
                          ? "rgba(0, 0, 0, 0.04)"
                          : "background.paper"
                        : "transparent",
                    color: isToday
                      ? theme.palette.primary.contrastText
                      : isCurrentMonth
                        ? theme.palette.text.primary
                        : theme.palette.text.disabled,
                    border: isToday
                      ? `2px solid ${theme.palette.primary.dark}`
                      : "none",
                    fontWeight: isToday ? 700 : isCurrentMonth ? 500 : 400,
                    fontSize: { xs: "0.9rem", sm: "1rem" },
                  }}
                >
                  {day}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
                    }
