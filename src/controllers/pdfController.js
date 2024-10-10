// src/controllers/pdfController.js
const pdfService = require("../services/pdfService");

exports.convertToPDF = (req, res) => {
  const { htmlContent } = req.body;

  if (!htmlContent) {
    return res.status(400).json({ message: "HTML content is required" });
  }

  pdfService
    .generatePDF(htmlContent)
    .then((pdfBuffer) => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="document.pdf"',
      });
      res.send(pdfBuffer);
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
      res.status(500).json({ message: "Error generating PDF" });
    });
};
