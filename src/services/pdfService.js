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
      // La siguiente línea es opcional y se puede incluir si hay problemas de tiempo de espera
      timeout: 30000, // Aumenta el tiempo de espera
    });

    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "domcontentloaded" });
    const pdfBuffer = await page.pdf({ format: "A4" });

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
