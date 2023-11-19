import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchProducts } from './ActionCreators'
import { ProductEdge, ProductsData } from '../../../../types'

interface ProductState {
  products: {
    edges: ProductEdge[]
  }
  isLoading: boolean
  error: string
}

const initialState: ProductState = {
  products: {
    edges: [],
  },
  isLoading: false,
  error: '',
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled.type]: (
      state,
      action: PayloadAction<ProductsData>
    ) => {
      state.isLoading = false
      state.error = ''
      state.products.edges = action.payload.products.edges
    },
    [fetchProducts.pending.type]: state => {
      state.isLoading = true
    },
    [fetchProducts.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export default productSlice.reducer
