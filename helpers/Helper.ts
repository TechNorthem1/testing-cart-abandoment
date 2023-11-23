import ICartItem from "../interface/ICartItem";
import * as XLSX from 'xlsx';

class Helper{

    constructor(){}

    static async readXLSXFile(filePath: string): Promise<ICartItem[]> {
        try {
          const workbook = XLSX.readFile(filePath);
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
          const data_cart: ICartItem[] = [];
      
          rows.forEach((row) => {
            const phone = row[1];
            const full_name = `${row[2]} ${row[3]}`;
            const product = `${row[4]}`
            let user: ICartItem = { fullName: full_name, phone: phone, product: product };
            data_cart.push(user);
          });
      
          return data_cart; // Devuelve el array lleno después de procesar todas las filas
        } catch (error) {
          console.error('Error al leer el archivo XLSX:', error);
          throw error; // Lanza el error para manejarlo en la función superior
        }
      }
      
      
    // Función que simula un tiempo de espera
    static async sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Uso de la función sleep
    static async doSomethingAfterDelay() {
      // Esperar 2 segundos (2000 milisegundos)
      await Helper.sleep(2000);   
    }

    static async waitForUserToScanQRCode(): Promise<void> {
        return new Promise<void>((resolve) => {
          console.log('Por favor, escanea el código QR ahora. Presiona ENTER para continuar...');
          process.stdin.resume();
          process.stdin.once('data', () => {
            process.stdin.pause();
            resolve();
          });
        });
    }
}

export default Helper;