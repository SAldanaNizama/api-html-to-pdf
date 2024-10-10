const pdfService = require("../services/pdfService");

// Controlador para convertir HTML a PDF
exports.convertToPDF = async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: "No HTML provided" });
  }

  try {
    const pdfBuffer = await pdfService.generatePDF(html);

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error in convertToPDF:", error);
    res
      .status(500)
      .json({ error: "Error generating PDF", details: error.message });
  }
};
