const puppeteer = require("puppeteer");

exports.generatePDF = async (html) => {
  let browser;
  try {
    // Lanza el navegador Puppeteer
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

    // Configura el contenido HTML en la página
    // await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.setContent(html, { waitUntil: "networkidle0" });
    const fs = require("fs");
    fs.writeFileSync("mi-pdf.pdf", pdfBuffer);
    // Genera el PDF
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

    // Verifica si el buffer está vacío
    if (pdfBuffer.length === 0) {
      throw new Error("El buffer del PDF está vacío");
    }

    return pdfBuffer;
  } catch (error) {
    console.error("Error en la generación del PDF:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
