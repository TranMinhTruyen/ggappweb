import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {selectStore, setStore} from "../../redux/slices/storeSlice";
import React, {memo, useEffect, useState} from "react";
import {StoreResponse} from "../../common/dto/response/StoreResponse";
import StoreApi from "../../common/api/StoreApi";
import {Checkbox, FormControl, ListItemText, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {styled} from "@mui/material/styles";
import {PaginationResponse} from "../../common/dto/response/PaginationResponse";

const CustomSelectValid = styled(FormControl)({
    background: 'rgba(210,210,210,0.8)',
    color: '#000000',
    borderRadius: 50,
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(210,210,210,0.8)',
            borderRadius: 50,
        },
        '&:hover fieldset': {
            borderColor: '#00b2ff'
        },
        '& .Mui-focused fieldset': {
            borderColor: '#007fb6'
        },
    },
    input: {
        "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px rgba(210,210,210,0.8) inset",
            borderRadius: 50,
        }
    }
});
const StoreSelect = () => {

    const dispatch = useAppDispatch();
    let storeSlice = useAppSelector(selectStore);

    const [storeSelect, setStoreSelect] = useState<StoreResponse | any>(storeSlice);
    const [storeData, setStoreData] = useState<PaginationResponse<StoreResponse>>({
        data: null,
        totalRecord: 0,
        page: 0,
        size: 0,
        totalPage: 0
    });

    useEffect(() => {
        async function getAllStore() {
            const responseData = await StoreApi.getAllStore(1);
            if (responseData.status === 200) {
                setStoreData(responseData.payload);
                dispatch(setStore(responseData.payload.data[0]));
                setStoreSelect(responseData.payload.data[0])
            }
        }
        getAllStore().then(() => {});
        // eslint-disable-next-line
    }, [])

    const handleChange = (id: number) => {
        let update = storeData.data?.find((store) => store.id === id)
        if (update !== undefined && storeData.data?.includes(update)) {
            dispatch(setStore(update));
            setStoreSelect(update);
        }
    };

    return (
        <CustomSelectValid sx={{ height: 35, width: 200 }}>
            <Select
                value={storeSelect.id !== 0 ? storeSelect.id : ''}
                onChange={(event: SelectChangeEvent) => handleChange(parseInt(event.target.value))}
                renderValue={() => "Store: " + storeSelect.storeCode}
                sx={{ height: 35, width: 200 }}
            >
                {storeData.data?.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        <Checkbox checked={item.id === storeSelect.id} />
                        <ListItemText primary={item.storeCode} />
                    </MenuItem>
                ))}
            </Select>
        </CustomSelectValid>
    )
}
export default memo(StoreSelect);