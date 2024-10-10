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
        "--disable-gpu", // Desactivar GPU
      ],
      timeout: 30000,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "domcontentloaded" });

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
      throw new Error("PDF buffer is empty");
    }

    return pdfBuffer;
  } catch (error) {
    console.error("Error in PDF generation:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
