import {Route, Routes} from "react-router-dom";
import React from "react";
import MainComponent from "../../screens/MainComponent";
import ComponentRouters from "../../common/ComponentRouters";

const componentRouter = ComponentRouters;

const RouterList = () => {
	return (
		<Routes>
			<Route key={"main"} path={"/"} element={<MainComponent/>}>
				{componentRouter.map(item => (
					item.componentChild ?
						item.componentChild.map(child => (
							<Route key={"child-router"} path={child.componentPath} element={child.componentNode} />
						)) :
						<Route key={"parent-router"} path={item.componentPath} element={item.componentNode} />
				))}
			</Route>
		</Routes>
	)
}
export default RouterList;
