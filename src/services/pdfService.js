const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda"); // Para entornos como Railway

// Función para generar el PDF
exports.generatePDF = async (html) => {
  try {
    // Lanza el navegador
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: true, // Asegúrate de que esté en true para producción
    });

    const page = await browser.newPage();
    await page.setContent(html);

    // Genera el PDF
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close(); // Cierra el navegador

    return pdfBuffer; // Retorna el buffer del PDF
  } catch (error) {
    console.error("Error generating PDF with Puppeteer:", error);
    throw error; // Lanza el error para manejarlo en el controlador
  }
};
