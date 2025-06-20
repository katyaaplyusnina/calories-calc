import React from "react";
import { Card, Typography, Space, Button } from 'antd';
import { CalculatorOutlined, BarChartOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function Home() {
    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Приветственная карточка */}
                <Card style={{ textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                    <Title level={2} style={{ color: 'white', marginBottom: 16 }}>
                        Добро пожаловать в КалоТрекер! (рабочее название)🎉
                    </Title>
                    <Paragraph style={{ color: 'white', fontSize: 16, marginBottom: 0 }}>
                        Ваш персональный помощник для контроля питания и достижения здоровых целей
                    </Paragraph>
                </Card>

                {/* Описание функций */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                    <Card hoverable>
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                            <CalculatorOutlined style={{ fontSize: 48, color: '#1890ff' }} />
                            <Title level={4}>Подсчет калорий</Title>
                            <Text type="secondary" style={{ textAlign: 'center' }}>
                                Отслеживайте потребление калорий, белков, жиров и углеводов с точностью до грамма
                            </Text>
                        </Space>
                    </Card>

                    <Card hoverable>
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                            <BarChartOutlined style={{ fontSize: 48, color: '#52c41a' }} />
                            <Title level={4}>Анализ прогресса</Title>
                            <Text type="secondary" style={{ textAlign: 'center' }}>
                                Визуализируйте свой прогресс с помощью графиков и диаграмм
                            </Text>
                        </Space>
                    </Card>

                    <Card hoverable>
                        <Space direction="vertical" align="center" style={{ width: '100%' }}>
                            <UserOutlined style={{ fontSize: 48, color: '#faad14' }} />
                            <Title level={4}>Персональные цели</Title>
                            <Text type="secondary" style={{ textAlign: 'center' }}>
                                Устанавливайте индивидуальные цели и отслеживайте их достижение
                            </Text>
                        </Space>
                    </Card>
                </div>

                {/* Призыв к действию */}
                <Card style={{ textAlign: 'center' }}>
                    <Title level={3}>Готовы начать?</Title>
                    <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
                        Начните свой путь к здоровому питанию уже сегодня. Добавьте свой первый прием пищи или настройте персональные цели.
                    </Paragraph>
                    <Space size="large">
                        <Button type="primary" size="large">
                            Добавить прием пищи
                        </Button>
                        <Button size="large">
                            Настроить цели
                        </Button>
                    </Space>
                </Card>

                {/* Дополнительная информация */}
                <Card>
                    <Title level={4}>О приложении</Title>
                    <Paragraph>
                        КалоТрекер - это современное веб-приложение для контроля питания, вдохновленное FatSecret. 
                        Мы помогаем пользователям вести здоровый образ жизни, предоставляя удобные инструменты для:
                    </Paragraph>
                    <ul>
                        <li>Подсчета калорий и макронутриентов</li>
                        <li>Ведения дневника питания</li>
                        <li>Отслеживания прогресса</li>
                        <li>Установки и достижения целей</li>
                        <li>Анализа пищевых привычек</li>
                    </ul>
                </Card>
            </Space>
        </div>
    );
}

export default Home;