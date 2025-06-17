import { IProduct } from './Product';

export interface IDailyMeal {
  id: number,
  weight: number,
  product: IProduct,
  date: string,
}
