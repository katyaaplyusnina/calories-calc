import httpClient from './http-client';
import { IProductResponse } from '../types/ProductResponse';
import { IProduct } from '../types/Product';

const mapper = (productData: IProductResponse): IProduct => ({
    id: productData.id,
    name: productData.name,
    protein: productData.protein,
    fat: productData.fat,
    carbs: productData.carbs,
    isTrusted: productData.isTrusted,
    defaultWeight: productData.defaultWeight,
});

const ProductService = {
    getAll: async (): Promise<IProduct[]> => {
        const response = await httpClient.get('/products');

        return response.data.map(mapper);
    },
    create: async (productData: IProduct) => {
        const response = await httpClient.post('/products', productData);

        return mapper(response.data);
    },
    update: async (id: number, productData: IProduct) => {
        const response = await httpClient.put(`/products/${id}`, productData);

        return mapper(response.data);
    },
    delete: (id: number) => {
        return httpClient.delete(`/products/${id}`);
    },
};
export default ProductService;
