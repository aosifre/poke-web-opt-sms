import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isWebOtpSupported: boolean = true;
  myOTP: any;

  constructor() { }

  ngOnInit(): void { }

  private checkIsWebOtpSupported(): boolean {
    if ('OTPCredential' in window) {
      return true;
    } else {
      return false;
    }
  }

  ngAfterViewInit() {
    console.log(('OTPCredential' in window));
    if (this.checkIsWebOtpSupported()) {
      this.isWebOtpSupported = true;
      //debugger;
      window.addEventListener('DOMContentLoaded', e => {
        //debugger;
        const input = document.querySelector('input[autocomplete="one-time-code"]');
        if (!input) return;
        const ac = new AbortController();
        const form = input.closest('form');
        //debugger;
        if (form) {
          //debugger;
          form.addEventListener('submit', e => {
            ac.abort();
          });
        }
        var reqObj = {
          otp: { transport: ['sms'] },
          signal: ac.signal
        };
        console.log("reqObj", reqObj);

        navigator.credentials.get(reqObj).then((otp: any) => {
          console.log("OTP", otp);
          if (otp) {
            if (otp && otp.code) {
              console.log("otp.code", otp.code);
              // alert('GOT OTP***'+ otp.code);
              //input.value = otp.code;
              this.myOTP = otp.code;
            }
          }
          // if (form) form.submit();
        }).catch(err => {
          //debugger;
          console.log(err);
        });
      });
    } else {
      this.isWebOtpSupported = false;
      // this.myOTP = 521456;
      console.log('Web OTP API not supported, Please enter manually.');
      // alert('Web OTP API not supported, Please enter manually.');
    }
  }
}
