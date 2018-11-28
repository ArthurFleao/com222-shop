import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  profileForm = this.fb.group({
    email: ['',[Validators.required,Validators.email]],
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    address: this.fb.group({
      street: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required]
    }),
  });
  

  constructor(
    private fb : FormBuilder,
    private cookieService: CookieService,
  ) { 

  }

  ngOnInit() {

    this.profileForm.patchValue({
      email: this.cookieService.get("email"),
      
      address:{
        
      }
    });
  }

  onSubmit(){
    console.log(this.profileForm.value)
  }

}
