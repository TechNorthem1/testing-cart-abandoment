"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const selenium_webdriver_1 = require("selenium-webdriver");
const cucumber_1 = require("@cucumber/cucumber");
class BDDWorld {
    constructor() {
        this.driver = null;
    }
    openBrowser(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.driver)
                this.driver = yield new selenium_webdriver_1.Builder().forBrowser("chrome").build();
            yield this.driver.get(url);
        });
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.driver)
                yield this.driver.quit();
        });
    }
}
(0, cucumber_1.setWorldConstructor)(BDDWorld);
