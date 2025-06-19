import { Progress, Card, Typography, Row, Col, Statistic } from 'antd';
import React from "react";
import { IDailyMeal } from "../types/DailyMeal";
import { IProduct } from "../types/Product";
import Utils from "../utils/Utils";
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FireOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface IDailyProgressProps {
    meals: IDailyMeal[],
    products: IProduct[],
}

const DailyProgress: React.FC<IDailyProgressProps> = ({ meals, products }: IDailyProgressProps) => {
    const userSettings = useSelector((state: RootState) => state.userSettings.data);

    const userDailyGoals = userSettings
        ? Utils.getDetailed(userSettings)
        : { calories: 0, fat: 0, carbs: 0, protein: 0 };

    const calculateTotals = () => {
        return meals.reduce((totals, meal) => {
            const product = products.find(p => p.id === meal.productId);
            if (product) {
                const ratio = meal.weight / 100;
                totals.calories += Utils.getCalories(product) * ratio;
                totals.protein += product.protein * ratio;
                totals.fat += product.fat * ratio;
                totals.carbs += product.carbs * ratio;
            }
            return {
                calories: Math.round(totals.calories),
                protein: Math.round(totals.protein),
                fat: Math.round(totals.fat),
                carbs: Math.round(totals.carbs),
            };
        }, { calories: 0, protein: 0, fat: 0, carbs: 0 });
    };

    const totals = calculateTotals();
    const caloriesPercent = userDailyGoals.calories ? Math.round(totals.calories / userDailyGoals.calories * 100) : 0;
    const proteinPercent = userDailyGoals.protein ? Math.round(totals.protein / userDailyGoals.protein * 100) : 0;
    const fatPercent = userDailyGoals.fat ? Math.round(totals.fat / userDailyGoals.fat * 100) : 0;
    const carbsPercent = userDailyGoals.carbs ? Math.round(totals.carbs / userDailyGoals.carbs * 100) : 0;

    return (
        <div style={{ marginTop: 32 }}>
            <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '24px',
                color: '#fff'
            }}>
                <Title level={3} style={{ color: '#fff', margin: 0, marginBottom: '8px' }}>
                    Дневная норма
                </Title>
                <Text style={{ color: '#fff', opacity: 0.9 }}>
                    Отслеживайте прогресс по калориям и макронутриентам
                </Text>
            </div>

            <Card style={{ marginBottom: 24 }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col xs={24} sm={8}>
                        <Statistic
                            title="Калории"
                            value={totals.calories}
                            suffix={`/ ${Math.round(userDailyGoals.calories)} ккал`}
                            prefix={<FireOutlined style={{ color: '#ff4d4f' }} />}
                            valueStyle={{ color: '#ff4d4f' }}
                        />
                    </Col>
                    <Col xs={24} sm={16}>
                        <Progress
                            percent={caloriesPercent}
                            status={totals.calories > userDailyGoals.calories ? 'exception' : 'active'}
                            strokeColor="#ff4d4f"
                        />
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Белки"
                            value={totals.protein}
                            suffix={`/ ${Math.round(userDailyGoals.protein)}г`}
                            valueStyle={{ color: '#52c41a' }}
                        />
                        <Progress
                            percent={proteinPercent}
                            strokeColor="#52c41a"
                            showInfo={false}
                            style={{ marginTop: 8 }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Жиры"
                            value={totals.fat}
                            suffix={`/ ${Math.round(userDailyGoals.fat)}г`}
                            valueStyle={{ color: '#faad14' }}
                        />
                        <Progress
                            percent={fatPercent}
                            strokeColor="#faad14"
                            showInfo={false}
                            style={{ marginTop: 8 }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={8}>
                    <Card>
                        <Statistic
                            title="Углеводы"
                            value={totals.carbs}
                            suffix={`/ ${Math.round(userDailyGoals.carbs)}г`}
                            valueStyle={{ color: '#1890ff' }}
                        />
                        <Progress
                            percent={carbsPercent}
                            strokeColor="#1890ff"
                            showInfo={false}
                            style={{ marginTop: 8 }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default DailyProgress;
