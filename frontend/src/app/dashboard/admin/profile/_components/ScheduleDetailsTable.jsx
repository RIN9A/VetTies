"use client";
import React, { useState } from "react";
import { Select, Modal, Form, Input, Button, message } from "antd";
import { vets } from "./data/mockData";

const { Option } = Select;
const { TextArea } = Input;



const weekDays = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье"
];

const generateTimeSlots = (startHour, endHour) => {
  const slots = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push({
      time: `${hour}:00`,
      // Генерация случайного приоритета (0-1)
      priority: (Math.random() * 0.7 + 0.3).toFixed(2) // Приоритеты от 0.3 до 1.0
    });
  }
  return slots;
};

// Генерация расписания для каждого ветеринара
const generateVetSchedules = () => {
  const result = {};

  vets.forEach(vet => {
    result[vet.id] = {};
    
    // Для каждого дня в графике ветеринара
    Object.entries(vet.schedule).forEach(([day, { start, end }]) => {
      const daySlots = generateTimeSlots(start, end);
      
      daySlots.forEach(slot => {
        const slotId = `${vet.id}-${day}-${slot.time.replace(':', '')}`;
        
        if (!result[vet.id][day]) {
          result[vet.id][day] = [];
        }
        
        result[vet.id][day].push({
          id: slotId,
          day,
          time: slot.time,
          priority: slot.priority
        });
      });
    });
  });

  return result;
};

const vetSchedules = generateVetSchedules();
const timeRanges = [
  { id: 1, label: "Утро (8:00-12:00)", start: 8, end: 12 },
  { id: 2, label: "День (12:00-15:00)", start: 12, end: 15 },
  { id: 3, label: "Вечер (15:00-18:00)", start: 15, end: 18 }
];

// Генерация временных слотов для ветеринара
const generateVetSlots = (vet) => {
  const slots = [];
  
  Object.entries(vet.schedule).forEach(([day, { start, end }]) => {
    for (let hour = start; hour < end; hour++) {
      slots.push({
        day,
        time: `${hour}:00`,
        priority: (Math.random() * 0.7 + 0.3).toFixed(2),
        vetId: vet.id
      });
    }
  });
  
  return slots;
};

// Генерация всех расписаний
const generateAllSchedules = () => {
  const result = {};
  
  vets.forEach(vet => {
    result[vet.id] = generateVetSlots(vet);
  });
  
  return result;
};

const allVetSchedules = generateAllSchedules();

// Фильтрация слотов по выбранному диапазону времени
const filterSlotsByTimeRange = (slots, timeRange) => {
  if (!timeRange) return slots;
  
  return slots.filter(slot => {
    const hour = parseInt(slot.time.split(':')[0]);
    return hour >= timeRange.start && hour < timeRange.end;
  });
};



function getPriorityLabel(priority) {
  const num = parseFloat(priority);
  if (num >= 0.85) return "Очень высокий";
  if (num >= 0.65) return "Высокий";
  if (num >= 0.45) return "Средний";
  if (num >= 0.25) return "Низкий";
  return "Очень низкий";
}

function getRowColor(priority) {
  const num = parseFloat(priority);
  if (num >= 0.85) return "bg-green-300 ";
  if (num >= 0.65) return "bg-green-100";
  if (num >= 0.45) return "bg-yellow-100";
  if (num >= 0.25) return "bg-red-100";
  return "bg-red-200";
}

const ScheduleDetailsTable = () => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [form] = Form.useForm();


    const [selectedVet, setSelectedVet] = useState(vets[0].id);
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[0].id);
  const [currentData, setCurrentData] = useState(
    filterSlotsByTimeRange(allVetSchedules[vets[0].id], timeRanges[0])
  );



  const handleVetChange = (value) => {
    setSelectedVet(value);
    const timeRange = timeRanges.find(tr => tr.id === selectedTimeRange);
    setCurrentData(filterSlotsByTimeRange(allVetSchedules[value], timeRange));
  };

  const handleTimeRangeChange = (value) => {
    setSelectedTimeRange(value);
    const timeRange = timeRanges.find(tr => tr.id === value);
    setCurrentData(filterSlotsByTimeRange(allVetSchedules[selectedVet], timeRange));
  };




  const updateData = (vetId, timeRangeId) => {
    setCurrentData(vetSchedules[vetId][timeRangeId]);
  };

  const handleRowClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      // Здесь должна быть логика отправки данных на бэкенд
      console.log('Данные для отправки:', {
        vetId: selectedVet,
        vetName: vets.find(v => v.id === selectedVet).name,
        day: selectedSlot.day,
        time: selectedSlot.time,
        ...values
      });

      // Имитация отправки на бэкенд
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success('Задача успешно назначена!');
      setIsModalVisible(false);
    } catch (error) {
      console.error('Ошибка валидации:', error);
    }
  };

  return (
   <div className="overflow-x-auto p-4 overflow-y-scroll">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="w-full md:w-64">
            <Select
              style={{ width: "100%" }}
              value={selectedVet}
              onChange={handleVetChange}
              placeholder="Выберите ветеринара"
            >
              {vets.map((vet) => (
                <Option key={vet.id} value={vet.id}>
                  {vet.name} ({vet.specialization})
                </Option>
              ))}
            </Select>
          </div>

          <div className="w-full md:w-64">
            <Select
              style={{ width: "100%" }}
              value={selectedTimeRange}
              onChange={handleTimeRangeChange}
              placeholder="Выберите время"
            >
              {timeRanges.map((range) => (
                <Option key={range.id} value={range.id}>
                  {range.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">День недели</th>
            <th className="border px-4 py-2 text-left">Время</th>
            <th className="border px-4 py-2 text-left">Приоритет</th>
            <th className="border px-4 py-2 text-left">Интерпретация</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((slot, index) => (
            <tr
              key={index}
              className={`${getRowColor(slot.priority)} hover:bg-opacity-80 cursor-pointer`}
              onClick={() => handleRowClick(slot)}
            >
              <td className="border px-4 py-2">{slot.day}</td>
              <td className="border px-4 py-2">{slot.time}</td>
              <td className="border px-4 py-2">{slot.priority}</td>
              <td className="border px-4 py-2">
                {getPriorityLabel(slot.priority)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        title={`Назначение задачи для ${vets.find(v => v.id === selectedVet)?.name}`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Сохранить
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="День недели">
            <Input value={selectedSlot?.day} disabled />
          </Form.Item>
          <Form.Item label="Время">
            <Input value={selectedSlot?.time} disabled />
          </Form.Item>
          <Form.Item
            name="taskType"
            label="Тип задачи"
            rules={[{ required: true, message: 'Пожалуйста, выберите тип задачи' }]}
          >
            <Select placeholder="Выберите тип задачи">
              <Option value="appointment">Запись на прием</Option>
              <Option value="stationary">Работа в стационаре</Option>
              <Option value="vaccination">Вакцинация</Option>
              <Option value="surgery">Операция</Option>
              <Option value="procedure">Медицинская процедура</Option>
              <Option value="internal">Внутренний процесс</Option>
              <Option value="other">Другое</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Описание задачи"
            rules={[{ required: true, message: 'Пожалуйста, введите описание задачи' }]}
          >
            <TextArea rows={4} placeholder="Подробное описание того, что нужно сделать" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Продолжительность (часы)"
            rules={[{ required: true, message: 'Пожалуйста, укажите продолжительность' }]}
          >
            <Input type="number" min={0.5} max={8} step={0.5} />
          </Form.Item>
          <Form.Item
            name="notes"
            label="Дополнительные заметки"
          >
            <TextArea rows={2} placeholder="Любая дополнительная информация" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ScheduleDetailsTable;