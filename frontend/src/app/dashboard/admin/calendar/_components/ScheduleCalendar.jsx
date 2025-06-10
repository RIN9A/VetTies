'use client';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import { DatePicker, Button, Select, Input, Alert } from 'antd';
import { postGenerate } from '../../../../../utils/postData';

const { Option } = Select;
const { RangePicker } = DatePicker;

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

const localizer = momentLocalizer(moment);

const ScheduleCalendar = () => {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 const [dateRange, setDateRange] = useState([
        moment().startOf('day'),
        moment().add(1, 'week').endOf('day')
    ]);
    const [duration, setDuration] = useState(60);
    const fetchSlots = async () => {
                if (!dateRange || dateRange.length !== 2) {
            setError('Пожалуйста, выберите диапазон дат');
            return;
        }

        setLoading(true);
        setError(null);

        postGenerate(dateRange[0].format('YYYY-MM-DD'), dateRange[1].format('YYYY-MM-DD'), duration)
        .then(
            (data) => {
                setSlots(transformSlotsForCalendar(data));
            }
        )
        .catch((err) => setError(err))
        .finally(() => setLoading(false));        
    };

const transformSlotsForCalendar = (slots) => {
    console.log(slots)
        return slots.map(slot => ({
            id: slot.id,
            title: `${slot.vet.user.lastName} - ${slot.isBooked ? 'Занято' : 'Свободно'}`,
            start: new Date(slot.startTime),
            end: new Date(slot.endTime),
            vet: slot.vet,
            isBooked: slot.isBooked,
            status: slot.isBooked ? 'ЗАНЯТО' : 'СВОБОДНО'
        }));
    };

    const eventStyleGetter = (event) => {
        let backgroundColor;
        let color;
        let borderColor;

        switch (event.status) {
            case 'ЗАНЯТО':
                backgroundColor = '#FCB8B8';
                color = '#710700';
                borderColor = '#710700';
                break;
            default: // Свободные слоты
                backgroundColor = '#E1F7E3';
                color = '#004D15';
                borderColor = '#004D15';
        }

        return {
            style: {
                backgroundColor,
                color,
                borderRadius: '4px',
                border: `1px solid ${borderColor}`,
                padding: '2px 4px',
                fontSize: '0.875rem'
            }
        };
    };

return (
        <div className="p-6">
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">Генератор расписания</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Диапазон дат</label>
                        <RangePicker
                            style={{ width: '100%' }}
                            value={dateRange}
                            onChange={setDateRange}
                            disabledDate={current => current && current < moment().startOf('day')}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Длительность слота</label>
                        <Select
                            style={{ width: '100%' }}
                            value={duration}
                            onChange={setDuration}
                        >
                            <Option value={30}>30 минут</Option>
                            <Option value={45}>45 минут</Option>
                            <Option value={60}>60 минут</Option>
                            <Option value={90}>90 минут</Option>
                        </Select>
                    </div>
                    
                    <div className="flex items-end">
                        <Button 
                            type="primary"
                            onClick={fetchSlots}
                            loading={loading}
                            icon={loading ? <p>Загрузка</p> : null}
                            style={{ width: '100%' }}
                        >
                            Сгенерировать
                        </Button>
                    </div>
                </div>
            </div>

            {error && (
                <Alert
                    message="Ошибка"
                    description={error}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setError(null)}
                    className="mb-4"
                />
            )}

            <div className="bg-white p-4 rounded-lg shadow" style={{ height: '700px' }}>
                <Calendar
                    localizer={localizer}
                    events={slots}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    views={['day', 'week', 'month']}
                    eventPropGetter={eventStyleGetter}
                    messages={{
                        today: 'Сегодня',
                        previous: 'Назад',
                        next: 'Вперед',
                        month: 'Месяц',
                        week: 'Неделя',
                        day: 'День',
                        agenda: 'Список',
                        date: 'Дата',
                        time: 'Время',
                        event: 'Событие',
                        noEventsInRange: 'Нет доступных слотов'
                    }}
                    min={new Date(0, 0, 0, 8, 0)} // 8:00 AM
                    max={new Date(0, 0, 0, 20, 0)} // 8:00 PM
                    step={60} // 15 минут
                    timeslots={1} // 4 слота в час
                    onSelectEvent={(event) => {
                        alert(`Выбран слот: ${moment(event.start).format('LLL')}\nВрач: ${event.vet.user.lastName}\nСтатус: ${event.isBooked ? 'Занят' : 'Свободен'}`);
                    }}
                />
            </div>
        </div>
    );
};

export default ScheduleCalendar;