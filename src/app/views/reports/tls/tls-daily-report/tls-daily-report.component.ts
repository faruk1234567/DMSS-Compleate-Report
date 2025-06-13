// tls-daily-report.component.ts
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx'; // XLSX লাইব্রেরি ইম্পোর্ট করুন
import { saveAs } from 'file-saver'; // file-saver ইম্পোর্ট করুন

interface PaymentBoardReportDTO {
  transactionId?: string;
  transactionType?: number;
  municipalityId?: number;
  transactiondate?: string;
  customername?: string;
  transactionamount?: number;
  oid?: number;
  status?: number;
  categoryid?: number;
  categorynameen?: string;
  categorynameb?: string;
  fathername?: string;
  officephone?: string;
  height?: number;
  width?: number;
  signboardtype?: string;
  licensefee?: number;
  sourcetax?: number;
  vatfee?: number;
  incometax?: number;
  signboardpersft?: number;
  tfwithoutsf?: number;
  signboardfee?: number;
  serialno?: string;
  arrearfee?: number;
  arrearvat?: number;
  otherfee?: number;
  licenseno?: string;
  createday?: string;
  title?: string;
  applicationFee?: number;
}

interface FormData {
  municipalityId: string;
  startDate: string;
  endDate: string;
  searchQuery: string;
  applicationFeeFilter: 'all' | 'with_fee' | 'without_fee';
}

@Component({
  selector: 'app-tls-daily-report',
  templateUrl: './tls-daily-report.component.html',
  styleUrls: ['./tls-daily-report.component.scss']
})
export class TlsDailyReportComponent implements OnInit, OnDestroy {

  formData: FormData = {
    municipalityId: '',
    startDate: '',
    endDate: '',
    searchQuery: '',
    applicationFeeFilter: 'all'
  };

  reportData: PaymentBoardReportDTO[] = [];
  originalReportData: PaymentBoardReportDTO[] = [];
  isLoading = false;
  errorMessage: string = '';
  showReport: boolean = false;

  // টেবিলের হেডার গুলোকে বাংলায় ম্যাপ করার জন্য একটি অ্যারে
  // 'ক্রমিক নং' হেডারটি যোগ করা হয়েছে
  reportHeaders = [
    'ক্রমিক নং', // নতুন যোগ করা হয়েছে
    'লেনদেনের তারিখ',
    'লেনদেনের পরিমাণ',
    'এপ্লিকেশন ফী',
    'মোবাইলনম্বর',
    'গ্রাহকেরনাম',
    'গ্রাহকেরপিতারনাম',
    'যে নামে লাইসেন্স,',
    'লাইসেন্স নম্বর',
    'সিরিয়াল নম্বর',
    'ক্যাটেগরির নাম',
    'সাইনবোর্ড টাইপ',
    'সাইনবোর্ডের দৈর্ঘ্য',
    'সাইনবোর্ডের প্রস্থ',
    'প্রতি স্কয়ার ফিট সাইন বোর্ডের মূল্য',
    'সাইনবোর্ড ফি',
    'লাইসেন্স ফি',
    'সোর্স ট্যাক্স',
    'ভ্যাট',
    'ইনকাম ট্যাক্স',
    'বকেয়া',
    'বকেয়ার উপর ভ্যাট',
    'অন্যান্য'
  ];

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'hide-sidebar-for-report');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'hide-sidebar-for-report');
  }

  onSearchChange(): void {
    let filteredData = [...this.originalReportData];

    const searchTerm = this.formData.searchQuery.toLowerCase().trim();
    if (searchTerm) {
      filteredData = filteredData.filter(item =>
        (item.officephone && String(item.officephone).toLowerCase().includes(searchTerm)) ||
        (item.licenseno && String(item.licenseno).toLowerCase().includes(searchTerm))
      );
    }

    if (this.formData.applicationFeeFilter === 'with_fee') {
      filteredData = filteredData.filter(item => typeof item.applicationFee === 'number' && item.applicationFee > 0);
    } else if (this.formData.applicationFeeFilter === 'without_fee') {
      filteredData = filteredData.filter(item => typeof item.applicationFee === 'number' && item.applicationFee === 0);
    }

    this.reportData = filteredData;
  }

  getTlsDailyReport(): void {
    const { municipalityId, startDate, endDate } = this.formData;

    if (!municipalityId || !startDate || !endDate) {
      this.errorMessage = 'Please fill all the fields.';
      return;
    }

    const start = new Date(startDate);
    let end = new Date(endDate);

    const inputStartDate = new Date(startDate);
    const inputEndDate = new Date(endDate);

    if (inputStartDate.toDateString() === inputEndDate.toDateString()) {
      end.setDate(end.getDate() + 1);
    } else {
      end.setDate(end.getDate() + 1);
    }
    
    const formatDateISO = (dateObj: Date): string => {
      return dateObj.toISOString().split('T')[0];
    };

    const adjustedStartDate = formatDateISO(start);
    const adjustedEndDate = formatDateISO(end);

    console.log("StartDate Adjusted for API:", adjustedStartDate);
    console.log("EndDate Adjusted for API:", adjustedEndDate);


    this.isLoading = true;
    this.errorMessage = '';
    this.reportData = [];
    this.originalReportData = [];

    const url = `http://localhost:8080/api/tls_collection_reports/payment-board?municipalityId=${municipalityId}&startDate=${adjustedStartDate}&endDate=${adjustedEndDate}`;
    console.log('Fetching report with URL:', url);

    this.http.get<PaymentBoardReportDTO[]>(url).subscribe({
      next: (data) => {
        console.log("API Response Data:", data);
        this.originalReportData = data.sort((a, b) => {
            const dateA = new Date(a.transactiondate || '').getTime();
            const dateB = new Date(b.transactiondate || '').getTime();
            return dateA - dateB;
        });
        
        this.isLoading = false;
        this.onSearchChange();
        this.showReport = true;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load report. Please try again.';
        console.error('API Error:', error);
        this.isLoading = false;
        this.showReport = false;
      }
    });
  }

  downloadExcel(): void {
    if (!this.reportData || this.reportData.length === 0) {
      alert('ডাউনলোড করার জন্য কোনো ডেটা নেই।');
      return;
    }

    // ডেটা ম্যাপ করুন যাতে কলামের নামগুলো বাংলায় আসে এবং সঠিক ক্রম বজায় থাকে
    const dataForExcel = this.reportData.map((item, index) => ({ // 'index' যোগ করা হয়েছে
      'ক্রমিক নং': index + 1, // নতুন যোগ করা হয়েছে
      'লেনদেনের তারিখ': item.transactiondate,
      'লেনদেনের পরিমাণ': item.transactionamount,
      'এপ্লিকেশন ফী': item.applicationFee,
      'মোবাইলনম্বর': item.officephone,
      'গ্রাহকেরনাম': item.customername,
      'গ্রাহকেরপিতারনাম': item.fathername,
      'যে নামে লাইসেন্স,': item.title,
      'লাইসেন্স নম্বর': item.licenseno,
      'সিরিয়াল নম্বর': item.serialno,
      'ক্যাটেগরির নাম': item.categorynameb,
      'সাইনবোর্ড টাইপ': item.signboardtype,
      'সাইনবোর্ডের দৈর্ঘ্য': item.height,
      'সাইনবোর্ডের প্রস্থ': item.width,
      'প্রতি স্কয়ার ফিট সাইন বোর্ডের মূল্য': item.signboardpersft,
      'সাইনবোর্ড ফি': item.signboardfee,
      'লাইসেন্স ফি': item.licensefee,
      'সোর্স ট্যাক্স': item.sourcetax,
      'ভ্যাট': item.vatfee,
      'ইনকাম ট্যাক্স': item.incometax,
      'বকেয়া': item.arrearfee,
      'বকেয়ার উপর ভ্যাট': item.arrearvat,
      'অন্যান্য': item.otherfee
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataForExcel);

    // কলাম হেডারগুলোর প্রস্থ সেট করুন (ঐচ্ছিক)
    const wscols = [
      { wch: 10 }, // ক্রমিক নং এর জন্য নতুন প্রস্থ
      { wch: 15 }, // লেনদেনের তারিখ
      { wch: 18 }, // লেনদেনের পরিমাণ
      { wch: 15 }, // এপ্লিকেশন ফী
      { wch: 15 }, // মোবাইলনম্বর
      { wch: 20 }, // গ্রাহকেরনাম
      { wch: 20 }, // গ্রাহকেরপিতারনাম
      { wch: 25 }, // যে নামে লাইসেন্স,
      { wch: 18 }, // লাইসেন্স নম্বর
      { wch: 15 }, // সিরিয়াল নম্বর
      { wch: 20 }, // ক্যাটেগরির নাম
      { wch: 18 }, // সাইনবোর্ড টাইপ
      { wch: 18 }, // সাইনবোর্ডের দৈর্ঘ্য
      { wch: 18 }, // সাইনবোর্ডের প্রস্থ
      { wch: 30 }, // প্রতি স্কয়ার ফিট সাইন বোর্ডের মূল্য
      { wch: 15 }, // সাইনবোর্ড ফি
      { wch: 15 }, // লাইসেন্স ফি
      { wch: 15 }, // সোর্স ট্যাক্স
      { wch: 10 }, // ভ্যাট
      { wch: 15 }, // ইনকাম ট্যাক্স
      { wch: 10 }, // বকেয়া
      { wch: 18 }, // বকেয়ার উপর ভ্যাট
      { wch: 15 }  // অন্যান্য
    ];
    ws['!cols'] = wscols;

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Daily Trade License Report');

    XLSX.writeFile(wb, 'দৈনিক_ট্রেড_লাইসেন্স_রিপোর্ট.xlsx');
  }

  downloadCsv(): void {
    if (!this.reportData || this.reportData.length === 0) {
      alert('ডাউনলোড করার জন্য কোনো ডেটা নেই।');
      return;
    }

    // হেডার সারি তৈরি করুন reportHeaders অ্যারে ব্যবহার করে
    const headers = this.reportHeaders.map(header => `"${header.trim()}"`).join(',');
    let csvContent = headers + '\n';

    // ডেটা সারি তৈরি করুন, reportData এর প্রতিটি অবজেক্টকে reportHeaders এর ক্রম অনুযায়ী ম্যাপ করে
    this.reportData.forEach((item, index) => { // 'index' যোগ করা হয়েছে
      const row = [
        index + 1, // নতুন যোগ করা হয়েছে
        item.transactiondate,
        item.transactionamount,
        item.applicationFee,
        item.officephone,
        item.customername,
        item.fathername,
        item.title,
        item.licenseno,
        item.serialno,
        item.categorynameb,
        item.signboardtype,
        item.height,
        item.width,
        item.signboardpersft,
        item.signboardfee,
        item.licensefee,
        item.sourcetax,
        item.vatfee,
        item.incometax,
        item.arrearfee,
        item.arrearvat,
        item.otherfee
      ].map(field => {
        // ডেটা যদি undefined বা null হয়, তবে খালি স্ট্রিং ব্যবহার করুন
        const value = field !== undefined && field !== null ? String(field) : '';
        // ডেটা যদি কমা বা ডাবল কোটেশন থাকে, তাহলে সেগুলো এস্কেপ করুন
        return `"${value.replace(/"/g, '""')}"`;
      }).join(',');
      csvContent += row + '\n';
    });

    const bom = '\uFEFF';
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });

    saveAs(blob, 'দৈনিক_ট্রেড_লাইসেন্স_রিপোর্ট.csv');
  }

  // এখানে আপনার অন্যান্য getTotal* ফাংশনগুলো থাকতে পারে (যদি প্রয়োজন হয়)
  // উদাহরণস্বরূপ:
  getTotalPaidMoney(): number {
    return this.reportData.reduce((sum, item) => sum + (item.transactionamount || 0), 0);
  }

  getTotalApplicationFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.applicationFee || 0), 0);
  }
  
  getTotlSigenboardFeeFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.signboardfee || 0), 0);
  }
  getTotlLicenseFeeFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.licensefee || 0), 0);
  }
  getTotlSourceTaxFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.sourcetax || 0), 0);
  }
  getTotlVatFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.vatfee || 0), 0);
  }
  getIncomeTaxFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.incometax || 0), 0);
  }
  getArrearFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.arrearfee || 0), 0);
  }
  getArrearvatFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.arrearvat || 0), 0);
  }
  getOtherFee(): number {
    return this.reportData.reduce((sum, item) => sum + (item.otherfee || 0), 0);
  }
}