import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    id: number | null;
    name: string;
    description: string;
    repository_url: string;
    organization: number | null;  // ID of the associated organization
    user: number | null;  // ID of the user creating the project
}

const initialState: ProjectState = {
    id: null,
    name: '',
    description: '',
    repository_url: '',
    organization: null,
    user: null,
};

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setProject: (state, action: PayloadAction<ProjectState>) => {
            return { ...action.payload };  // Set the project state to the payload
        },
        updateProjectField: (state, action: PayloadAction<{ field: keyof ProjectState; value: string }>) => {
            state[action.payload.field] = action.payload.value;  // Dynamically update fields
        },
        clearProject: () => initialState,  // Reset to initial state
    },
});

export const { setProject, updateProjectField, clearProject } = projectSlice.actions;
export default projectSlice.reducer;
