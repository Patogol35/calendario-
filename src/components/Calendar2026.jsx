import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { motion, AnimatePresence } from "framer-motion";

/* =========================
   CONSTANTES
========================= */
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

const SPECIAL_DAYS = {
  "2026-01-01": "🎉 Año Nuevo",
  "2026-05-24": "🎖️ Batalla de Pichincha",
  "2026-12-25": "🎄 Navidad",
};

/* =========================
   LOGICA CALENDARIO
========================= */
function getCalendar(year, month) {
  const jsDay = new Date(year, month, 1).getDay();
  const firstDay = jsDay === 0 ? 6 : jsDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return cells;
}

const isSameDate = (y, m, d, date) =>
  d &&
  date.getFullYear() === y &&
  date.getMonth() === m &&
  date.getDate() === d;

/* =========================
   COMPONENTE
========================= */
export default function Calendar2026() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [month, setMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);

  const year = 2026;
  const today = new Date();
  const calendar = getCalendar(year, month);

  const dayName = today.toLocaleDateString("es-ES", { weekday: "long" });
  const monthName = MONTHS[today.getMonth()];

  return (
    <Box>
      {/* TITULO */}
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            background: "linear-gradient(135deg,#1e40af,#2563eb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: 1.2,
          }}
        >
          Calendario
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Autor · Jorge Patricio Santamaría Cherrez
        </Typography>
      </Box>

      <Paper
        elevation={10}
        sx={{
          maxWidth: 420,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "background.paper",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
            color: "#fff",
            p: 3,
          }}
        >
          <Typography sx={{ textTransform: "capitalize", opacity: 0.9 }}>
            {dayName} · {today.getDate()}
          </Typography>
          <Typography variant="h5" fontWeight={800}>
            {monthName} {year}
          </Typography>
        </Box>

        {/* MES */}
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

          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            size="small"
            sx={{ fontWeight: 600, minWidth: 160 }}
          >
            {MONTHS.map((m, i) => (
              <MenuItem key={i} value={i}>
                {m} {year}
              </MenuItem>
            ))}
          </Select>

          <IconButton onClick={() => setMonth(m => (m === 11 ? 0 : m + 1))}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* DIAS */}
        <Box
          px={2}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
            mb: 1,
          }}
        >
          {DAYS.map((d, i) => (
            <Typography
              key={i}
              fontSize={12}
              fontWeight={600}
              color={
                i === 6
                  ? theme.palette.error.main
                  : i === 5
                  ? theme.palette.primary.main
                  : "text.secondary"
              }
            >
              {d}
            </Typography>
          ))}
        </Box>

        {/* CALENDARIO */}
        <AnimatePresence mode="wait">
          <motion.div
            key={month}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Box
              px={2}
              pb={2}
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                rowGap: 10,
              }}
            >
              {calendar.map((day, index) => {
                const col = index % 7;
                const isSaturday = col === 5;
                const isSunday = col === 6;
                const isToday = isSameDate(year, month, day, today);
                const isSelected = day === selectedDay;

                const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const special = SPECIAL_DAYS[key];

                return (
                  <Box key={index} sx={{ height: 56, display: "flex", justifyContent: "center" }}>
                    {day && (
                      <Tooltip title={special || "Día del calendario"}>
                        <Box
                          onClick={() => setSelectedDay(day)}
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            bgcolor: isSelected
                              ? theme.palette.primary.dark
                              : isToday
                              ? theme.palette.primary.main
                              : "transparent",
                            color: isSelected || isToday
                              ? "#fff"
                              : isSunday
                              ? theme.palette.error.main
                              : isSaturday
                              ? theme.palette.primary.main
                              : theme.palette.text.primary,
                            transition: "all .2s",
                            "&:hover": {
                              bgcolor:
                                isSelected || isToday
                                  ? undefined
                                  : theme.palette.action.hover,
                            },
                          }}
                        >
                          <Typography fontSize={14}>{day}</Typography>
                          <CalendarMonthIcon sx={{ fontSize: 13, opacity: 0.8 }} />
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                );
              })}
            </Box>
          </motion.div>
        </AnimatePresence>
      </Paper>
    </Box>
  );
      }
