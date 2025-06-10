export const appointmentStatuses = [
  {
    id: "090856a4-223c-4f77-bb85-6b53d4f86761",
    label: "Запрошено",
    value: "Запрошено",
    color: "#BEE8FF",
    textColor: "#004E79",
  },
  {
    id: "934b0391-5044-4d1b-abcc-7ae3987acc1e",
    label: "Подтверждено",
    value: "Подтверждено",
    color: "rgba(97.11, 217.81, 130.91, 0.40)",
    textColor: "#004D15",
  },
  {
    id: "f58f6d4d-101d-4f58-8290-7e39a339f4d7",
    label: "Завершено",
    value: "Завершено",
    color: "#FFF2C7",
    textColor: "#CC5500",
  },
  {
    id: "92ebea27-593e-4497-a225-86a4f9039d9a",
    label: "Отменено",
    value: "Отменено",
    color: "#FCB8B8",
    textColor: "#710700",
  },
];


// YOU SHOULD CHANGE THE DATES OF THE EVENTS TO THE CURRENT DATE TO SEE THE EVENTS ON THE CALENDAR
export const calendarEvents = [
    {
      id: "1",
      title: "Приём у ветеринара Иванова",
      start: new Date(2025, 3, 2, 10, 0), // 2 апреля 2025, 10:00
      end: new Date(2025, 3, 2, 11, 0),   // 2 апреля 2025, 11:00
      vet_id: "vet-001",
      status_id: "090856a4-223c-4f77-bb85-6b53d4f86761", // Запрошено
    },
    {
      id: "2",
      title: "Хирургия у Сидорова",
      start: new Date(2025, 3, 3, 14, 0),
      end: new Date(2025, 3, 3, 15, 0),
      vet_id: "vet-002",
      status_id: "934b0391-5044-4d1b-abcc-7ae3987acc1e", // Подтверждено
    },
    {
      id: "3",
      title: "Вакцинация у Петрова",
      start: new Date(2025, 3, 5, 9, 0),
      end: new Date(2025, 3, 5, 9, 30),
      vet_id: "vet-003",
      status_id: "f58f6d4d-101d-4f58-8290-7e39a339f4d7", // Завершено
    },
    {
      id: "4",
      title: "Приём у Смирнова",
      start: new Date(2025, 3, 6, 16, 0),
      end: new Date(2025, 3, 6, 17, 0),
      vet_id: "vet-004",
      status_id: "92ebea27-593e-4497-a225-86a4f9039d9a", // Отменено
    },
  ];
  