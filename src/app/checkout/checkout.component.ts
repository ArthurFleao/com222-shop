import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CustomerService } from '../services/customer-service.service';
import { Customer } from '../models/customer';

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
    private customerService: CustomerService,
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

    let newCustomer = new Customer();

    newCustomer.email = this.profileForm.value.email;
    newCustomer.fname = this.profileForm.value.firstName;
    newCustomer.lname = this.profileForm.value.lastName;

    newCustomer.street = this.profileForm.value.address.street;
    newCustomer.city = this.profileForm.value.address.city;
    newCustomer.zip = this.profileForm.value.address.zip;
    newCustomer.state = this.profileForm.value.address.state;



    this.customerService.addCustomer(newCustomer)
    .subscribe();


  }

}
