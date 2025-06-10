"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Table, Button, Card, Tag, message } from 'antd';
import Link from 'next/link';
import { getEquipmentById, getMaintenanceLog, getMaintenanceSchedule } from '../../../../../../../utils/getData';

export default function EquipmentMaintenancePage() {
  const router = useRouter();
  const { id } = useParams();
  const [logs, setLogs] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: 'Дата ТО',
      dataIndex: 'maintenanceDate',
      key: 'maintenanceDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Тип ТО',
      dataIndex: 'maintenanceType',
      key: 'maintenanceType',
    },
    {
      title: 'Выполнил',
      dataIndex: 'performedBy',
      key: 'performedBy',
    },
    {
      title: 'Следующее ТО',
      dataIndex: 'nextMaintenanceDate',
      key: 'nextMaintenanceDate',
      render: (date) => date ? new Date(date).toLocaleDateString() : '-',
    },
    {
      title: 'Статус',
      key: 'status',
      render: (_, record) => (
        <Tag color={(new Date(record.nextMaintenanceDate) > new Date() || (!record.nextMaintenanceDate)) ? 'green' : 'red'}>
          {(new Date(record.nextMaintenanceDate) > new Date() || (!record.nextMaintenanceDate)) ? 'Проведено' : 'Просрочено'}
        </Tag>
      ),
    },
  ];

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        getEquipmentById(id).then(setEquipment);
        getMaintenanceLog(id).then(setLogs);
        getMaintenanceSchedule(id).then(setSchedules);

      } catch (error) {
        message.error('Ошибка при загрузке данных');
      } finally {
        setLoading(false);

        console.log(logs)
      }
    };

    fetchData();
  }, [id]);

  if (!equipment) return <div>Загрузка...</div>;

  return (
    <div className='w-full h-full'>
      <div className='flex justify-start items-baseline'>
        <Link className='flex justify-center w-fit cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100' href={"/dashboard/admin/inventory/equipment"}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
            <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
      <h2 className='text-2xl font-semibold mb-6 text-[#240066] text-center'>Журнал ТО: {equipment.name} ({equipment.model})</h2>

      <Card title="График ТО" style={{ marginBottom: 32 }}>
        <ul>
          {schedules.map(schedule => (
            schedule.intervalDays &&

            <li key={schedule.id}>
              {schedule.maintenanceType}: каждые {schedule.intervalDays} дней
              (следующее: {new Date(schedule.nextMaintenanceDate).toLocaleDateString()})
            </li>

          ))}
        </ul>
        <Button
          type="primary"
          onClick={() => router.push(`maintenance/schedule/new`)}
        >
          Добавить график
        </Button>
      </Card>

      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h3 className='text-xl font-semibold ps-2  text-[#240066] text-center'>История обслуживания</h3>
        <Button
          type="primary"
          onClick={() => router.push(`maintenance/new`)}
        >
          Добавить запись о ТО
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={logs}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

