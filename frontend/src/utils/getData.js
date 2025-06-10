import { getSession } from "next-auth/react";
import { getServerAuthSession } from "./auth";


export const BASE_URL = "http://localhost:8080";

async function fetchWithAuth(path, options = {}) {
    const session = await getSession();
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session?.user?.accessToken || ""}`,
        ...options.headers,
    };
    try {
        const response = await fetch(`${BASE_URL}${path}`, {
            ...options,
            headers,
            method: "GET",
        });

        if (!response.ok) {
            throw new Error(`Error fetching ${path}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Request failed: ${path}`, error);
        return { error: error.message };
    }
}

export const getSlots = (id) => fetchWithAuth(`/api/schedule/slots?veterinarianId=${id}`);

export const getWorkingHoursByVet = (id) => fetchWithAuth(`/vets/${id}/working-hours`);

export const getMedications = () => fetchWithAuth("/medications");

export const getMedicationById = (id) => fetchWithAuth(`/medications/${id}`);


export const getMedicationsTypes = () => fetchWithAuth("/medications/types");

export const getVets = () => fetchWithAuth("/vets");

export const getVetsById = (id) => fetchWithAuth(`/vets/${id}`);

export const getUserById = (id) => fetchWithAuth(`/users/${id}`);

export const getPatients = () => fetchWithAuth("/pets");
export const getEquipment = () => fetchWithAuth('/api/equipment');
export const getEquipmentById = (id) => fetchWithAuth(`/api/equipment/${id}`);
export const getAppointmentsByClient  = (id) => fetchWithAuth(`/appointments/owner/${id}`)
export const getMaintenanceLog = (id) => fetchWithAuth(`/api/maintenance/log/equipment/${id}`);
export const getMaintenanceSchedule = (id) => fetchWithAuth(`/api/maintenance/schedule/${id}`);

export const getPatientById = (id) => fetchWithAuth(`/pets/${id}`);

export const getAppointments = () => fetchWithAuth("/appointments");

export const getUsersByRole = (role) => fetchWithAuth(`/users/roles/${role}`);

export const getVetsBySpec = (spec) => fetchWithAuth(`/vets/specializations/${spec}`);

export const getUserProfile = (id) => fetchWithAuth(`/vets/${id}`);

export const getFreeSlots = (vetId) => fetchWithAuth(`/appointments/vets/${vetId}/free-slots`);

export const getPetsByOwner = (ownerID) => fetchWithAuth(`/pets/owners/${ownerID}`);

export const  getMedicalRecordsByPetId = (petId) => fetchWithAuth(`/records/pet/${petId}`);

export const getCalendarAppointments = async () => {
    const data = await fetchWithAuth("/appointments");
    if (data.error) return data;

    return data.map(item => {
        const startDate = new Date(item.appointmentTime);
        const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

        return {
            id: item.id,
            title: `${item?.vetDto?.user.lastName} ${item?.vetDto?.user.firstName?.[0]}. - ${item.name}`,
            start: startDate,
            end: endDate,
            vet_id: item.vetDto.id,
            status: item.status,
            originalData: item,
        };
    });
};

export const getAppointmentsByEmployee = async (id) => {
    const data = await fetchWithAuth(`/appointments/employee/${id}`);
    if (data.error) return data;

    return data.map(item => {
        const start = new Date(item.appointmentTime);
        const end = new Date(start.getTime() + 60 * 60 * 1000);

        return {
            id: item.id,
            title: item.name,
            start,
            end,
            pet_id: item.petDto.id,
            status: item.status,
            originalData: item,
        };
    });
};



export const getDoctorTasks = async (employeeId) => {
  // В реальном приложении здесь был бы fetch к API
  console.log("Fetching tasks for doctor:", employeeId);
  
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Возвращаем mock-данные
  // return mockTasks.filter(task => task.doctorId === employeeId);
    return mockTasks;

};

const mockTasks = [
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