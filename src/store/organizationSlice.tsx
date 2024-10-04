// src/store/organizationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrganizationState {
    id: number | null;
    name: string;
    website: string;
    address: string;
    city: string;
    state: string;
    user: number | null;  // ID of the associated user
}

const initialState: OrganizationState = {
    id: null,
    name: '',
    website: '',
    address: '',
    city: '',
    state: '',
    user: null,
};

const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        setOrganization: (state, action: PayloadAction<OrganizationState>) => {
            return { ...action.payload };  // Set the organization state to the payload
        },
        // New reducer for dynamically updating organization fields
        updateOrgField: (state, action: PayloadAction<{ field: keyof OrganizationState; value: string }>) => {
            state[action.payload.field] = action.payload.value;
        },
        clearOrganization: () => initialState,  // Reset to initial state
    },
});

// Export the actions and reducer
export const { setOrganization, updateOrgField, clearOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
