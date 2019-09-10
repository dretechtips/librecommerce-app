"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class Http {
    static get(path, config) {
        return this._instance.get(this._value.baseURL + path, config);
    }
    static post(path, config) {
        return this._instance.post(this._value.baseURL + path, config);
    }
    static patch(path, config) {
        return this._instance.patch(this._value.baseURL + path, config);
    }
    static delete(path, config) {
        return this._instance.delete(this._value.baseURL + path, config);
    }
}
exports.Http = Http;
Http._value = {
    baseURL: "localhost",
    timeout: 1000,
};
Http._instance = axios_1.default.create(Http._value);
//# sourceMappingURL=http.service.js.map