const puppeteer = require("puppeteer");

exports.generatePDF = async (html) => {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
      ],
      timeout: 30000, // Aumenta el tiempo de espera si es necesario
    });

    const page = await browser.newPage();

    // Establece el contenido HTML
    await page.setContent(html, { waitUntil: "domcontentloaded" });

    // Genera el PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // Imprime el fondo
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    return pdfBuffer;
  } catch (error) {
    console.error("Error in PDF generation:", error);
    throw error; // Lanza el error para manejarlo en el controlador
  } finally {
    if (browser) {
      await browser.close(); // Asegúrate de cerrar el navegador
    }
  }
};
