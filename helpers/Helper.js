"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const XLSX = __importStar(require("xlsx"));
class Helper {
    constructor() { }
    static readXLSXFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const workbook = XLSX.readFile(filePath);
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                const data_cart = [];
                rows.forEach((row) => {
                    const phone = row[1];
                    const full_name = `${row[2]} ${row[3]}`;
                    const product = `${row[4]}`;
                    let user = { fullName: full_name, phone: phone, product: product };
                    data_cart.push(user);
                });
                return data_cart; // Devuelve el array lleno después de procesar todas las filas
            }
            catch (error) {
                console.error('Error al leer el archivo XLSX:', error);
                throw error; // Lanza el error para manejarlo en la función superior
            }
        });
    }
    // Función que simula un tiempo de espera
    static sleep(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
    // Uso de la función sleep
    static doSomethingAfterDelay() {
        return __awaiter(this, void 0, void 0, function* () {
            // Esperar 2 segundos (2000 milisegundos)
            yield Helper.sleep(2000);
        });
    }
    static waitForUserToScanQRCode() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                console.log('Por favor, escanea el código QR ahora. Presiona ENTER para continuar...');
                process.stdin.resume();
                process.stdin.once('data', () => {
                    process.stdin.pause();
                    resolve();
                });
            });
        });
    }
}
exports.default = Helper;
