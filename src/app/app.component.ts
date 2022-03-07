import { Component } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'html-to-pdf-angular-application';
  pdfDoc: any;
  constructor(private http: HttpClient) {}

  uploadPdf() {
    console.log(this.pdfDoc);
    let headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      enctype: 'multipart/form-data',
    });
    let fd = new FormData();
    fd.append('agreement', this.pdfDoc, 'agreement');
    fd.append('user_template_id', 'akfkldj94987kdhfgkjeh849u5');
    fd.append('unique_key', 'unique_key');

    console.log(fd.get('data'));
    this.http
      .post(
        'http://localhost:3200/api/template/user-templates/upload/agreement',
        fd
      )
      .subscribe((data) => {
        console.log('res ---> ', data);
      });
  }

  public convetToPDF() {
    let DATA = document.getElementById('contentToConvert') as HTMLCanvasElement;
    html2canvas(DATA).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      // this.pdfDoc = pdf.save('new-file.pdf'); // Generated PDF
      this.pdfDoc = pdf.output('blob');
      this.uploadPdf();
    });
  }
}
