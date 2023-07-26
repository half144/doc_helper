import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { downloadScenariosDocx } from '../../lib/createDocx';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generatePdf(id: string): void {
    const doc = new jsPDF('p', 'pt', 'a4', true);
    const html = document.getElementById(id);

    this.savePdfFromHtml({ html, doc });
  }

  savePdfFromHtml({ html, doc, title }: any): void {
    if (!html) {
      return;
    }

    const srcWidth = html.scrollWidth;
    const pWidth = doc.internal.pageSize.getWidth();
    const scale = (pWidth - 1 * 2) / Math.ceil(srcWidth);

    // const options = {
    //   filename: `Cenários CARD-${this.cardInfoForm.value.cardNumber}|SPRINT=${
    //     this.cardInfoForm.value.sprint
    //   }-${new Date().toISOString()}.pdf`,
    //   html2canvas: {
    //     scale: 2,
    //   },
    //   jsPDF: {
    //     unit: 'mm',
    //     format: 'a4',
    //     orientation: 'portrait',
    //   },
    // };

    // html2pdf().set(options).from(html).save();

    doc.html(html!, {
      autoPaging: 'text',
      image: { type: 'jpeg', quality: 0.92 },
      html2canvas: {
        scale,
        width: srcWidth,
      },
      callback: (doc: jsPDF) => {
        doc.save(`${title}.pdf`);
      },
    });
  }

  generateScenariosDocx(scenario) {
    downloadScenariosDocx(scenario);
  }
}
