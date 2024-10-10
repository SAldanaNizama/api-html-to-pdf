const pdfService = require("../services/pdfService");

// Controlador para convertir HTML a PDF
exports.convertToPDF = async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: "No HTML provided" });
  }

  try {
    const pdfBuffer = await pdfService.generatePDF(html);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="document.pdf"',
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Error generating PDF" });
  }
};
