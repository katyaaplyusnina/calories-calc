import { IProductResponse } from "./ProductResponse";

export interface IDailyMealsResponse {
    id: number;
    date: string;
    weight: number;
    product: IProductResponse;
}
