const exportPDFBlob = () => {
  const ssID = 'spreadsheet id';
  const sID = 'sheet id';
  const print_options = [
    ['gid',                  sID,        ], // Sheet ID (omit for all sheets as pages)
    ['format',               'pdf'       ], // File type
    ['size',                 7           ], // Paper size
    ['portrait',             true        ], // Page Orientation
    ['fith',                 true        ],
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
    ['fzr',                  false       ], // Freeze no. of rows (repeat on each page)
    ['fzc',                  false       ], // Freeze no. of columns (repeat on each page)
    ['r1',                   0           ], // Selection to print, start
    ['c1',                   0           ], //
    ['r2',                   100         ], // Selection to print, end
    ['c2',                   10          ], //
    ['attachment',           true        ]  // Uncertain, true works
  ];

  // URL Params
  let url_params = '?';
  for (p in print_options) {
    url_params = (
      `${url_params}` +
      `${print_options[p][0]}=${print_options[p][1]}` +
      `${(p == (print_options.length - 1)) ? '' : '&'}`
    );
  }
  let url = (
    `https://docs.google.com/spreadsheets/d/${ssID}/export${url_params}`
  );

  // Export PDF to Blob
  let options = {
    method: 'GET', 
    headers: { 
      'Authorization': `Bearer ${ScriptApp.getOAuthToken()}` 
    }
  };
  let blob = UrlFetchApp.fetch(url, options).getBlob();

  return blob
}

const emailPDF = (blob) => {
  let filename = 'pdf_exported_from_sheets';

  // Send Blob as File Attached to Email
  let email_options = {
    attachments: [{
      fileName: `${filename}.pdf`,
      content: blob.getBytes(),
      mimeType: "application/pdf"
    }]
  };
  MailApp.sendEmail(
    'supersim65@gmail.com',
    'Email Subject',
    'Email Body',
    email_options
  );
}

const savePDFToDrive = (blob) => { 
  let filename = 'pdf_exported_from_sheets';

  // Save Blob as File to Google Drive
  DriveApp.createFile(blob.setName(`${filename}.pdf`));
}
