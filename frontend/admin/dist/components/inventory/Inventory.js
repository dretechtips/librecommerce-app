"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Actions_1 = require("../layouts/Actions");
const Add_1 = require("./Add");
const Search_1 = require("./Search");
class Inventory extends react_1.Component {
    constructor(props) {
        super(props);
        this._actions = [
            { name: "Add Product", icon: "fas fa-add", component: this, route: "add" },
            { name: "Product Lookup", icon: "fas fa-saerch", component: this, route: "search" },
        ];
        this._questions = [
            { label: "Product Name", type: "input", inputType: "text" },
            { label: "Category", type: "select", options: ["CATEGORY TYPE"] },
            { label: "Brand", type: "input", inputType: "text" },
            { label: "Description", type: "textarea" },
            { label: "SKU / UIC", type: "input", inputType: "text" },
            { label: "Size", type: "input", inputType: "text" },
            { label: "Color", type: "select", options: ["COLOR TYPE"] },
            { label: "Taxable", type: "checkbox" }
        ];
    }
    render() {
        switch (this.state.route) {
            case "action":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Actions_1.Actions, { items: this._actions })));
            case "add":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Add_1.Add, { questions: this._questions })));
            case "search":
                return (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(Search_1.Search, null)));
        }
    }
}
exports.Inventory = Inventory;
exports.default = Inventory;
//# sourceMappingURL=Inventory.js.map