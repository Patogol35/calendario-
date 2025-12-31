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

const months = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const getMonthData = (year, month) => {
  const jsDay = new Date(year, month, 1).getDay();
  const firstDay = jsDay === 0 ? 6 : jsDay - 1;
  const totalDays = new Date(year, month + 1, 0).getDate();
  return { firstDay, totalDays };
};

export default function Calendar2026() {
  const [month, setMonth] = useState(0);
  const year = 2026;
  const today = new Date();

  const { firstDay, totalDays } = getMonthData(year, month);

  return (
    <Box>
      {/* TÍTULO */}
      <Typography variant="h3" textAlign="center" fontWeight={800} mb={1}>
        📅 Calendario 2026
      </Typography>

      {/* AUTOR */}
      <Typography
        textAlign="center"
        color="text.secondary"
        mb={4}
      >
        Autor: Jorge Patricio Santamaría Cherrez
      </Typography>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 900,
          mx: "auto",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER MES */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <IconButton onClick={() => setMonth(m => (m === 0 ? 11 : m - 1))}>
            <ChevronLeftIcon />
          </IconButton>

          <Typography variant="h4" fontWeight={700}>
            {months[month]} {year}
          </Typography>

          <IconButton onClick={() => setMonth(m => (m === 11 ? 0 : m + 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* DÍAS */}
        <Grid container>
          {days.map(day => (
            <Grid item xs={12 / 7} key={day}>
              <Typography
                textAlign="center"
                fontWeight={600}
                color="text.secondary"
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* CALENDARIO */}
        <Grid container mt={1}>
          {[...Array(firstDay)].map((_, i) => (
            <Grid item xs={12 / 7} key={`empty-${i}`} />
          ))}

          {[...Array(totalDays)].map((_, i) => {
            const dayNumber = i + 1;
            const isToday =
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === dayNumber;

            return (
              <Grid item xs={12 / 7} key={dayNumber}>
                <Box
                  sx={{
                    height: 80,
                    border: "1px solid rgba(0,0,0,0.08)",
                    p: 1,
                    display: "flex",
                    justifyContent: "flex-end",
                    bgcolor: isToday ? "primary.main" : "transparent",
                    color: isToday ? "#000" : "inherit",
                    transition: "0.2s",
                    "&:hover": {
                      bgcolor: isToday
                        ? "primary.main"
                        : "action.hover",
                    },
                  }}
                >
                  <Typography fontWeight={600}>
                    {dayNumber}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </Box>
  );
}
