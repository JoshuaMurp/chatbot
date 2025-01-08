const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate-pdf', (req, res) => {
    const { userData } = req.body;
    
    // Create PDF document
    const doc = new PDFDocument();
    
    // Set headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=user_profile.pdf');
    
    // Pipe PDF directly to response
    doc.pipe(res);
    
    // Add content
    doc.fontSize(16).text('User Profile Summary', {
        align: 'center'
    });
    
    doc.moveDown();
    Object.entries(userData).forEach(([key, value]) => {
        doc.fontSize(12).text(`${key}: ${value}`);
        doc.moveDown(0.5);
    });
    
    // Finalize the PDF
    doc.end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
