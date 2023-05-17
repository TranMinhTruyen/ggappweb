import {Route, Routes} from "react-router-dom";
import React, {Suspense} from "react";
import MainScreen from "../../screens/MainScreen";
import ComponentRouters from "../../common/ComponentRouters";
import {Backdrop, CircularProgress} from "@mui/material";

const componentRouter = ComponentRouters;

const RouterList = () => {
	return (
		<Routes>
			<Route key={"main"} path={"/"} element={<MainScreen/>}>
				{componentRouter.map(item => (
					<Route
						key={"router"}
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
	)
}
export default React.memo(RouterList);

