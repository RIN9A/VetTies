"use client"
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { postMaintenanceLog } from '../../../../../../../../utils/postData';

const { Option } = Select;
const { TextArea } = Input;

export default function AddMaintenanceLog() {
  const router = useRouter();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      postMaintenanceLog({
        equipmentId: id,
        maintenanceDate: values.maintenanceDate.format('YYYY-MM-DD'),
        maintenanceType: values.maintenanceType,
        performedBy: values.performedBy,
        description: values.description,
        partsReplaced: values.partsReplaced,
        cost: values.cost,
        nextMaintenanceDate: values.nextMaintenanceDate?.format('YYYY-MM-DD'),
      }).then(() => {
        alert('Запись о ТО успешно добавлена');
        router.push(`/equipment/${id}/maintenance`);
      });

    } catch (error) {
      message.error('Ошибка при добавлении записи о ТО');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full h-full'>
      <div className='flex justify-start items-baseline'>
        <button className='flex justify-center w-fit cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100' onClick={() => router.back()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
            <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
      <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-mainBlue">Добавить запись о техническом обслуживании</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="maintenanceDate"
            label="Дата обслуживания"
            rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="maintenanceType"
            label="Тип обслуживания"
            rules={[{ required: true, message: 'Пожалуйста, выберите тип' }]}
          >
            <Select>
              <Option value="preventive">Плановое профилактическое</Option>
              <Option value="corrective">Корректирующее</Option>
              <Option value="calibration">Калибровка</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="performedBy"
            label="Выполнил"
            rules={[{ required: true, message: 'Пожалуйста, укажите исполнителя' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Описание работ"
            rules={[{ required: true, message: 'Пожалуйста, укажите описание работ' }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="partsReplaced"
            label="Замененные компоненты"
          >
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="cost"
            label="Стоимость обслуживания"
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="nextMaintenanceDate"
            label="Дата следующего ТО (если отличается от графика)"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
