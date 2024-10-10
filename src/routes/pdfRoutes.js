const express = require("express");
const router = express.Router();
const pdfController = require("../controllers/pdfController");

// Ruta para convertir HTML a PDF
router.post("/convert", pdfController.convertToPDF);

module.exports = router;
