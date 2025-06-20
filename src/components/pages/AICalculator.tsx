import React from 'react';
import { Card, Typography, Space, Button } from 'antd';
import { RobotOutlined, ToolOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const AICalculator: React.FC = () => {
    return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                {/* Заголовок страницы */}
                <div style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    padding: '40px 24px',
                    borderRadius: '12px',
                    color: '#fff',
                    textAlign: 'center'
                }}>
                    <RobotOutlined style={{ fontSize: '64px', marginBottom: '24px' }} />
                    <Title level={2} style={{ color: '#fff', margin: 0, marginBottom: '16px' }}>
                        AI калькулятор калорий
                    </Title>
                    <Paragraph style={{ color: '#fff', fontSize: '18px', margin: 0, opacity: 0.9 }}>
                        Определяйте калорийность блюд по фотографии с помощью искусственного интеллекта
                    </Paragraph>
                </div>

                {/* Заглушка о разработке */}
                <Card style={{ textAlign: 'center' }}>
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div>
                            <ToolOutlined style={{ fontSize: '80px', color: '#faad14', marginBottom: '24px' }} />
                            <Title level={3}>Функция в разработке</Title>
                            <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
                                Мы работаем над созданием AI калькулятора калорий, который позволит определять 
                                калорийность блюд по фотографии с помощью искусственного интеллекта.
                            </Paragraph>
                        </div>

                        <div style={{ 
                            background: '#f6ffed', 
                            border: '1px solid #b7eb8f', 
                            borderRadius: '8px', 
                            padding: '20px',
                            margin: '20px 0'
                        }}>
                            <ClockCircleOutlined style={{ fontSize: '24px', color: '#52c41a', marginBottom: '12px' }} />
                            <Title level={4} style={{ color: '#52c41a', margin: '0 0 8px 0' }}>
                                Скоро будет доступно!
                            </Title>
                            <Paragraph style={{ margin: 0, color: '#666' }}>
                                Функция находится в активной разработке и скоро появится в приложении.
                            </Paragraph>
                        </div>

                        <div>
                            <Title level={4}>Что будет доступно:</Title>
                            <ul style={{ 
                                textAlign: 'left', 
                                paddingLeft: '20px', 
                                fontSize: '16px',
                                color: '#666'
                            }}>
                                <li>📸 Загрузка фотографий блюд</li>
                                <li>🤖 Автоматическое распознавание продуктов</li>
                                <li>⚖️ Определение веса и объема порций</li>
                                <li>📊 Расчет калорийности и макронутриентов</li>
                                <li>💾 Сохранение результатов в дневник питания</li>
                            </ul>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <Button type="primary" size="large" href="/daily-meals">
                                Перейти к дневнику питания
                            </Button>
                        </div>
                    </Space>
                </Card>

                {/* Дополнительная информация */}
                <Card>
                    <Title level={4}>О технологии</Title>
                    <Paragraph>
                        Наш AI калькулятор будет использовать передовые технологии компьютерного зрения 
                        и машинного обучения для анализа фотографий еды. Система сможет распознавать 
                        сотни различных продуктов и блюд, определять их размеры и рассчитывать 
                        питательную ценность.
                    </Paragraph>
                    <Paragraph style={{ marginBottom: 0 }}>
                        <Text type="secondary">
                            Следите за обновлениями приложения, чтобы быть в курсе новых функций!
                        </Text>
                    </Paragraph>
                </Card>
            </Space>
        </div>
    );
};

export default AICalculator; 