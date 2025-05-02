import React from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from "react-redux";
import {
    addQuestionAnswer,
    removeQuestionAnswer,
    changeQuestionAnswer,
} from '../../features/smartAnswer/smartAnswerSlice';

import style from './style.module.css';

import { MaterialReactTable } from 'material-react-table';
import { IconButton, Box, TextField  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from '@mui/material/Button';

/**
 * Api call to save the smartAns
 */
const saveSmartAns = async ( smartAns ) => {
    const result = await axios.post(`${chatbotLocalizer.apiurl}/chatbuddy/save-smtans`, smartAns, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "X-WP-Nonce":    chatbotLocalizer.nonce,
        },
    });

    return result.data;
}

const SmartAnswerBuilder = () => {

    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    // Get state variable from store
    const smartAnswerState = useSelector((state) => state.smartAnswer);
    const smartAnswer = smartAnswerState.data;

    /**
     * Create new field
     */
    const getNewField = () => {
        return {
            id: uuidv4(),
            question: '',
            answer: '',
        }
    }

    /**
     * Handle add new field
     */
    const handleAddNew = () => {
        const newField = getNewField();
        dispatch(addQuestionAnswer(newField));
    }

    /**
     * Handle delete a field
     */
    const handleDeleteField = (id) => {
        dispatch(removeQuestionAnswer(id))
    }

    /**
     * Handle change question of a field
     */
    const handleChangeQuestion = (id, question) => {
        dispatch(changeQuestionAnswer({ id: id, key: 'question', value: question }));
    }

    /**
     * Handle change answer of a field
     */
    const handleChangeAnswer = (id, answer) => {
        dispatch(changeQuestionAnswer({ id: id, key: 'answer', value: answer }));
    }

    /**
     * Handle save of SmartAns
     */
    const handleSave = async () => {
        try {
            const response = await saveSmartAns({ smtans: smartAnswer });
            
            enqueueSnackbar('Successfully Saved!', { variant: 'success' });

        } catch {
            // Handle error
            enqueueSnackbar('Unable To Saved!', { variant: 'error' });
        }
    }

    const columns = [
        {
            accessorKey: 'question',
            header: 'Question / Keyword',
            Cell: ({ cell, row }) => (
                <div className={style.inputCell}>
                    <textarea
                        name='question'
                        placeholder='Question / Keyword'
                        value={cell.getValue()}
                        onChange={(e) => handleChangeQuestion(row.original.id, e.target.value)}
                    >
                        {/* Question / keyword */}
                    </textarea>
                </div>
            ),
            Filter: ({ column }) => (
                <Box sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        value={column.getFilterValue() || ''}
                        onChange={(e) => column.setFilterValue(e.target.value)}
                        placeholder="Question"
                        variant="outlined"
                        size="lerge"
                        fullWidth
                    />
                </Box>
            ),
        },
        {
            accessorKey: 'answer',
            header: 'Answer / Response',
            Cell: ({ cell, row }) => (
                <div className={style.inputCell}>
                    <textarea
                        name='question'
                        placeholder='Answer / Response'
                        value={cell.getValue()}
                        onChange={(e) => handleChangeAnswer(row.original.id, e.target.value)}
                    >
                        {/* Answer / Response */}
                    </textarea>
                </div>
            ),
            Filter: ({ column }) => (
                <Box sx={{ mt: 1, width: "100%" }}>
                    <TextField
                        value={column.getFilterValue() || ''}
                        onChange={(e) => column.setFilterValue(e.target.value)}
                        placeholder="Answer"
                        variant="outlined"
                        size="lerge"
                        fullWidth
                    />
                </Box>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            size: 10,
            Cell: ({ row }) => (
                <IconButton
                    onClick={() => handleDeleteField(row.original.id)}
                    aria-label="delete"
                >
                    <DeleteIcon color="error" />
                </IconButton>
            ),
        },
    ];

    return (
        <div className={style.smartAnswerContaienr}>
            <MaterialReactTable
                columns={columns}
                data={smartAnswer}

                enablePagination={false}
                initialState={{ showColumnFilters: true }}

                enableFullScreenToggle={false}
                enableDensityToggle={false}

                muiTableHeadCellProps={{
                    sx: {
                        color: '#17a2b8',
                        paddingBottom: '20px',
                        paddingTop: '25px',
                        backgroundColor: '#ECECEC',
                    },
                }}

                muiTopToolbarProps={{
                    sx: {
                        mb: -2, // Adds a bottom margin of theme.spacing(2)
                    },
                }}


            />
            <div className={style.buttonGroup}>
                <button
                    onClick={() => handleAddNew()}
                >
                    Add New
                </button>
                <button
                    onClick={() => handleSave()}
                >
                    Save
                </button>
            </div>
        </div>
    );
}

export default SmartAnswerBuilder;
