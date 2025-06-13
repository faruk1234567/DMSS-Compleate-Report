import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { saveAs } from 'file-saver';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

// This is necessary for excel export.
// Ensure you have installed 'xlsx' package: npm install xlsx --save
// import * as XLSX from 'xlsx'; // <--- Uncomment this line if you use xlsx for export

interface RenewLicenseData {
  mobileno?: string;
  licenseno?: string;
  transactiondate?: string;
  amount?: number;
  nationalid?: string;
  title?: string;
  wardno?: string;
}

interface FormData {
  municipalityId: string;
  startDate: string;
  endDate: string;
}

@Component({
  selector: 'app-tls-renewal-report',
  templateUrl: './tls-renewal-report.component.html',
  styleUrls: ['./tls-renewal-report.component.scss'],
  providers: [DatePipe]
})
export class HtTlsRenewalComponent implements OnInit, OnDestroy {

  formData: FormData = {
    municipalityId: '',
    startDate: '',
    endDate: ''
  };

  reportData: RenewLicenseData[] = [];
  originalReportData: RenewLicenseData[] = [];

  isLoading: boolean = false;
  isLoadingExcel: boolean = false;
  errorMessage: string = '';
  showReport: boolean = false;

  reportHeaders = [
    'ক্রমিক নং',
    'মোবাইল নম্বর',
    'ট্রানজেকশন ডেট',
    'লাইসেন্স নম্বর',
    'টাইটেল',
    'NID',
    'অ্যামাউন্ট',
    'ওয়ার্ড নম্বর'
  ];

  constructor(private http: HttpClient, private renderer: Renderer2, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'hide-sidebar-for-report');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'hide-sidebar-for-report');
  }

  getTlsRenewalReport(reportForm: NgForm): void {
    const { municipalityId, startDate, endDate } = this.formData;

    // Client-side validation using NgForm's validity
    if (reportForm.invalid) {
      this.errorMessage = 'অনুগ্রহ করে পৌরসভা আইডি, শুরুর তারিখ এবং শেষের তারিখ পূরণ করুন।';
      this.showReport = false; // Ensure previous report is hidden if form is invalid
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

    this.isLoading = true; // Start loading indicator
    this.errorMessage = ''; // Clear previous error messages
    this.showReport = false; // Hide previous report
    this.reportData = []; // Clear current table data
    this.originalReportData = []; // Clear original data

    const url = `http://localhost:8080/api/Renewallicenses?municipalityId=${municipalityId}&dateFrom=${adjustedStartDate}&dateTo=${adjustedEndDate}`;
    console.log('Fetching report with URL:', url);

    this.http.get<RenewLicenseData[]>(url).subscribe({
      next: (data) => {
        console.log("API Response Raw Data:", data);
        
        if (Array.isArray(data)) {
            this.originalReportData = data.sort((a, b) => {
                const dateA = new Date(a.transactiondate || '').getTime();
                const dateB = new Date(b.transactiondate || '').getTime();
                return dateA - dateB;
            });
            this.reportData = this.originalReportData; // Assign all data directly to reportData
            console.log("Report Data after assignment (length):", this.reportData.length); // Log reportData length
        } else {
            // Handle cases where API returns non-array data but status 200
            console.warn("API did not return an array of data. Received:", data);
            this.reportData = [];
            this.originalReportData = [];
            this.errorMessage = 'API থেকে প্রত্যাশিত ডেটা ফরম্যাট পাওয়া যায়নি।';
        }

        this.isLoading = false; // Stop loading indicator
        this.showReport = true; // Show the report section

        console.log("showReport:", this.showReport, "isLoading:", this.isLoading); // Final state log
      },
      error: (error) => {
        this.errorMessage = 'রিপোর্ট লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।';
        console.error('API Error:', error);
        this.isLoading = false; // Stop loading indicator
        this.showReport = false; // Hide report section on error
      }
    });
  }

  getTotalLicenses(): number {
    return this.originalReportData.length;
  }

  getTotalAmountSum(): number {
    return this.originalReportData.reduce((sum, item) => sum + (item.amount || 0), 0);
  }

  exportToExcel(): void {
    if (!this.originalReportData || this.originalReportData.length === 0) {
      alert('ডাউনলোড করার জন্য কোনো ডেটা নেই।');
      return;
    }

    this.isLoadingExcel = true;
    const dataToExport = this.originalReportData.map((item, index) => ({
      'ক্রঃ নং': index + 1,
      'মোবাইল নম্বর': item.mobileno,
      'ট্রানজেকশন ডেট': this.datePipe.transform(item.transactiondate, 'yyyy-MM-dd HH:mm:ss'), // Format date for Excel
      'লাইসেন্স নম্বর': item.licenseno,
      'টাইটেল': item.title,
      'NID': item.nationalid,
      'অ্যামাউন্ট': item.amount,
      'ওয়ার্ড নম্বর': item.wardno
    }));

    // Example using 'xlsx' for Excel export. You need to install it first: npm install xlsx --save
    // const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'RenewalReport');
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    // const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    // saveAs(blob, 'Trade_License_Daily_Transaction_Report.xlsx');
    
    // For demonstration, save a simple JSON file if xlsx is not integrated
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    saveAs(blob, 'Trade_License_Daily_Transaction_Report.json'); // Saving as JSON for now

    this.isLoadingExcel = false; // Set to false after operation completes
  }
}
