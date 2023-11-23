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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const selenium_webdriver_1 = require("selenium-webdriver");
const path_1 = __importDefault(require("path"));
const Helper_1 = __importDefault(require("../../helpers/Helper"));
(0, cucumber_1.Given)('Ingresar al sistema de whatsapp web {string}', function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Write code here that turns the phrase above into concrete actions
        yield this.openBrowser(url);
    });
});
(0, cucumber_1.When)('Escanear el codigo de whatsapp e ingresar al sistema {string}', { timeout: 120 * 1000 }, function (url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Write code here that turns the phrase above into concrete actions
        yield Helper_1.default.waitForUserToScanQRCode();
    });
});
(0, cucumber_1.When)('Se ingresa a la siguiente url {string}', { timeout: 200 * 1000 }, function (string) {
    return __awaiter(this, void 0, void 0, function* () {
        // Uso de la función modificada
        const xlsxFilePath = path_1.default.join(__dirname, '../../cart_abandoment_ok.xlsx');
        Helper_1.default.readXLSXFile(xlsxFilePath)
            .then((data_cart) => __awaiter(this, void 0, void 0, function* () {
            // data_cart estará lleno con los datos del archivo XLSX
            try {
                for (let i = 0; i < data_cart.length; i++) {
                    try {
                        const full_name = data_cart[i].fullName;
                        const phone = data_cart[i].phone;
                        const product = data_cart[i].product;
                        console.log(`${i + 1}: ${phone}`);
                        let message = `¡Hola ${full_name}! \n\nNos dimos cuenta de que dejaste algo en tu carrito en\n ${product}. Queremos que sepas que\n en Titan Decko, siempre pensamos en ti\n y en tu experiencia de compra.\n Finaliza tu compra de forma rápida y fácil\n hablando directamente con nostros por este chat \n\n Gracias por elegirnos. ¡Aquí siempre estás primero!`;
                        let url = `${string}${phone}/?text=${message}`;
                        yield this.driver.get(url);
                        yield this.driver.wait(selenium_webdriver_1.until.elementIsVisible(this.driver.findElement(selenium_webdriver_1.By.xpath("//span[contains(.,'Ir al chat')]"))), 1200000);
                        yield this.driver.findElement(selenium_webdriver_1.By.xpath("//span[contains(.,'Ir al chat')]")).click();
                        yield this.driver.wait(selenium_webdriver_1.until.elementIsVisible(this.driver.findElement(selenium_webdriver_1.By.xpath("//span[contains(text(), 'usar')]"))), 1200000);
                        yield this.driver.findElement(selenium_webdriver_1.By.xpath("//span[contains(text(), 'usar')]")).click();
                        yield this.driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath('//button[@data-tab="11"]')), 120000);
                        // await this.driver.findElement(By.xpath('//button[@data-tab="11"]')).click()
                        // await Helper.doSomethingAfterDelay();
                        console.log(i);
                        if (i == 99)
                            break;
                    }
                    catch (error) {
                        console.log("demora de tiempo");
                    }
                    yield Helper_1.default.doSomethingAfterDelay();
                }
            }
            catch (error) {
                console.log("elemento no encontrado");
            }
        }))
            .catch((error) => {
            // Maneja cualquier error que ocurrió durante la lectura y procesamiento del archivo
            console.error(error);
        });
    });
});
