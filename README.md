# Exporting PDFs with Google App Script
## Introduction
The Code.gs file shows some examples of how to set some parameters for exporting PDFs from a Google Sheet using Google App Script.

## PDF Parameters
The exportPDF function in this example   demonstrates one method of constructing URL string parameters for PDF export. The parameters are simpler to understand if you compare them with the GUI when exporting a PDF from Google Sheets. Here's some extra guidance...
* `'gid'` - Omit this to export all sheets. Add the sheet ID to export a single sheet. See below for a subset of sheets in a single PDF. (Also, does anyone know why it's a g in gid?)
* `'format'` - Filetype. PDF for the purposes of this example.
* `'size'` - Paper size:
  * 0 *(Letter)*
  * 1 *(Tabloid)*
  * 2 *(Legal)*
  * 3 *(Statement)*
  * 4 *(Executive)*
  * 5 *(Folio)*
  * 6 *(A3)*
  * 7 *(A4)*
  * 8 *(A5)*
  * 9 *(B4)*
  * 10 *(B5)*
* `'portrait'` - Page orientation (*portrait* **true**/**false**, don't use *landscape*)
* `'fitw'` - *Fit to width*, as in GUI. Have not found parameters for *Fit to height* or *Fit to page* yet, but maybe "fith"?
* `'top_margin'` - Set margin in inches. Same of course for *bottom_*, *left_* and *right_*. Only seems to work if all four margins are present.
* `'gridlines'` - Formatting > Show grid lines. (**true**/**false**)
* `'printnotes'` - Formatting > Show notes. (**true**/**false**)
* If anyone can add the parameters for *Page order*, that would be really helpful.
* `'horizontal_alignment'` - Formatting > Alignment > Horizontal. (**LEFT**/**CENTER**/**RIGHT**)
* `'vertical_alignment'` - Formatting > Alignment > Vertical. (**TOP**/**MIDDLE**/**BOTTOM**)
* `'pagenum'` - Headers & Footers > Page Numbers. Use *UNDEFINED* to hide page numbers. (**LEFT**/**CENTER**/**RIGHT**/**UNDEFINED**)
* `'printtitle'` - Headers & Footers > Workbook title. (**true**/**false**)
* `'sheetnames'` - Headers & Footers > Sheet name. (**true**/**false**)
* If anyone can add the parameters for *Current date*, *Current time* or even *Custom fields*, that would be really helpful.

## A subset of sheets
I found a few requests online for help exporting a subset of sheets as a single PDF. Included is a method I use. When you export **all** sheets, hidden sheets don't get exported. I leverage this to hide the sheets before export then show them again before the end of the script.

## Emailing and saving the PDF
I've included an example fo how to email the PDF files and how to save them to a Google Drive.

Hope it helps!