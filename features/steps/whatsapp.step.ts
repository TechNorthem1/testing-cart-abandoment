import {Given, When} from "@cucumber/cucumber";
import {By, until} from "selenium-webdriver"
import path from 'path';
import Helper from "../../helpers/Helper";



Given('Ingresar al sistema de whatsapp web {string}', async function (url) {
  // Write code here that turns the phrase above into concrete actions
  await this.openBrowser(url);
});

When('Escanear el codigo de whatsapp e ingresar al sistema {string}', {timeout: 120* 1000}, async function (url) {
  // Write code here that turns the phrase above into concrete actions
  await Helper.waitForUserToScanQRCode();
});

When('Se ingresa a la siguiente url {string}', {timeout: 200*1000}, async function (string) {
  // Uso de la función modificada
  const xlsxFilePath: string = path.join(__dirname, '../../cart_abandoment_ok.xlsx');

  Helper.readXLSXFile(xlsxFilePath)
    .then(async (data_cart) => {
      // data_cart estará lleno con los datos del archivo XLSX
      try {
        for (let i = 0; i < data_cart.length; i++) {
          try{
            const full_name = data_cart[i].fullName;
            const phone = data_cart[i].phone;
            const product = data_cart[i].product;
            console.log(`${i+1}: ${phone}`)


            let message = `¡Hola ${full_name}! \n\nNos dimos cuenta de que dejaste algo en tu carrito en\n ${product}. Queremos que sepas que\n en Titan Decko, siempre pensamos en ti\n y en tu experiencia de compra.\n Finaliza tu compra de forma rápida y fácil\n hablando directamente con nostros por este chat \n\n Gracias por elegirnos. ¡Aquí siempre estás primero!`
            let url = `${string}${phone}/?text=${message}`;
            await this.driver.get(url);
            await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath("//span[contains(.,'Ir al chat')]"))),1200000)
            await this.driver.findElement(By.xpath("//span[contains(.,'Ir al chat')]")).click();
            await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.xpath("//span[contains(text(), 'usar')]"))), 1200000);
            await this.driver.findElement(By.xpath("//span[contains(text(), 'usar')]")).click()
            await this.driver.wait(until.elementLocated(By.xpath('//button[@data-tab="11"]')), 120000);
            await this.driver.findElement(By.xpath('//button[@data-tab="11"]')).click()
            await Helper.doSomethingAfterDelay();
            
            if(i == 99) break;
          }catch(error) {
            console.log("demora de tiempo")
          }
          await Helper.doSomethingAfterDelay();
        }
      } catch (error) {
        console.log("elemento no encontrado")
      }
    })
    .catch((error) => {
      // Maneja cualquier error que ocurrió durante la lectura y procesamiento del archivo
      console.error(error);
    });
});
