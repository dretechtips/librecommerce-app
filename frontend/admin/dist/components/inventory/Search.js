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
const SearchForm_1 = require("../layouts/SearchForm");
class Search extends react_1.Component {
    constructor() {
        super(...arguments);
        this._group = [
            { label: "Name", type: "text" },
            { label: "SKU / UIC", type: "text" },
            { label: "Price", type: "range" },
            { label: "Brand Name", type: "text" },
            { label: "Stock", type: "number" }
        ];
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "col-12" },
                react_1.default.createElement("div", { className: "card" },
                    react_1.default.createElement("div", { className: "card-body" },
                        react_1.default.createElement(SearchForm_1.SearchForm, { input: this._group }))),
                react_1.default.createElement("div", { className: "card" },
                    react_1.default.createElement("div", { className: "card-body" })))));
    }
}
exports.Search = Search;
exports.default = Search;
//# sourceMappingURL=Search.js.map