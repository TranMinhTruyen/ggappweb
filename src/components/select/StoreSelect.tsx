import StoreService from 'common/sevices/store/storeService';
import {
    selectStoreId,
    selectStoreOption,
    setStoreId,
    setStoreOption,
} from 'common/sevices/store/storeSlice';
import SelectField, { toOptions } from 'components/SelectField';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/store';
import { useForm } from 'react-hook-form';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

interface IStoreSelect {
    storeSelect: number;
}

const StoreSelect = () => {
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(0);
    const { control, getValues } = useForm<IStoreSelect>();
    const storeOptions = useAppSelector(selectStoreOption);
    const storeId = useAppSelector(selectStoreId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchGetAllStore = async () => {
        const responseData = await StoreService.getAllStore(page);
        if (responseData?.status === 200) {
            setTotalPage(responseData.payload.totalPage);
            const selectData = toOptions(responseData.payload.data, {
                valueKey: 'id',
                labelKey: 'storeCode',
                setData: true,
            });
            if (page === 1) {
                dispatch(setStoreOption(selectData));
            } else {
                dispatch(setStoreOption([...storeOptions, ...selectData]));
            }
            if (sessionStorage.getItem('storeSelect') === null) {
                dispatch(setStoreId(1));
            } else {
                const storeId = JSON.parse(sessionStorage.getItem('storeSelect') || '1');
                dispatch(setStoreId(storeId));
            }
        }
    };

    useEffect(() => {
        fetchGetAllStore().then(() => {});
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
    }, [fetchGetAllStore, page]);

    const onMenuScroll = () => {
        if (totalPage !== 0 && totalPage > page) {
            setPage((prevState: number) => prevState + 1);
        }
    };

    const handleChange = () => {
        const value = getValues().storeSelect;
        if (value !== undefined) {
            dispatch(setStoreId(value));
        }
    };

    return (
        <SelectField
            name={'storeSelect'}
            control={control}
            options={storeOptions}
            defaultValue={storeId}
            renderPlaceholder={'Store:'}
            selectOnChange={handleChange}
            MenuProps={{
                PaperProps: {
                    style: {
                        marginTop: 10,
                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                        width: 250,
                    },
                    onScroll: (event: { currentTarget: any }) => {
                        const current = event.currentTarget;
                        if (current.scrollTop + current.clientHeight >= current.scrollHeight) {
                            onMenuScroll();
                        }
                    },
                },
            }}
        />
    );
};
export default StoreSelect;
