import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CustomerService } from '../services/customer-service.service';
import { Customer } from '../models/customer';
import { ItemCarrinho } from '../models/item-carrinho';
import { CartService } from '../services/cart-service.service';
import { Order } from '../models/order';
import { OrderService } from '../services/order-service.service';
import { OrderItem } from '../models/orderitem';
import { EmailService } from '../services/mail-service.service';
import { Email } from '../models/email';
import { EMAIL_VALIDATOR } from '@angular/forms/src/directives/validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  profileForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.maxLength(2)]],
      zip: ['', Validators.required]
    }),
  });

  counter: number = 0;
  discount: number = 1;
  msg: string;
  update: boolean;
  custID: number;
  carrinho: ItemCarrinho[];
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    private customerService: CustomerService,
    private cartService: CartService,
    private orderService: OrderService,
    private emailService: EmailService,
  ) {
    this.update = false;

  }

  ngOnInit() {

    this.carrinho = this.cartService.getCarrinho();
    console.log("checkCar", this.carrinho);

    this.customerService.getCustomerByEmail(this.cookieService.get("email"))
      .subscribe(
        customer => {
          customer = customer[0];
          if (customer === undefined) // se o cliente não existir na base de dados
          {
            this.msg = 'Bem vindo ao nosso site! Insira seus dados para entrega!';
            this.profileForm.patchValue({ email: this.cookieService.get("email") });
          }
          else {
            this.msg = 'Bem vindo novamente! Atualize seus dados para entrega!';
            this.update = true;
            this.custID = customer.custID;
            this.profileForm.patchValue({
              email: customer.email,
              firstName: customer.fname,
              lastName: customer.lname,
              address: {
                street: customer.street,
                city: customer.city,
                state: customer.state,
                zip: customer.zip,
              }
            });
          }
        }
      );


  }

  onSubmit() {
    console.log(this.profileForm.value)

    let newCustomer = new Customer();
    //    NOVO CUSTOMER  <----   FORMULÁRIO
    newCustomer.custID = this.custID;
    newCustomer.email = this.profileForm.value.email;
    newCustomer.fname = this.profileForm.value.firstName;
    newCustomer.lname = this.profileForm.value.lastName;
    newCustomer.street = this.profileForm.value.address.street;
    newCustomer.city = this.profileForm.value.address.city;
    newCustomer.zip = this.profileForm.value.address.zip;
    newCustomer.state = this.profileForm.value.address.state;

    if (this.update)
      this.customerService.updateCustomer(newCustomer).subscribe(id => { this.saveOrder() });
    else
      this.customerService.addCustomer(newCustomer).subscribe(id => { this.custID = id[0]; this.saveOrder() });

  }


  saveOrder() {
    let newOrder = new Order();

    newOrder.custID = this.custID;
    newOrder.orderDate = new Date();

    this.orderService.addOrder(newOrder)
      .subscribe(orderID => {
        this.carrinho.forEach(item => {
          let newOrderItem = new OrderItem();

          newOrderItem.orderID = orderID[0];
          newOrderItem.ISBN = item.ISBN;
          newOrderItem.price = item.price * this.discount;
          newOrderItem.qty = item.qtd;

          this.orderService.addOrderItem(newOrderItem).subscribe(ord => {
            this.counter++;
            if (this.counter >= this.carrinho.length)
              this.finalizaCompra();
          });
        });
      });


  }

  finalizaCompra() {
    this.sendEmail();
    this.router.navigate(['historico']);
    this.cartService.limparCarrinho();
  }
  sendEmail() {
    let email = new Email();
    email.mailto = this.cookieService.get("email");
    email.mailsubject = "Obrigado pela compra no CodeShop!"
    email.emailbody = 'Sua compra foi confirmada: ';

    this.carrinho.forEach(item => {
      email.emailbody += '  ' + item.ISBN;
      email.emailbody += '  ' + item.price * this.discount;
      email.emailbody += '  ' + item.qtd;
      email.emailbody += '||';
    });

    this.emailService.sendMail(email).subscribe();
  }
}
