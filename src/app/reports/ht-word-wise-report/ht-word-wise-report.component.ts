// ht-daily-report.component.ts
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx'; // XLSX লাইব্রেরি ইম্পোর্ট করুন
import { saveAs } from 'file-saver'; // file-saver ইম্পোর্ট করুন

@Component({
  selector: 'app-ht-word-wise-report',
  templateUrl: './ht-word-wise-report.component.html',
  styleUrls: ['./ht-word-wise-report.component.scss']
})
export class HtWardDailyReportComponent implements OnInit, OnDestroy {

  formData = {
    municipalityId: '',
    startDate: '',
    endDate: '',
    searchWordNo: ''
  };

  reportData: any[] = [];
  originalReportData: any[] = [];
  isLoading = false;
  errorMessage: string = '';
  showReport: boolean = false;

  // টেবিলের হেডার গুলোকে বাংলায় ম্যাপ করার জন্য একটি অ্যারে
  // এটি এক্সপোর্ট করার সময় কলামের নাম হিসেবে ব্যবহৃত হবে
  reportHeaders = [
    'ওয়ার্ড নম্বর      ',
    'বিল সংখ্যা',
    'বকেয়া',
    'বকেয়া',
    'হাল',
    'মোট',
    'সারচার্জ',
    'রিবেট',
    'শুধু বকেয়া'
    
  ];

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'hide-sidebar-for-report');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'hide-sidebar-for-report');
  }

  // বিদ্যমান গেটার ফাংশনগুলো
  getTotalPaidMoney(): number {
    return this.reportData.reduce((sum, item) => sum + (item.paidMoney || 0), 0);
  }
  getTotalGetNetBill(): number {
    return this.reportData.reduce((sum, item) => sum + (item.netTotal || 0), 0);
  }
  getTotalTotalBill(): number {
    return this.reportData.reduce((sum, item) => sum + (item.total || 0), 0);
  }
  getTotalRebet(): number {
    return this.reportData.reduce((sum, item) => sum + (item.rebet || 0), 0);
  }
  getUnpaidBill(): number {
    return this.reportData.reduce((sum, item) => sum + (item.unpaidBill || 0), 0);
  }
  getSurcharge(): number {
    return this.reportData.reduce((sum, item) => sum + (item.surcharge || 0), 0);
  }
  getCurrentHolding(): number {
    return this.reportData.reduce((sum, item) => sum + (item.holding || 0), 0);
  }
  getCurrentConsevency(): number {
    return this.reportData.reduce((sum, item) => sum + (item.con || 0), 0);
  }
  getCurrentElectriCity(): number {
    return this.reportData.reduce((sum, item) => sum + (item.electricity || 0), 0);
  }
  getCurrentWater(): number {
    return this.reportData.reduce((sum, item) => sum + (item.water || 0), 0);
  }
  getDueHolding(): number {
    return this.reportData.reduce((sum, item) => sum + (item.dueHolding || 0), 0);
  }
  getDueConsevency(): number {
    return this.reportData.reduce((sum, item) => sum + (item.dueCon || 0), 0);
  }
  getDueElectriCity(): number {
    return this.reportData.reduce((sum, item) => sum + (item.dueElectricity || 0), 0);
  }
  getDueWater(): number {
    return this.reportData.reduce((sum, item) => sum + (item.dueWater || 0), 0);
  }
  getTotalHoldingNoCount(): number {
    return this.reportData ? this.reportData.length : 0;
  }

  onSearchWordNoChange(): void {
    const searchTerm = this.formData.searchWordNo.toLowerCase().trim();

    if (searchTerm) {
      this.reportData = this.originalReportData.filter(item =>
        item.wardNo && String(item.wardNo).toLowerCase().includes(searchTerm)
      );
    } else {
      this.reportData = [...this.originalReportData];
    }
  }

  getHtaxWordReport(): void {
    const { municipalityId, startDate, endDate } = this.formData;

    console.log("StartDate Raw:", startDate);
    console.log("EndDate Raw:", endDate);
    console.log("Type of startDate:", typeof startDate);

    if (!municipalityId || !startDate || !endDate) {
      this.errorMessage = 'Please fill all the fields.';
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // API এর জন্য শেষ তারিখের সমন্বয় (যদি আপনার API এন্ড ডেটকে এক্সক্লুসিভলি নেয়)
    // যদি API এন্ড ডেটকে ইনক্লুসিভলি নেয়, তাহলে নিচের লাইনটি বাদ দিতে পারেন।
    end.setDate(end.getDate() + 1);

    const formatDateISO = (dateObj: Date): string => {
      return dateObj.toISOString().split('T')[0];
    };

    const adjustedStartDate = formatDateISO(start);
    const adjustedEndDate = formatDateISO(end);

    console.log("StartDate Adjusted:", adjustedStartDate);
    console.log("EndDate Adjusted:", adjustedEndDate);

    this.isLoading = true;
    this.errorMessage = '';
    this.reportData = [];
    this.originalReportData = [];

    const url = `http://localhost:8080/api/daily_ward_Recovery_report/holding-tax-ward-summary?municipalityId=${municipalityId}&startDate=${adjustedStartDate}&endDate=${adjustedEndDate}`;
    console.log('Fetching report with URL:', url);

    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        console.log("API Response Data:", data);
        this.originalReportData = data.sort((a, b) => new Date(a.paidDate).getTime() - new Date(b.paidDate).getTime());
        this.reportData = [...this.originalReportData];

        this.isLoading = false;

        // ডেটা লোড হওয়ার পর সার্চ ফিল্টার প্রয়োগ করুন (যদি কিছু লেখা থাকে)
        this.onSearchWordNoChange();
        this.showReport = true; // রিপোর্ট ডেটা শো করার জন্য
      },
      error: (error) => {
        this.errorMessage = 'Failed to load report. Please try again.';
        console.error('API Error:', error);
        this.isLoading = false;
        this.showReport = false; // ত্রুটি হলে রিপোর্ট হাইড করে দিন
      }
    });
  }

  // **** নতুন ডাউনলোড ফাংশনগুলো যোগ করা হয়েছে ****

  /* downloadExcel(): void {
    if (!this.reportData || this.reportData.length === 0) {
      alert('ডাউনলোড করার জন্য কোনো ডেটা নেই।');
      return;
    }

    // ডেটা ম্যাপ করুন যাতে কলামের নামগুলো বাংলায় আসে এবং সঠিক ক্রম বজায় থাকে
    // খেয়াল রাখবেন এই key-value জোড়াগুলো আপনার reportData এর property names এর সাথে মিলতে হবে।
    const dataForExcel = this.reportData.map(item => ({
      'জমার তারিখ': item.paidDate,
      'হোল্ডিং নং': item.holdingNo,
      'মূল্যায়ন কর': item.annualValue,
      'বকেয়া': item.unpaidBill,
      'সারচার্জ': item.surcharge,
      'হোল্ডিং (বকেয়া)': item.dueHolding,
      'কনজারভেন্সী (বকেয়া)': item.dueCon,
      'বিদ্যুৎ (বকেয়া)': item.dueElectricity,
      'পানি (বকেয়া)': item.dueWater,
      'মোট (বকেয়া)': item.total,
      'হোল্ডিং (হাল)': item.holding,
      'কনজারভেন্সী (হাল)': item.con,
      'বিদ্যুৎ (হাল)': item.electricity,
      'পানি (হাল)': item.water,
      'রিবেট': item.rebet,
      'মোট (হাল)': item.netTotal,
      'সর্বমোট': item.paidMoney
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExcel); // ডেটা থেকে শীট তৈরি করুন

    // কলাম হেডারগুলোর প্রস্থ সেট করুন (ঐচ্ছিক, কিন্তু সুন্দর দেখানোর জন্য ভালো)
    const wscols = [
      {wch: 15}, // জমার তারিখ
      {wch: 15}, // হোল্ডিং নং
      {wch: 15}, // মূল্যায়ন কর
      {wch: 10}, // বকেয়া
      {wch: 10}, // সারচার্জ
      {wch: 15}, // হোল্ডিং (বকেয়া)
      {wch: 18}, // কনজারভেন্সী (বকেয়া)
      {wch: 15}, // বিদ্যুৎ (বকেয়া)
      {wch: 12}, // পানি (বকেয়া)
      {wch: 12}, // মোট (বকেয়া)
      {wch: 15}, // হোল্ডিং (হাল)
      {wch: 18}, // কনজারভেন্সী (হাল)
      {wch: 15}, // বিদ্যুৎ (হাল)
      {wch: 12}, // পানি (হাল)
      {wch: 10}, // রিবেট
      {wch: 12}, // মোট (হাল)
      {wch: 15}  // সর্বমোট
    ];
    ws['!cols'] = wscols;

    const wb: XLSX.WorkBook = XLSX.utils.book_new(); // নতুন ওয়ার্কবুক তৈরি করুন
    XLSX.utils.book_append_sheet(wb, ws, 'DailyHoldingTaxReport'); // শীট যোগ করুন

    // ফাইল সেভ করুন
    XLSX.writeFile(wb, 'দৈনিক_হোল্ডিং_ট্যাক্স_রিপোর্ট.xlsx');
  }

  downloadCsv(): void {
    if (!this.reportData || this.reportData.length === 0) {
      alert('ডাউনলোড করার জন্য কোনো ডেটা নেই।');
      return;
    }

    // হেডার সারি তৈরি করুন reportHeaders অ্যারে ব্যবহার করে
    const headers = this.reportHeaders.join(',');
    let csvContent = headers + '\n';

    // ডেটা সারি তৈরি করুন, reportData এর প্রতিটি অবজেক্টকে reportHeaders এর ক্রম অনুযায়ী ম্যাপ করে
    this.reportData.forEach(item => {
      const row = [
        item.paidDate,
        item.holdingNo,
        item.annualValue,
        item.unpaidBill,
        item.surcharge,
        item.dueHolding,
        item.dueCon,
        item.dueElectricity,
        item.dueWater,
        item.total, // মোট (বকেয়া)
        item.holding, // হোল্ডিং (হাল)
        item.con, // কনজারভেন্সী (হাল)
        item.electricity, // বিদ্যুৎ (হাল)
        item.water, // পানি (হাল)
        item.rebet,
        item.netTotal, // মোট (হাল)
        item.paidMoney // সর্বমোট
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','); // ডেটা যদি কমা বা ডাবল কোটেশন থাকে, তাহলে সেগুলো এস্কেপ করুন
      csvContent += row + '\n';
    });

    // BOM (Byte Order Mark) যোগ করুন যাতে বাংলা অক্ষর ঠিকভাবে আসে
    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

    saveAs(blob, 'দৈনিক_হোল্ডিং_ট্যাক্স_রিপোর্ট.csv');
  } */
}