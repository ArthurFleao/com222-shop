import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order-service.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderItem } from '../models/orderitem';
import { CustomerService } from '../services/customer-service.service';
import { OrderItemBook } from '../models/orderitembook';

@Component({
  selector: 'app-historico-compras',
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.scss']
})
export class HistoricoComprasComponent implements OnInit {

  compras: OrderItemBook[];
  email: string;
  constructor(
    private orderService: OrderService,
    private cookieService: CookieService,
    private customerService: CustomerService,
  ) { }

  ngOnInit() {

    this.email = this.cookieService.get("email");
    if (this.email != '') {
      this.customerService.getCustomerByEmail(this.email).subscribe(customer => {
        customer = customer[0]
        this.orderService.getOrdersByCustID(customer.custID).subscribe(orders => {
          this.compras = orders;
          console.log(orders);
        })
      })


    }
  }



}
