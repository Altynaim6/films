import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { marvelAPI } from "../../API";

const initialState = {
    characters: [], 
    character: {},  
    status: "idle",
    error: null,
};

export const fetchCharacters = createAsyncThunk(
    "marvel/fetchCharacters",
    async (_, { rejectWithValue }) => {
        try {
            const response = await marvelAPI.getAllCharacters();
            return response.data.data.results;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

export const fetchByName = createAsyncThunk(
    "marvel/fetchByName",
    async (name, { rejectWithValue }) => {
        try {
            const response = await marvelAPI.getByName(name);
            return response.data.data.results;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

export const fetchCharacterDetails = createAsyncThunk(
    "marvel/fetchCharacterDetails",
    async (name, { rejectWithValue }) => {
        try {
            const response = await marvelAPI.getByName(name);
            const results = response.data.data.results;
            return results.length > 0 ? results[0] : {}; 
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch data");
        }
    }
);

const marvelSlice = createSlice({
    name: "marvel",
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchCharacters.pending, (state) => {
            state.status = "loading";
        })
        addCase(fetchCharacters.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.characters = action.payload;
        })
        addCase(fetchCharacters.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });

        addCase(fetchCharacterDetails.pending, (state) => {
            state.status = "loading";
        })
        addCase(fetchCharacterDetails.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.character = action.payload;
        })
        addCase(fetchCharacterDetails.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });

        addCase(fetchByName.pending, (state) => {
            state.status = "loading";
        })
        addCase(fetchByName.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.characters = action.payload;
        })
        addCase(fetchByName.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});

export default marvelSlice.reducer;