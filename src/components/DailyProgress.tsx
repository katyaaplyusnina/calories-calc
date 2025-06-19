import { Progress } from 'antd';
import React from "react";
import { IDailyMeal } from "../types/DailyMeal";
import { IProduct } from "../types/Product";
import Utils from "../utils/Utils";
import { useSelector } from 'react-redux';
import { RootState } from '../store';

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

    return (
        <div style={{ marginTop: 24 }}>
            <h3>Дневная норма</h3>

            <div style={{ marginBottom: 16 }}>
                <h4>Калории: {Math.round(totals.calories)}/{Math.round(userDailyGoals.calories)}</h4>
                <Progress
                    percent={userDailyGoals.calories ? Math.round(totals.calories / userDailyGoals.calories * 100) : 0}
                    status={totals.calories > userDailyGoals.calories ? 'exception' : 'active'}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div>
                    <h4>Белки: {totals.protein.toFixed(1)}/{Math.round(userDailyGoals.protein)}g</h4>
                    <Progress
                        percent={userDailyGoals.protein ? Math.round(totals.protein / userDailyGoals.protein * 100) : 0}
                        strokeColor="#52c41a"
                    />
                </div>

                <div>
                    <h4>Жиры: {totals.fat.toFixed(1)}/{Math.round(userDailyGoals.fat)}g</h4>
                    <Progress
                        percent={userDailyGoals.fat ? Math.round(totals.fat / userDailyGoals.fat * 100) : 0}
                        strokeColor="#faad14"
                    />
                </div>

                <div>
                    <h4>Углеводы: {totals.carbs.toFixed(1)}/{Math.round(userDailyGoals.carbs)}g</h4>
                    <Progress
                        percent={userDailyGoals.carbs ? Math.round(totals.carbs / userDailyGoals.carbs * 100) : 0}
                        strokeColor="#1890ff"
                    />
                </div>
            </div>
        </div>
    );
}

export default DailyProgress;
