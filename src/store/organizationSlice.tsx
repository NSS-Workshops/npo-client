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
        clearOrganization: () => initialState,  // Reset to initial state
    },
});

// Export the actions and reducer
export const { setOrganization, clearOrganization } = organizationSlice.actions;
export default organizationSlice.reducer;
