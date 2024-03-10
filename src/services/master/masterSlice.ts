import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IMasterResponse } from 'common/dto/response/MasterResponse';

interface IMasterState {
    authorityMaster: IMasterResponse[];
    roleMaster: IMasterResponse[];
    positionMaster: IMasterResponse[];
    levelMaster: IMasterResponse[];
}

const initialState: IMasterState = {
    authorityMaster: [],
    levelMaster: [],
    positionMaster: [],
    roleMaster: [],
};

export const masterSlice = createSlice({
    name: 'master',
    initialState,
    reducers: {
        setAuthorityMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
            return {
                ...state,
                authorityMaster: action.payload,
            };
        },
        setRoleMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
            return {
                ...state,
                roleMaster: action.payload,
            };
        },
        setPositionMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
            return {
                ...state,
                positionMaster: action.payload,
            };
        },
        setLevelMaster: (state, action: PayloadAction<IMasterResponse[]>) => {
            return {
                ...state,
                levelMaster: action.payload,
            };
        },
    },
});

export const { setAuthorityMaster, setRoleMaster, setPositionMaster, setLevelMaster } =
    masterSlice.actions;

export const selectAuthorityMaster = (state: RootState) => state.masterState.authorityMaster;
export const selectRoleMaster = (state: RootState) => state.masterState.roleMaster;
export const selectPositionMaster = (state: RootState) => state.masterState.positionMaster;
export const selectLevelMaster = (state: RootState) => state.masterState.levelMaster;

export default masterSlice.reducer;
