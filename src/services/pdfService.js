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
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Establecer el contenido HTML en la página
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 60000 });

    // Generar el PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "10mm",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    // Verificar si el buffer está vacío
    if (pdfBuffer.length === 0) {
      throw new Error("El buffer del PDF está vacío");
    }

    return pdfBuffer;
  } catch (error) {
    console.error("Error in PDF generation:", error.message, error.stack);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
