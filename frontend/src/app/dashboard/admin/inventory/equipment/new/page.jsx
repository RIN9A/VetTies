"use client"
import { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const { Option } = Select;

export default function AddEquipment() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      setLoading(true);
    //   await api.post('/api/equipment', {
    //     ...values,
    //     purchaseDate: values.purchaseDate.format('YYYY-MM-DD'),
    //   });
      message.success('Оборудование успешно добавлено');
      router.push('/equipment');
    } catch (error) {
      message.error('Ошибка при добавлении оборудования');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className='w-full h-full'>
         <div className='flex justify-start items-baseline'>
        <Link className='flex justify-center w-fit cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100' href={"/dashboard/admin/inventory/equipment"}>
          <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
            <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
          </svg>
        </Link>
      </div>
            <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md">

            <h1 className="text-2xl font-semibold mb-6 text-mainBlue">Добавить новое оборудование</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Название оборудования"
          rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="model"
          label="Модель"
          rules={[{ required: true, message: 'Пожалуйста, введите модель' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="serialNumber"
          label="Серийный номер"
          rules={[{ required: true, message: 'Пожалуйста, введите серийный номер' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="purchaseDate"
          label="Дата приобретения"
          rules={[{ required: true, message: 'Пожалуйста, выберите дату' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="location"
          label="Местоположение"
          rules={[{ required: true, message: 'Пожалуйста, укажите местоположение' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="manufacturer"
          label="Производитель"
          rules={[{ required: true, message: 'Пожалуйста, укажите производителя' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="status"
          label="Статус"
          initialValue="active"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="active">Активно</Option>
            <Option value="maintenance">На обслуживании</Option>
            <Option value="out_of_order">Неисправно</Option>
          </Select>
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

