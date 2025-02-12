import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { marvelAPI } from "../../API";

const initialState = {
    characters: [],
    character: {},
    comics: [],
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
            // console.log(response.data.data.results)
            return response.data.data.results;
        } catch (error) {
            return rejectWithValue(error.message);
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

export const fetchComicsByCharacterId = createAsyncThunk(
    "marvel/fetchComicsByCharacterId",
    async (characterId, { rejectWithValue }) => {
        try {
            const response = await marvelAPI.getComicsByCharacterId(characterId);
            // console.log(response.data.data.results);
            return response.data.data.results;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch comics");
        }
    }
);

const marvelSlice = createSlice({
    name: "marvel",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.characters = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })


            .addCase(fetchCharacterDetails.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCharacterDetails.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.character = action.payload;
            })
            .addCase(fetchCharacterDetails.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })


            .addCase(fetchByName.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.characters = [];
            })
            .addCase(fetchByName.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.characters = action.payload;
                state.error = null;
            })
            .addCase(fetchByName.rejected, (state, action) => {
                state.status = "failed";
                state.characters = [];
                state.error = action.payload;
            })


            .addCase(fetchComicsByCharacterId.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComicsByCharacterId.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comics = action.payload;
            })
            .addCase(fetchComicsByCharacterId.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default marvelSlice.reducer;