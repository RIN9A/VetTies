"use client"
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { getEquipmentById } from '../../../../../../../utils/getData';
import { updateEquipment } from '../../../../../../../utils/putData';
import moment from 'moment';

const { Option } = Select;

export default function EditEquipment() {
    const router = useRouter();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [equipment, setEquipment] = useState(null);

    useEffect(() => {
        if (!id) return;


                setLoading(true);

                getEquipmentById(id).then((data) => {
                    setEquipment(data);
                    console.log(data)
                    form.setFieldsValue({
                        ...data,
                        purchaseDate: data.purchaseDate ? moment(data.purchaseDate) : null,
                    });
                }
                ).catch((e) => {
                    console.log("Ошибка при загрузке данных" + e)
                }).finally(() => {
                    setLoading(false);
                })

    }, [id, form]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            updateEquipment(id, {
                ...values,
                purchaseDate: values.purchaseDate?.format('YYYY-MM-DD'),
            });
            alert('Оборудование успешно обновлено');
        } catch (error) {
            alert('Ошибка при обновлении оборудования');
        } finally {
            setLoading(false);
        }
    };

    if (!equipment) return <div>Загрузка...</div>;

    return (
    <div className='w-full h-full'>
         <div className='flex justify-start items-baseline'>
        <button className='flex justify-center w-fit cursor-pointer rounded-full px-1.5 py-2  hover:bg-gray-100' onClick={() => router.back()}>
          <svg  xmlns="http://www.w3.org/2000/svg" width="36" height="24" fill="none" viewBox="0 0 36 24">
            <path stroke='#000' strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M26.917 12H7.083M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
            <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-mainBlue">Редактирование оборудования</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={equipment}
            >
                <Form.Item
                    name="name"
                    label="Название оборудования"
                    rules={[{ required: true, message: 'Введите название' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="model"
                    label="Модель"
                    rules={[{ required: true, message: 'Введите модель' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="serialNumber"
                    label="Серийный номер"
                    rules={[{ required: true, message: 'Введите серийный номер' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="purchaseDate"
                    label="Дата приобретения"
                >
                    <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
                </Form.Item>

                <Form.Item
                    name="location"
                    label="Местоположение"
                    rules={[{ required: true, message: 'Укажите местоположение' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="manufacturer"
                    label="Производитель"
                    rules={[{ required: true, message: 'Укажите производителя' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Статус"
                    rules={[{ required: true, message: 'Выберите статус' }]}
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
                    <Button
                        style={{ marginLeft: 8 }}
                        onClick={() => router.back()}
                    >
                        Отмена
                    </Button>
                </Form.Item>
            </Form>
        </div>
        </div>
    );
};

