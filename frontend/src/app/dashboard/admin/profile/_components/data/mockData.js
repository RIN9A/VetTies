export const slotRatings = [
  {
    id: 1,
    vet: 'Иванов И.И.',
    load: 25,
    time: 9,
    gap: 45,
    rating: 0.82
  },
  {
    id: 2,
    vet: 'Смирнова Н.В.',
    load: 55,
    time: 14,
    gap: 20,
    rating: 0.55
  },
  {
    id: 3,
    vet: 'Петров А.В.',
    load: 85,
    time: 17,
    gap: 5,
    rating: 0.22
  },
  {
    id: 4,
    vet: 'Кузнецова Е.А.',
    load: 40,
    time: 11,
    gap: 30,
    rating: 0.65
  }
]


  export const mockAppointmentsByDate = {
    "2025-05-20": 5,
    "2025-05-21": 7,
    "2025-05-22": 3,
    "2025-05-23": 9,
    "2025-05-24": 4,
    "2025-05-25": 6,
    "2025-05-26": 2,
  };

  export const mockCancellationsByDate = {
    "2025-05-20": 1,
    "2025-05-21": 0,
    "2025-05-22": 1,
    "2025-05-23": 2,
    "2025-05-24": 0,
    "2025-05-25": 1,
    "2025-05-26": 1,
  };

  export const vets = [
  { id: 1, name: "Морозова Е.", specialization: "Паразитология",  schedule: {
      "Вторник": { start: 9, end: 18 },
      "Среда": { start: 9, end: 18 },
      "Четверг": { start: 9, end: 18 },
      "Суббота": { start: 14, end: 20 }
    }},
  { id: 2, name: "Федоров С.", specialization: "Хирургия",
    schedule: {
      "Вторник": { start: 9, end: 18 },
      "Среда": { start: 9, end: 18 },
      "Четверг": { start: 9, end: 18 },
      "Суббота": { start: 11, end: 17 }
    }
   },
  { id: 3, name: "Крыгина Е.", specialization: "Терапия",
    schedule: {
      "Вторник": { start: 9, end: 18 },
      "Среда": { start: 9, end: 18 },
      "Четверг": { start: 9, end: 18 },
      "Суббота": { start: 9, end: 15 }
    } },
  { id: 4, name: "Смирнова А.", specialization: "Офтальмология",
    schedule: {
      "Понедельник": { start: 9, end: 18 },
      "Вторник": { start: 8, end: 17 },
      "Четверг": { start: 9, end: 18 },
      "Воскресенье": { start: 9, end: 15 }
    }  },
  { id: 5, name: "Иванов Д.", specialization: "Кардиология",
    schedule: {
      "Вторник": { start: 9, end: 18 },
      "Среда": { start: 8, end: 17 },
      "Четверг": { start: 9, end: 18 },
      "Суббота": { start: 12, end: 18 }
    }  },
  { id: 6, name: "Ефремов М.", specialization: "Неврология",
    schedule: {
      "Понедельник": { start: 9, end: 18 },
      "Вторник": { start: 9, end: 18 },
      "Пятница": { start: 8, end: 17 },
      "Воскресенье": { start: 9, end: 15 }
    }  },
  { id: 7, name: "Егорова Е.", specialization: "Орнитология",
    schedule: {
      "Вторник": { start: 11, end: 20 },
      "Среда": { start: 9, end: 18 },
      "Четверг": { start: 9, end: 18 },
      "Суббота": { start: 13, end: 19 }
    }  },
  { id: 8, name: "Сидоров А.", specialization: "Герпетология",
    schedule: {
      "Понедельник": { start: 8, end: 17 },
      "Вторник": { start: 9, end: 18 },
      "Пятница": { start: 9, end: 18 },
      "Воскресенье": { start: 10, end: 16 }
    }  },
  { id: 9, name: "Васильева О.", specialization: "Дерматология",
    schedule: {
      "Вторник": { start: 9, end: 18 },
      "Среда": { start: 9, end: 18 },
      "Четверг": { start: 9, end: 18 },
      "Суббота": { start: 8, end: 14 }
    }  },
  { id: 10, name: "Морозов Г.", specialization: "Ортопедия",
    schedule: {
      "Понедельник": { start: 9, end: 18 },
      "Вторник": { start: 9, end: 18 },
      "Пятница": { start: 9, end: 18 },
      "Воскресенье": { start: 10, end: 16 }
    }  },
  { id: 11, name: "Крученкова Л..", specialization: "Терапия",
    schedule: {
      "Понедельник": { start: 9, end: 18 },
      "Вторник": { start: 9, end: 18 },
      "Пятница": { start: 9, end: 18 },
      "Воскресенье": { start: 9, end: 15 }
    }  },
  { id: 12, name: "Ефремова А.", specialization: "Экзотические животные",
    schedule: {
      "Понедельник": { start: 9, end: 18 },
      "Вторник": { start: 9, end: 18 },
      "Пятница": { start: 9, end: 18 },
      "Воскресенье": { start: 12, end: 18 }
    }  },
];

const tasks = [
  {
    id: "1a2b3c4d-5678-90ab-cdef-123456789abc",
    procedureName: "Вакцинация кошки (комплекс)",
    performedAt: "2023-06-15T10:00:00Z",
    statusName: "pending",
    statusId: "56b8a580-18bd-4d61-b14f-207f9581332d",
    doctorId: "doc-123",
    patient: "Барсик (кошка, 2 года)",
    notes: "Требуется предварительный осмотр"
  },
  {
    id: "5e6f7g8h-9012-34ij-klmn-567890123456",
    procedureName: "Срочная операция: заворот кишок",
    performedAt: "2023-06-15T13:30:00Z",
    statusName: "in_progress",
    statusId: "91296b37-e14f-40a8-af48-08574c58627b",
    doctorId: "doc-123",
    patient: "Рекс (собака, 5 лет)",
    notes: "Экстренный случай, готовить операционную"
  },
  {
    id: "9i0j1k2l-3456-78mn-opqr-901234567890",
    procedureName: "Плановый осмотр",
    performedAt: "2023-06-14T09:15:00Z",
    statusName: "completed",
    statusId: "3c48b11f-bb28-4c7b-8781-1d9a3f8ce3e1",
    doctorId: "doc-123",
    patient: "Мурка (кошка, 7 лет)",
    notes: "Все показатели в норме"
  },
  {
    id: "3s4t5u6v-7890-12wx-yzab-345678901234",
    procedureName: "Чистка зубов",
    performedAt: "2023-06-16T11:45:00Z",
    statusName: "canceled",
    statusId: "a791c42a-7508-4614-9c2a-7c4bd2e77a9e",
    doctorId: "doc-123",
    patient: "Шарик (собака, 3 года)",
    notes: "Перенесено по просьбе владельца"
  },
  {
    id: "7c8d9e0f-1234-56gh-ijkl-789012345678",
    procedureName: "УЗИ брюшной полости",
    performedAt: "2023-06-17T14:00:00Z",
    statusName: "pending",
    statusId: "56b8a580-18bd-4d61-b14f-207f9581332d",
    doctorId: "doc-123",
    patient: "Васька (кот, 4 года)",
    notes: "Подозрение на мочекаменную болезнь"
  }
];