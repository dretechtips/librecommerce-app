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
class Nav extends react_1.Component {
    render() {
        return (react_1.default.createElement("nav", { className: "navbar navbar-expand-lg navbar-light bg-light border-bottom border-success" },
            react_1.default.createElement("a", { href: "#", className: "navbar-brand" },
                react_1.default.createElement("img", { src: "https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Medicine_Hat_Tigers_Logo.svg/1200px-Medicine_Hat_Tigers_Logo.svg.png", alt: "Logo" })),
            react_1.default.createElement("button", { className: "navbar-toggler", "data-toggle": "collapse", "data-target": "navbarPanel" },
                react_1.default.createElement("span", { className: "navbar-toggler-icon" })),
            react_1.default.createElement("div", { className: "collapse navbar-collapse", id: "navbarPanel" },
                react_1.default.createElement("ul", { className: "navbar-nav ml-auto" },
                    react_1.default.createElement("li", { className: "nav-item" },
                        react_1.default.createElement("a", { href: "#", className: "nav-link" },
                            react_1.default.createElement("img", { src: "https://via.placeholder.com/40x40", alt: "Admin Image", className: "rounded-circle mr-2" }),
                            "John Doe"))))));
    }
}
exports.Nav = Nav;
exports.default = Nav;
//# sourceMappingURL=Nav.js.map