import { hot } from "react-hot-loader/root";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.css";
import Settings from "./Settings";

const App = () => (
	<div className="container">
		<Settings />
	</div>
);

export default hot(App);
