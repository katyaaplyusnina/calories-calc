import { IProduct } from '../types/Product';
import { IUserSettings } from "../types/UserSettings";
import { IUserGoals } from "../types/UserGoals";

export default {
    getCalories: (product: IProduct) => {
        return product.protein * 4 + product.fat * 9 + product.carbs * 4;
    },

    getDetailed: (settings: IUserSettings): IUserGoals => {
        const BMR = 9.99 * settings.weight + 6.25 * settings.height - 4.92 * settings.age
            + (settings.gender === 'male' ? 5 : -161);

        let calories = BMR * settings.activityLevel;

        if (settings.goal === 'loss') {
            calories *= 0.8
        }

        if (settings.goal === 'gain') {
            calories *= 1.2;
        }

        calories = Math.round(calories);
        const protein = Math.round(settings.weight * 2);
        const fat = Math.round(settings.weight);
        const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);

        return {
            calories,
            protein,
            fat,
            carbs,
        };
    },
};
