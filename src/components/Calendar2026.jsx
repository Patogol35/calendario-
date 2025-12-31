import { useState, useEffect } from "react";
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

/* =========================
   FESTIVOS POR AÑO
========================= */
const SPECIAL_DAYS = {
  2025: {
    "01-01": "🎉 Año Nuevo",
  },
  2026: {
    "01-01": "🎉 Año Nuevo",
    "05-24": "🎖️ Batalla de Pichincha",
    "12-25": "🎄 Navidad",
  },
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

/* =========================
   COMPONENTE
========================= */
export default function Calendar() {
  const theme = useTheme();

  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  const calendar = getCalendar(year, month);

  /* =========================
     HEADER SOLO FECHA ACTUAL
  ========================= */
  const dayName = today.toLocaleDateString("es-ES", { weekday: "long" });
  const dayNumber = today.getDate();
  const monthNameToday = MONTHS[today.getMonth()];
  const yearToday = today.getFullYear();

  /* =========================
     NAVEGACION MES/AÑO
  ========================= */
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  const years = Array.from({ length: 50 }, (_, i) => year - 25 + i);

  return (
    <Box>
      <Paper
        elevation={10}
        sx={{
          maxWidth: 420,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
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
            {dayName} · {dayNumber}
          </Typography>
          <Typography variant="h5" fontWeight={800}>
            {monthNameToday} {yearToday}
          </Typography>
        </Box>

        {/* SELECTOR MES / AÑO */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={2}
          py={1.5}
        >
          <IconButton onClick={prevMonth}>
            <ChevronLeftIcon />
          </IconButton>

          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            size="small"
            sx={{ minWidth: 120, fontWeight: 600 }}
          >
            {MONTHS.map((m, i) => (
              <MenuItem key={i} value={i}>
                {m}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            size="small"
            sx={{ minWidth: 100, fontWeight: 600 }}
          >
            {years.map(y => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </Select>

          <IconButton onClick={nextMonth}>
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
          <motion.div key={`${month}-${year}`}>
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

                const special =
                  day &&
                  SPECIAL_DAYS[year]?.[
                    `${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                  ];

                return (
                  <Box key={index} sx={{ height: 56, display: "flex", justifyContent: "center" }}>
                    {day && (
                      <Tooltip title={special || ""}>
                        <Box
                          onClick={() => setSelectedDay(day)}
                          sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 2,
                            cursor: "pointer",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: selectedDay === day ? theme.palette.primary.dark : "transparent",
                            color:
                              selectedDay === day
                                ? "#fff"
                                : isSunday
                                ? theme.palette.error.main
                                : isSaturday
                                ? theme.palette.primary.main
                                : theme.palette.text.primary,
                          }}
                        >
                          <Typography fontSize={14}>{day}</Typography>
                          <CalendarMonthIcon sx={{ fontSize: 13, opacity: 0.6 }} />
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
