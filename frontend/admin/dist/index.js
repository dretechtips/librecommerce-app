"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
const App_1 = __importDefault(require("./App"));
//import * as serviceWorker from './serviceWorker';
react_dom_1.default.render(react_1.default.createElement(App_1.default, null), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
//# sourceMappingURL=index.js.map