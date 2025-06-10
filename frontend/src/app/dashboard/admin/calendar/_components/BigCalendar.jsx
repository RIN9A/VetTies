"use client";
import { Calendar, momentLocalizer, Views, } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useEffect, useRef, useState } from "react";
import { calendarEvents, eventsData } from '../../../../../lib/data';
import { getCalendarAppointments } from '../../../../../utils/getData';

moment.locale('ru');


const messages = {
    today: "Сегодня",
    previous: "Назад",
    next: "Вперёд",
    month: "Месяц",
    week: "Неделя",
    work_week: "Рабочая неделя",
    day: "День",
    agenda: "Повестка",
    date: "Дата",
    time: "Время",
    event: "Событие",
    noEventsInRange: "Нет событий",
};
const eventStyleGetter = (event) => {
    let backgroundColor;
    let color;

    switch (event.status) {
        case "ЗАПРОШЕНО":
            backgroundColor = "#BEE8FF";
            color = "#004E79"
            break;
        case "ПОДТВЕРЖДЕНО":
            backgroundColor = "rgba(97.11, 217.81, 130.91, 0.40)";
            color = "#004D15"

            break;
        case "ЗАВЕРШЕНО":
            backgroundColor = "#FFF2C7";
            color = "#CC5500"
            break;
        case "ОТМЕНЕНО":
            backgroundColor = "#FCB8B8";
            color = "#710700"

            break;
        default:
            backgroundColor = "#ffffff";
            color = "#0000"

    }
    return {
        style: {
            backgroundColor,
            color,
            borderRadius: "2px",
            padding: "4px",
            border: "none",
            flexWrap: "wrap",

        },
    };
};

const localizer = momentLocalizer(moment);

const BigCalendar = ({ viewProp, appointments: propAppointments }) => {
    const [internalAppointments, setInternalAppointments] = useState([]);
    const [loading, setLoading] = useState(!propAppointments); // Если проп передан, загрузка не нужна
    const [view, setView] = useState(viewProp || Views.WEEK);
    const [date, setDate] = useState(new Date()); // Добавляем состояние для текущей даты
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getCalendarAppointments();
                const validatedData = data.map(event => ({
                    ...event,
                    start: moment(event.start).toDate(),
                    end: moment(event.end).toDate()
                }));
                setInternalAppointments(validatedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Если проп не передан, загружаем данные
        if (propAppointments === undefined) {
            getData();
        } else {
            setLoading(false);
        }
    }, [propAppointments])

    const handleOnChangeView = (selectedView) => {
        setView(selectedView);
      };
      
      const handleNavigate = (newDate) => {
        setDate(newDate);
      };

      const events = propAppointments !== undefined ? propAppointments : internalAppointments;


    if (loading) return <p>Загрузка...</p>;
    if (error) return <p className="text-red-500">Ошибка: {error}</p>;


    return (
        <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            events={events}
            views={viewProp ? ["agenda"] : ["day", "week", "month", "agenda"]}
            view={view}
            style={viewProp ? { height: "25%" } : { height: "100%" }}
  onView={handleOnChangeView}
  date={date}
  onNavigate={handleNavigate}
            eventPropGetter={eventStyleGetter}
            messages={messages}
            min={new Date(2025, 0, 1, 8, 0)} // Исправленные даты
            max={new Date(2025, 11, 31, 18, 0)} // Месяцы 0-11
        />
    );
};

export default BigCalendar;