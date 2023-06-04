import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import MainScreen from '../screens/main/MainScreen';
import ComponentRouters from './ComponentRouters';
import { Backdrop, CircularProgress } from '@mui/material';
import ErrorFallback from './ErrorFallback';

const HomeScreen = lazy(() => import('../screens/home/HomeScreen'));

const componentRouter = ComponentRouters;

const RouterList = () => {
	return (
		<ErrorFallback>
			<Routes>
				<Route
					path={'/'}
					element={<MainScreen/>}
				>
					<Route
						index
						path={'/'}
						element={
							<Suspense fallback={<Backdrop open={true}><CircularProgress color="inherit"/></Backdrop>}>
								<HomeScreen/>
							</Suspense>
						}
					/>
					{componentRouter.map(item => (
						<Route
							key={'route'}
							path={item.componentPath}
							element={
								<Suspense fallback={<Backdrop open={true}><CircularProgress color="inherit"/></Backdrop>}>
									{item.componentNode}
								</Suspense>
							}
						/>
					))}
				</Route>
			</Routes>
		</ErrorFallback>
	);
};
export default React.memo(RouterList);
