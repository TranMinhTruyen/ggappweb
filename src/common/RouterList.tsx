import { Route, Routes } from 'react-router-dom';
import { Suspense, memo } from 'react';
import ComponentRouters from './ComponentRouters';
import { Backdrop, CircularProgress } from '@mui/material';
import MainScreen from 'components/main/MainScreen';

const componentRouter = ComponentRouters;

const RouterList = () => {
  return (
    <Routes>
      <Route path={'/'} element={<MainScreen />}>
        {componentRouter.map(item => (
          <Route
            index={item.componentPath === '/' ? true : false}
            key={'route'}
            path={item.componentPath}
            element={
              <Suspense
                fallback={
                  <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                  </Backdrop>
                }
              >
                {item.componentNode}
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
export default memo(RouterList);
