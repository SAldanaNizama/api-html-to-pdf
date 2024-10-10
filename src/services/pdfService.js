// src/services/pdfService.js
const pdf = require("html-pdf");

exports.generatePDF = (htmlContent) => {
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer);
    });
  });
};
