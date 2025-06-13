import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Observable, forkJoin } from 'rxjs';

// আপনার API রেসপন্স ডেটার জন্য ইন্টারফেস
interface BoardQueryResult {
  renewalfee: number;
  sourcetax: number;
  licensefee: number;
  title: string;
  otherfee: number;
  amount: number;
  transactiondate: string;
  municipalityid: number;
  signboardpersft: number;
  nationalid: string;
  vatfee: number;
  inComeTax: number;
  holdingno: string;
  mobileno: string;
  phoneno: string;
  height: number;
  width: number;
  arrearFee: number;
  oid: number;
  licenseno: string;
  signboardtype: string;
  referoid: number;
  createday: string;
  renewoid: number;
}

// Spring Boot এর Page রেসপন্স এর জন্য ইন্টারফেস
interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// নতুন ইন্টারফেস: summary-and-all-data API রেসপন্স এর জন্য
interface SummaryAndAllDataResponse {
  totalLicenses: number;
  totalAmount: string; // ব্যাকএন্ড থেকে এখন স্ট্রিং হিসেবে আসছে
  allData: BoardQueryResult[]; // সকল ডেটা থাকবে এখানে
}

@Component({
  selector: 'app-tls-municipality-demand',
  templateUrl: './tls-municipality-demand.component.html',
  styleUrls: ['./tls-municipality-demand.component.scss'],
  providers: [DatePipe]
})

export class HtTlsDemandComponent implements OnInit {

  Math = Math;
  formData = {
    municipalityId: 6,
    // startDate: '', // <--- এই লাইনটি সরিয়ে দেওয়া হয়েছে
    endDate: ''
  };
  reportData: BoardQueryResult[] = [];
  isLoading: boolean = false; // এটি রিপোর্ট লোড করার জন্য
  isLoadingExcel: boolean = false; // Excel ডাউনলোডের জন্য নতুন প্রপার্টি
  errorMessage: string = '';
  showReport: boolean = false; // এটিই রিপোর্টের তথ্য এবং বাটনগুলো নিয়ন্ত্রন করে

  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  // নতুন প্রপার্টি: মোট লাইসেন্স সংখ্যা এবং মোট টাকার পরিমাণ গ্লোবালি রাখার জন্য
  totalLicensesCount: number = 0;
  totalAmountSum: string = '0.00';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const today = new Date();
    this.formData.endDate = this.datePipe.transform(today, 'yyyy-MM-dd') || '';
    // const twoYearsAgo = new Date(); // <--- এই লাইনটি সরিয়ে দেওয়া হয়েছে
    // twoYearsAgo.setFullYear(today.getFullYear() - 2); // <--- এই লাইনটি সরিয়ে দেওয়া হয়েছে
    // this.formData.startDate = this.datePipe.transform(twoYearsAgo, 'yyyy-MM-dd') || ''; // <--- এই লাইনটি সরিয়ে দেওয়া হয়েছে

    // !!! এই লাইনটি কমেন্ট আউট বা মুছে দিন !!!
    // this.gettlsDemandReport();
    // এই পরিবর্তনের ফলে, পেজ লোড হওয়ার সাথে সাথে রিপোর্ট লোড হবে না।
    // শুধুমাত্র 'রিপোর্ট দেখুন' বাটনে ক্লিক করার পরেই ডেটা ফেচ হবে।
  }

  gettlsDemandReport(form?: NgForm, isPaginationCall: boolean = false): void {
    console.log('API call started.');
    const apiCallStartTime = performance.now();

    if (!isPaginationCall && form && form.invalid) {
      this.errorMessage = 'অনুগ্রহ করে প্রয়োজনীয় সকল ঘর পূরণ করুন।';
      this.showReport = false; // ফর্ম অবৈধ হলে রিপোর্ট লুকান
      return;
    }

    // fromDate চেক করার শর্তটি সরিয়ে দেওয়া হয়েছে
    if (!this.formData.municipalityId || !this.formData.endDate) {
      this.errorMessage = 'পৌরসভা এবং শেষের তারিখ নির্বাচন করুন।';
      this.showReport = false; // প্যারামিটার না থাকলে রিপোর্ট লুকান
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.showReport = false; // API কল শুরু হওয়ার আগে রিপোর্ট লুকান

    let params = new HttpParams()
      .set('municipalityId', this.formData.municipalityId.toString())
      // .set('fromDate', this.formData.startDate) // <--- এই লাইনটি সরিয়ে দেওয়া হয়েছে
      .set('toDate', this.formData.endDate)
      .set('page', (this.page - 1).toString())
      .set('size', this.pageSize.toString());

    // দুটি API কল একসাথে করুন: পেজিনেটেড ডেটা এবং সারসংক্ষেপ+সকল ডেটা
    // forkJoin ব্যবহার করে দুটি অ্যাসিঙ্ক্রোনাস কল একসাথে ম্যানেজ করা হয়
    forkJoin([
      // fromDate প্যারামিটারটি বাদ দেওয়া হয়েছে
      this.http.get<Page<BoardQueryResult>>('http://localhost:8080/api/board/data', { params }), // পেজিনেটেড ডেটা
      // fromDate প্যারামিটারটি বাদ দেওয়া হয়েছে
      this.http.get<SummaryAndAllDataResponse>('http://localhost:8080/api/board/summary-and-all-data', {
        params: new HttpParams()
          .set('municipalityId', this.formData.municipalityId.toString())
          // .set('fromDate', this.formData.startDate) // <--- এই লাইনটি সরিয়ে দেওয়া হয়েছে
          .set('toDate', this.formData.endDate)
      }) // সারসংক্ষেপ এবং সকল ডেটা (এক্সেলের জন্য)
    ])
      .subscribe({
        next: ([paginatedResponse, summaryResponse]) => {
          const apiCallEndTime = performance.now();
          console.log(`API response received in: ${apiCallEndTime - apiCallStartTime} ms`);
          
          this.reportData = paginatedResponse.content;
          this.totalItems = paginatedResponse.totalElements;
          this.totalPages = paginatedResponse.totalPages;
          this.isLoading = false;
          this.showReport = true; // ডেটা সফলভাবে লোড হলে রিপোর্ট দেখান

          // সারসংক্ষেপ ডেটা আপডেট করুন
          this.totalLicensesCount = summaryResponse.totalLicenses;
          this.totalAmountSum = summaryResponse.totalAmount; // স্ট্রিং হিসেবে গ্রহণ করা হচ্ছে

          setTimeout(() => {
            const uiRenderEndTime = performance.now();
            console.log(`UI elements likely rendered after API response in: ${uiRenderEndTime - apiCallEndTime} ms`);
            console.log(`Total time from API call start to UI possibly rendered: ${uiRenderEndTime - apiCallStartTime} ms`);
          }, 0);

          console.log('Report Data (Paginated):', this.reportData);
          console.log('Total Items (Paginated):', this.totalItems);
          console.log('Total Pages (Paginated):', this.totalPages);
          console.log('Summary Data (totalLicenses, totalAmount, allData):', summaryResponse);
        },
        error: (error) => {
          console.error('রিপোর্ট ডেটা ফেচ করতে এরর হয়েছে:', error);
          this.errorMessage = 'ডেটা ফেচ করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
          this.isLoading = false;
          this.showReport = false; // এরর হলেও রিপোর্ট লুকান
        }
      });
  }

  goToPage(newPage: number): void {
    console.log('goToPage called with:', newPage);
    if (newPage >= 1 && newPage <= this.totalPages && newPage !== this.page) {
      this.page = newPage;
      this.gettlsDemandReport(undefined, true);
    }
  }

  prevPage(): void {
    console.log('prevPage called. Current page before:', this.page);
    if (this.page > 1) {
      this.goToPage(this.page - 1);
    }
  }

  nextPage(): void {
    console.log('nextPage called. Current page before:', this.page);
    if (this.page < this.totalPages) {
      this.goToPage(this.page + 1);
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxButtons = 5;
    let startPage = Math.max(1, this.page - Math.floor(maxButtons / 2));
    let endPage = Math.min(this.totalPages, startPage + maxButtons - 1);
    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  // মোট লাইসেন্স সংখ্যা: এখন totalLicensesCount প্রপার্টি থেকে আসবে
  getTotalLicenses(): number {
    return this.totalLicensesCount;
  }

  // মোট টাকার পরিমাণ: এখন totalAmountSum প্রপার্টি থেকে আসবে (স্ট্রিং হিসেবে)
  getTotalAmountSum(): string {
    return this.totalAmountSum;
  }

  // এক্সেল ডাউনলোড মেথড: সকল ডেটা ফেচ করার জন্য আপডেট করা হয়েছে
  exportToExcel(): void {
    this.isLoadingExcel = true; // <<< এখানে লোডিং স্টেট শুরু করুন
    this.errorMessage = '';

    const params = new HttpParams()
      .set('municipalityId', this.formData.municipalityId.toString())
      // .set('fromDate', this.formData.startDate) // <--- এই লাইনটি সরিয়ে দেওয়া হয়েছে
      .set('toDate', this.formData.endDate);

    this.http.get<SummaryAndAllDataResponse>('http://localhost:8080/api/board/summary-and-all-data', { params })
      .subscribe({
        next: (response) => {
          const allDataForExcel = response.allData; // সকল ডেটা এখান থেকে নিন

          if (!allDataForExcel || allDataForExcel.length === 0) {
            alert('ডাউনলোড করার জন্য কোনো ডেটা নেই।');
            this.isLoadingExcel = false; // <<< কোনো ডেটা না থাকলে লোডিং শেষ করুন
            return;
          }

          const dataForExcel = allDataForExcel.map(item => ({
            'মোবাইল নম্বর': item.mobileno,
            'ট্রানজেকশন ডেট': this.datePipe.transform(item.transactiondate, 'yyyy-MM-dd HH:mm:ss'),
            'লাইসেন্স নম্বর': item.licenseno,
            'টাইটেল': item.title,
            'জাতীয় পরিচয় পত্র নম্বর': item.nationalid,
            'অ্যামাউন্ট': item.amount,
            'সাইনবোর্ড টাইপ': item.signboardtype,
            'প্রতি স্কয়ার ফিট সাইন বোর্ডের মূল্য': item.signboardpersft,
            'সাইনবোর্ডের দৈর্ঘ্য': item.height,
            'সাইন বোর্ডের প্রস্থ': item.width,
            'রিনিউয়াল ফি': item.renewalfee,
            'সোর্স ট্যাক্স': item.sourcetax,
            'লাইসেন্স ফি': item.licensefee,
            'অন্যান্য ফি': item.otherfee,
            'ভ্যাট ফি': item.vatfee,
            'ইনকাম ট্যাক্স': item.inComeTax,
            'হোল্ডিং নং': item.holdingno,
            'ফোন নং': item.phoneno,
            'বকেয়া ফি': item.arrearFee
          }));

          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExcel);
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveExcelFile(excelBuffer, 'ট্রেড_লাইসেন্স_রিপোর্ট');
          this.isLoadingExcel = false; // <<< সফলভাবে ডাউনলোড শুরু হলে লোডিং শেষ করুন
        },
        error: (error) => {
          console.error('এক্সেল ডেটা ফেচ করতে এরর হয়েছে:', error);
          this.errorMessage = 'এক্সেল ডেটা ফেচ করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
          this.isLoadingExcel = false; // <<< এরর হলেও লোডিং শেষ করুন
        }
      });
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(data, fileName + '_' + new Date().getTime() + '.xlsx');
  }

  // প্রিন্ট মেথড: totalAmountSum এখন স্ট্রিং, তাই toFixed(2) বাদ দেওয়া হয়েছে
  printReport(): void {
    if (!this.reportData || this.reportData.length === 0) {
      alert('প্রিন্ট করার জন্য কোনো ডেটা নেই।');
      return;
    }

    let printContents = `
      <style>
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        h2 { text-align: center; margin-bottom: 20px; }
        .summary { text-align: right; margin-top: 20px; }
        .summary p { margin: 5px 0; font-weight: bold; }
      </style>
      <h2>ট্রেড লাইসেন্স চাহিদার রিপোর্ট</h2>
      <div class="summary">
        <p>মোট লাইসেন্স সংখ্যা: ${this.getTotalLicenses()}</p>
        <p>মোট টাকার পরিমাণ: ${this.getTotalAmountSum()}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>মোবাইল নম্বর</th>
            <th>ট্রানজেকশন ডেট</th>
            <th>লাইসেন্স নম্বর</th>
            <th>টাইটেল</th>
            <th>জাতীয় পরিচয় পত্র নম্বর</th>
            <th>অ্যামাউন্ট</th>
            <th>সাইনবোর্ড টাইপ </th>
            <th>প্রতি স্কয়ার ফিট সাইন বোর্ডের মূল্য</th>
            <th>সাইনবোর্ডের দৈর্ঘ্য</th>
            <th>সাইন বোর্ডের প্রস্থ</th>
          </tr>
        </thead>
        <tbody>
    `;
    this.reportData.forEach(item => {
      printContents += `
        <tr>
          <td>${item.mobileno || ''}</td>
          <td>${this.datePipe.transform(item.transactiondate, 'yyyy-MM-dd HH:mm:ss') || ''}</td>
          <td>${item.licenseno || ''}</td>
          <td>${item.title || ''}</td>
          <td>${item.nationalid || ''}</td>
          <td>${item.amount || 0}</td>
          <td>${item.signboardtype || ''}</td>
          <td>${item.signboardpersft || 0}</td>
          <td>${item.height || 0}</td>
          <td>${item.width || 0}</td>
        </tr>
      `;
    });
    printContents += `
        </tbody>
      </table>
    `;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }
}