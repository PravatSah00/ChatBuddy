import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Init flow builder data
 */
export const initFlowBuilder = createAsyncThunk(
    'flowBuilder/initFlowBuilder',
    async ({ rejectWithValue }) => {
        return {
            nodes:    chatbotLocalizer.decisionGraph.nodes || [],
            edges:    chatbotLocalizer.decisionGraph.edges || [],
            viewport: {}
        };
    }
);

/**
 * Create flow builder slice
 */
const flowBuilderSlice = createSlice({
    
    name: 'flowBuilder',
    
    initialState: {
        nodes:    chatbotLocalizer.decisionGraph.nodes || [],
        edges:    chatbotLocalizer.decisionGraph.edges || [],
        viewport: {},
        loading:  false,
        error:    null,
    },
    
    reducers: {

        /**
         * Set nodes of graph
         */
        setGraphNodes: ( state, action ) => {
            state.nodes = action.payload;
        },

        /**
         * Set edges of graph
         */
        setGraphEdges: ( state, action ) => {
            state.edges = action.payload
        },

        /**
         * Set viewport of graph
         */
        setGraphViewPort: ( state, action ) => {
            state.viewport = action.payload;
        },
    },
    
    extraReducers: ( builder ) => {
        builder
            // Handling initFlowBuilder action
            .addCase(initFlowBuilder.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(initFlowBuilder.fulfilled, (state, action) => {
                
                const flowGraphData = action.meta.arg;
                
                state.nodes    = flowGraphData.nodes,
                state.edges    = flowGraphData.edges,
                state.viewport = flowGraphData.viewport
                state.loading  = false;

            })
            .addCase(initFlowBuilder.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload;
            })
    },
});

export const {
    setGraphNodes,
    setGraphEdges,
    setGraphViewPort,
} = flowBuilderSlice.actions;

export default flowBuilderSlice.reducer;