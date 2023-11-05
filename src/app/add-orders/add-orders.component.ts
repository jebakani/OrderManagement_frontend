import { Component, OnInit } from '@angular/core';
import { HTTPServiceService } from '../Service/httpservice.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.scss']
})
export class AddOrdersComponent {
  public orderForm: UntypedFormGroup | undefined;
  orderDetails :any = {};
  orderId:any = 0;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: HTTPServiceService,
  )
  {
  }
  ngOnInit():void{
       this.createOrderForm();
       this.getOrderDetailById(0);
  }

  createOrderForm()
  {
      this.orderForm = this.formBuilder.group({
        orderId: 0,
        orderNumber: [
          "", [Validators.required]
        ],
        vendorId: [
          0
        ],
        shopid: [
          ''
        ],
        orderDate: [null]
      });
    }
  editOrder() {
    this.orderId =
      this.orderDetails.orderId == null
        ? 0
        : this.orderDetails.orderId;
    this.orderForm = this.formBuilder.group({
      orderID: this.orderId,
      orderNumber: [
        this.orderDetails.orderNumber == null
          ? ''
          : this.orderDetails.orderNumber
      ],
      vendorId: [
        this.orderDetails.vendorId == null
          ? null
          : this.orderDetails.vendorId
        
      ],
      orderDate: [this.orderDetails.orderDate],
      shopid: [
        this.orderDetails.shopid == null
          ? ''
          : this.orderDetails.shopid
      ],
        })
  }
   
  getOrderDetailById(OrderId: any) {
    this.userService.post('', "api/OrderManagement/GetOrderDetailsByOrderId?orderId=" + this.orderId).subscribe(
      (response:any) => {
        if (response['statusCode'] == 'SUCCESS') {
          this.orderDetails = response['data'];
          this.editOrder();
        }
      },
      () => {
      }
    );
  }
  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action);
  // }
  submit(value:any)
  {
    var data =
    {
        orderId : value.orderId,
        orderNumber : value.orderNumber,
        vendorId : value.vendorId,
        shopId :value.shopId,
        orderDate :value.orderDate
    }
    this.userService.post( "api/OrderManagement/AddOrUodateOrders",data).subscribe(
      (response:any) => {
        if (response.statusCode == 'SUCCESS') {
          this.orderId = response['data'];
         // this.openSnackBar(response['StatusText'],"Ok");
        }
        else
        {
         // this.openSnackBar(response['StatusText'],"Ok");
        }
      },
      () => {
       // this.openSnackBar("Error while adding details","Ok");
      }
    );
  }
}
