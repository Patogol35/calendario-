import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

// Empieza en lunes (no Android style)
const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// Días especiales (puedes añadir más)
const SPECIAL_DAYS = {
  "1-0": "Año Nuevo",
  "25-11": "Navidad",
};

function getCalendar(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < adjustedFirstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return cells;
}

export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();

  const calendar = getCalendar(year, month);

  return (
    <Box sx={{ py: 6 }}>
      {/* TÍTULO */}
      <Typography
        variant="h2"
        fontWeight={900}
        textAlign="center"
        letterSpacing={1}
      >
        Calendario 2026
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        fontSize={16}
        mb={3}
      >
        Autor: Jorge Patricio Santamaría Cherrez
      </Typography>

      {/* FECHA DIFERENTE A ANDROID */}
      <Box textAlign="center" mb={4}>
        <Typography
          fontSize={48}
          fontWeight={800}
          color="primary.main"
        >
          2026
        </Typography>
        <Typography
          fontSize={18}
          color="text.secondary"
          letterSpacing={1}
        >
          {MONTHS[month]}, {year}
        </Typography>
      </Box>

      <Paper
        elevation={8}
        sx={{
          maxWidth: 950,
          mx: "auto",
          p: 4,
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
            onClick={() => setMonth(m => (m === 0 ? 11 : m - 1))}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Typography variant="h4" fontWeight={700}>
            {MONTHS[month]}
          </Typography>

          <IconButton
            onClick={() => setMonth(m => (m === 11 ? 0 : m + 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* DÍAS */}
        <Grid container>
          {DAYS.map(day => (
            <Grid item xs={12 / 7} key={day}>
              <Typography
                textAlign="center"
                fontWeight={700}
                color="primary.main"
                sx={{ mb: 1 }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* CALENDARIO */}
        <Grid container>
          {calendar.map((day, index) => {
            const isToday =
              day &&
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day;

            const special =
              day && SPECIAL_DAYS[`${day}-${month}`];

            return (
              <Grid item xs={12 / 7} key={index}>
                <Box
                  sx={{
                    height: 95,
                    border: "1px solid",
                    borderColor: "divider",
                    p: 1.5,
                    bgcolor: isToday
                      ? "primary.light"
                      : "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {day && (
                    <>
                      <Typography
                        fontWeight={700}
                        fontSize={16}
                        textAlign="right"
                        color={isToday ? "primary.dark" : "text.primary"}
                      >
                        {day}
                      </Typography>

                      {special && (
                        <Typography
                          fontSize={11}
                          color="primary.main"
                          fontWeight={600}
                        >
                          {special}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}
