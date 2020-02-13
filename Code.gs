function exportPDF(send_email, save_to_drive) {
    var ssID = 'spreadsheet id here'
    var sID = 'sheet id here if exporting a single sheet'
    var pdf_params = [
    	['gid',                  sID,        ], // Sheet ID (omit for all sheets as pages)
	    ['format',               'pdf'       ], // File type
	    ['size',                 7           ], // Paper size
	    ['portrait',             true        ], // Page Orientation
	    ['fitw',                 false       ], // Scale > Fit to width
	    ['top_margin',           0.75        ], // Margin in inches (all four are required)
	    ['right_margin',         0.25        ], //
	    ['bottom_margin',        0.75        ], //
	    ['left_margin',          0.25        ], //
	    ['gridlines',            false       ], // Show gridlines
	    ['printnotes',           false       ], // Show notes
	    ['horizontal_alignment', 'CENTER'    ], // Horizontal alignment
	    ['vertical_alignment',   'TOP'       ], // Vertical alignment
	    ['pagenum',              'UNDEFINED' ], // Page numbers
	    ['printtitle',           false       ], // Workbook title
	    ['sheetnames',           false       ], // Sheet name
	    ['attachment',           true        ], // Uncertain, true works
	    ['fzr',                  false       ], // Uncertain, false works
	]

	// Construct url string parameters
	var params = '?'
	for (var p = 0; p < pdf_params.length; p++) {
		params = params + pdf_params[p][0] + '=' + pdf_params[p][1] + '&'
	}
	params = params.slice(0, -1)
	var url = 'https://docs.google.com/spreadsheets/d/' + ssID + '/export' + params

	// Request exported pdf
	var request = {
		method: "GET", 
		headers: { "Authorization":"Bearer " + ScriptApp.getOAuthToken() }
	}
	var blob = UrlFetchApp.fetch(url, request).getBlob()

	// Send as email attachment
	if (send_email) {
		var recipient = 'fake@email.com'
		var subject = 'Email Subject'
		var body = 'Email Body'
		var options = {
			attachments = [{
				fileName: "filename.pdf",
				content: blob.getBytes(),
				mimeType: "application/pdf"
			}]
		}
		MailApp.sendMail(recipient, subject, body, options)
	}

	// Save to Google Drive
	if (save_to_drive) {
		DriveApp.createFile(blob)
	}
}


// The following is a method for exporting a subset of sheets in one PDF file.
// Remember to omit the gid from the PDF parameters.
function exportOnlyTheseSheets() {
	// Assuming all sheets are currently not hidden
	var ssID = 'spreadsheet id here'
	var include__in__pdf = ['sheet 1 name', 'sheet 2 name']
	var exclude_from_pdf = ['sheet 3 name']

	// Hide the sheets which should be excluded from the PDF
	for (var sid = 0; sid < exclude_from_pdf.length; sid++) {
		SpreadsheetApp
			.openById(ssid)
			.getSheetByName(exclude_from_pdf[sid])
			.hideSheet()
	}

	// Export the PDF
	exportPDF(false, false)

	// Un-hide the sheets which were hidden earlier
	for (var sid = 0; sid < exclude_from_pdf.length; sid++) {
		SpreadsheetApp
			.openById(ssid)
			.getSheetByName(exclude_from_pdf[sid])
			.showSheet()
	}
}
