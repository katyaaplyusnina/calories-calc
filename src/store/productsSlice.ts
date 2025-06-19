import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/Product';
import ProductService from '../services/product.service';

interface ProductsState {
  items: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ProductService.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка загрузки продуктов');
    }
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (product: IProduct, { rejectWithValue }) => {
    try {
      const data = await ProductService.create(product);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка добавления продукта');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, product }: { id: number, product: IProduct }, { rejectWithValue }) => {
    try {
      const data = await ProductService.update(id, product);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка обновления продукта');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await ProductService.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Ошибка удаления продукта');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        const idx = state.items.findIndex(p => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      });
  },
});

export default productsSlice.reducer; 