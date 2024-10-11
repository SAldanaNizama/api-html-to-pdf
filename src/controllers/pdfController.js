const pdfService = require("../services/pdfService");

exports.convertToPDF = async (req, res) => {
  const { html } = req.body;

  if (!html) {
    return res.status(400).json({ error: "No HTML provided" });
  }

  try {
    const pdfBuffer = await pdfService.generatePDF(html);

    // Configuración de las cabeceras para la descarga
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="document.pdf"',
    });

    // Envía el buffer del PDF
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error.message, error.stack);
    res.status(500).json({ error: "Error generating PDF" });
  }
};
