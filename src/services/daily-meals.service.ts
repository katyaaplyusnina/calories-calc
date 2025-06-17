import httpClient from './http-client';
import { IDailyMealsResponse } from '../types/DailyMealsResponse';
import { IDailyMeal } from '../types/DailyMeal';

const mapper = (meal: IDailyMealsResponse): IDailyMeal => ({
    id: meal.id,
    date: meal.date,
    weight: meal.weight,
    productId: meal.product.id,
});

const DailyMealsService = {
    getByDate: async (date: string): Promise<IDailyMeal[]> => {
        const response = await httpClient.get(`/entries?date=${date}`);

        return response.data.map(mapper);
    },
    create: async (meal: IDailyMeal) => {
        const response = await httpClient.post('/entries', meal);

        return mapper(response.data);
    },
    delete: (id: number) => {
        return httpClient.delete(`/entries/${id}`);
    },
};
export default DailyMealsService;
