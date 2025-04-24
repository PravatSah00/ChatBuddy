import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Init smart Answer data
 */
export const initSmartAns = createAsyncThunk(
    'smartAnswer/initSmartAns',
    async ({ rejectWithValue }) => {
        return { data : chatbotLocalizer.smartAnswer || [] };
    }
);

/**
 * Create smartAnswer slice
 */
const smartAnswerSlice = createSlice({
    
    name: 'smartAnswer',
    
    initialState: {
        data:    chatbotLocalizer.smartAnswer || [],
        loading: false,
        error:   null,
    },
    
    reducers: {
        /**
         * Add question answer 
         */
        addQuestionAnswer: ( state, action ) => {
            state.data = [ ...state.data, action.payload ];
        },

        /**
         * Remove any question answer
         */
        removeQuestionAnswer: ( state, action ) => {
            state.data = state.data.filter((field) => field.id != action.payload );
        },

        /**
         * Change question answer
         */
        changeQuestionAnswer: ( state, action ) => {
            state.data = state.data.map((field) => field.id == action.payload.id ? {...field, [action.payload.key]: action.payload.value} : field );
        }
    },
    
    extraReducers: ( builder ) => {
        builder
            // Handling initFlowBuilder action
            .addCase(initSmartAns.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(initSmartAns.fulfilled, (state, action) => {
                
                const smartAnswerData = action.meta.arg;
                
                state.data     = smartAnswerData.data;
                state.loading  = false;

            })
            .addCase(initSmartAns.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload;
            })
    },
});

export const {
    addQuestionAnswer,
    removeQuestionAnswer,
    changeQuestionAnswer,
} = smartAnswerSlice.actions;

export default smartAnswerSlice.reducer;
