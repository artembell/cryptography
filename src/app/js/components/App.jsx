import { hot } from "react-hot-loader/root";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main.css";
import Settings from "./Settings";

const App = () => (
	<div class="container">
		<h1>App React Component</h1>
		<button className="btn btn-success">Decipher!</button>
		<Settings />
	</div>
);

export default hot(App);
