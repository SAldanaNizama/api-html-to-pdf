const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent("<h1>Hello, PDF!</h1>"); // Usar un HTML simple para la prueba
    const pdfBuffer = await page.pdf({ format: "A4" });

    fs.writeFileSync("test.pdf", pdfBuffer); // Guarda el PDF en tu sistema local

    console.log("PDF generado con éxito");
    await browser.close();
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
})();
