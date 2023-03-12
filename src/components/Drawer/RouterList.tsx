import ComponentRouters from "./ComponentRouters";
import {Route, Routes} from "react-router-dom";
import React from "react";

const componentRouter = ComponentRouters;

const RouterList = () => {
	return (
		<Routes>
			{componentRouter.map(item => (
				<Route key={item.componentKey} path={item.componentPath} element={item.componentNode} />
			))}
		</Routes>
	)
}
export default RouterList;