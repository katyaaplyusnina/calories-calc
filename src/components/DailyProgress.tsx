import { Progress } from 'antd';
import React from "react";
import { IDailyMeal } from "../types/DailyMeal";
import { IProduct } from "../types/Product";

// Настройки пользователя
const userDailyGoals = {
    calories: 2000,
    protein: 120,
    fat: 70,
    carbs: 250
};

interface IDailyProgressProps {
    meals: IDailyMeal[],
    products: IProduct[],
}

const DailyProgress: React.FC<IDailyProgressProps> = ({ meals, products }: IDailyProgressProps) => {
    const calculateTotals = () => {
        return meals.reduce((totals, meal) => {
            const product = products.find(p => p.id === meal.productId);
            if (product) {
                const ratio = meal.weight / 100;
                totals.calories += (product.protein * 4 + product.fat * 9 + product.carbs * 4) * ratio;
                totals.protein += product.protein * ratio;
                totals.fat += product.fat * ratio;
                totals.carbs += product.carbs * ratio;
            }
            return totals;
        }, { calories: 0, protein: 0, fat: 0, carbs: 0 });
    };

    const totals = calculateTotals();

    return (
        <div style={{ marginTop: 24 }}>
            <h3>Дневная норма</h3>

            <div style={{ marginBottom: 16 }}>
                <h4>Калории: {Math.round(totals.calories)}/{userDailyGoals.calories}</h4>
                <Progress
                    percent={(totals.calories / userDailyGoals.calories * 100)}
                    status={totals.calories > userDailyGoals.calories ? 'exception' : 'active'}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                <div>
                    <h4>Белки: {totals.protein.toFixed(1)}/{userDailyGoals.protein}g</h4>
                    <Progress
                        percent={(totals.protein / userDailyGoals.protein * 100)}
                        strokeColor="#52c41a"
                    />
                </div>

                <div>
                    <h4>Жиры: {totals.fat.toFixed(1)}/{userDailyGoals.fat}g</h4>
                    <Progress
                        percent={(totals.fat / userDailyGoals.fat * 100)}
                        strokeColor="#faad14"
                    />
                </div>

                <div>
                    <h4>Углеводы: {totals.carbs.toFixed(1)}/{userDailyGoals.carbs}g</h4>
                    <Progress
                        percent={(totals.carbs / userDailyGoals.carbs * 100)}
                        strokeColor="#1890ff"
                    />
                </div>
            </div>
        </div>
    );
}

export default DailyProgress;
