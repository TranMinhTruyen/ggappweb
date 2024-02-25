import React, { memo, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { setAlertInfoHeight } from 'common/sevices/main/mainSlice';
import { useAppDispatch } from 'app/store';

interface Props {
  children: React.ReactNode | [];
}

const AlertPopupList = (props: Props) => {
  const { children } = props;
  const ref = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ref.current) {
      dispatch(setAlertInfoHeight(ref.current.clientHeight));
    }
  }, [children]);

  return (
    <Box ref={ref} overflow={'hidden'} sx={{ maxHeight: '100px', overflowY: 'scroll' }}>
      {children}
    </Box>
  );
};
export default memo(AlertPopupList);
