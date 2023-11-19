import { createAsyncThunk } from '@reduxjs/toolkit'
import { ProductsData } from '../../../../types'

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:4000/api')
      const data: ProductsData = await response.json()
      return data
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось получить продукты')
    }
  }
)
