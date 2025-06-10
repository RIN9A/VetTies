"use client"

import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { useState } from 'react';
import { createMaintenanceSchedule } from '../../../../../../../../../utils/postData';

const { Option } = Select;

export default function AddMaintenanceSchedulePage() {
    const router = useRouter();
    const { id } = useParams();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            createMaintenanceSchedule({
                equipmentId: id,
                maintenanceType: values.maintenanceType,
                intervalDays: values.intervalDays,
                lastMaintenanceDate: values.lastMaintenanceDate.format('YYYY-MM-DD'),
                instructions: values.instructions,
            }).then(() => {
                alert('График ТО успешно добавлен');
                router.back();

            }
            );

        } catch (error) {
            alert('Ошибка при добавлении графика ТО');
            console.log('Ошибка при добавлении графика ТО');
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
            <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-mainBlue">Добавить новый график технического обслуживания</h2>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="maintenanceType"
                        label="Тип обслуживания"
                        rules={[{ required: true, message: 'Выберите тип обслуживания' }]}
                    >
                        <Select placeholder="Выберите тип">
                            <Option value="Профилактическое ТО">Профилактическое ТО</Option>
                            <Option value="Проверка безопасности">Проверка безопасности</Option>
                            <Option value="Калибровка">Калибровка</Option>
                            <Option value="Замена расходников">Замена расходников</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="intervalDays"
                        label="Интервал (дней)"
                        rules={[{ required: true, message: 'Укажите интервал' }]}
                    >
                        <Input type="number" min={1} />
                    </Form.Item>

                    <Form.Item
                        name="lastMaintenanceDate"
                        label="Дата последнего ТО"
                        rules={[{ required: true, message: 'Укажите дату' }]}
                    >
                        <DatePicker style={{ width: '100%' }} format="DD.MM.YYYY" />
                    </Form.Item>

                    <Form.Item
                        name="instructions"
                        label="Инструкции"
                        rules={[{ required: true, message: 'Укажите инструкции' }]}
                    >
                        <Input.TextArea rows={4} />
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

