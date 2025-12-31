import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
      <Typography variant="h3" fontWeight={800} textAlign="center" mb={1}>
        Calendario
      </Typography>

      <Typography textAlign="center" color="text.secondary" mb={4}>
        Jorge Patricio Santamaría Cherrez
      </Typography>

      <Paper
        elevation={10}
        sx={{
          maxWidth: 420,
          mx: "auto",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* HEADER AZUL (NO ANDROID) */}
        <Box
          sx={{
            background: "linear-gradient(135deg,#1e3a8a,#2563eb)",
            color: "#fff",
            p: 3,
          }}
        >
          <Typography
            sx={{ textTransform: "capitalize", opacity: 0.9 }}
          >
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

          <Typography fontWeight={600}>
            {MONTHS[month]} {year}
          </Typography>

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
                rowGap: 8,
              }}
            >
              {calendar.map((day, index) => {
                const col = index % 7;
                const isWeekend = col >= 5;
                const isToday = isSameDate(year, month, day, today);
                const isSelected = day === selectedDay;

                const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const special = SPECIAL_DAYS[key];

                return (
                  <Box
                    key={index}
                    sx={{
                      height: 48,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {day && (
                      <Tooltip title={special || ""}>
                        <Box
                          onClick={() => setSelectedDay(day)}
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            bgcolor: isSelected
                              ? "#1e40af"
                              : isToday
                              ? "#2563eb"
                              : "transparent",
                            color: isSelected || isToday
                              ? "#fff"
                              : isWeekend
                              ? "#64748b"
                              : "text.primary",
                            fontWeight: isToday || isSelected ? 700 : 400,
                            position: "relative",
                          }}
                        >
                          {day}

                          {special && (
                            <Box
                              sx={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                bgcolor: "#38bdf8",
                                position: "absolute",
                                bottom: 4,
                              }}
                            />
                          )}
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
