import { createAsyncThunk } from "@reduxjs/toolkit"

const createAppAsyncThunk = createAsyncThunk.withTypes<{ rejectValue: string }>()

export default createAppAsyncThunk
