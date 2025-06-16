import {IProduct} from "../types/Product";

export default {
    getCalories: (product: IProduct) => {
        return product.protein * 4 + product.fat * 9 + product.carbs * 4;
    }
}