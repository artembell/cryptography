import { hot } from "react-hot-loader/root";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
    <div>
        <h1>App React Component</h1>
        <button className="btn btn-success">Push me!</button>
    </div>
);

export default hot(App);
