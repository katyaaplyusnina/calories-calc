import React from "react";
import { Typography, Card, Row, Col, Statistic } from "antd";
import { FireOutlined, TrophyOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

function Home() {
    return (
        <div>
            <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '32px',
                borderRadius: '12px',
                marginBottom: '24px',
                color: '#fff'
            }}>
                <Title level={2} style={{ color: '#fff', margin: 0, marginBottom: '8px' }}>
                    Добро пожаловать в Калькулятор калорий!
                </Title>
                <Paragraph style={{ color: '#fff', margin: 0, fontSize: '16px', opacity: 0.9 }}>
                    Отслеживайте свое питание, контролируйте калории и достигайте своих целей
                </Paragraph>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Сегодня съедено"
                            value={0}
                            suffix="ккал"
                            prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Цель на день"
                            value={2000}
                            suffix="ккал"
                            prefix={<TrophyOutlined style={{ color: '#52c41a' }} />}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Осталось"
                            value={2000}
                            suffix="ккал"
                            prefix={<UserOutlined style={{ color: '#1890ff' }} />}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;