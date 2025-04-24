import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux';
import flowBuilderSlice, { initFlowBuilder } from "./features/flowBuilder/flowBuilderSlice";
import smartAnswerSlice, { initSmartAns } from "./features/smartAnswer/smartAnswerSlice";


/**
 * Configure the redux store
 */
const store = configureStore({
    reducer: {
        flowBuilder: flowBuilderSlice,
        smartAnswer: smartAnswerSlice,
    },
});

/**
 * Init the redux store
 */
// export const initStore = () => {
//     const dispatch = useDispatch();

//     // init flow builder
//     dispatch(initFlowBuilder());

//     // init smart answer
//     dispatch(initSmartAns());
// }

export default store;