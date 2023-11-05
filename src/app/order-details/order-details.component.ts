import { Component } from '@angular/core';
import { HTTPServiceService } from '../Service/httpservice.service';
import {SelectionModel} from '@angular/cdk/collections';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  dataSource :any=[];
  displayedColumns: string[] = ['orderId', 'orderNumber', 'orderDate','vendorName', 'shopId'];
  selection = new SelectionModel<any>(true, []);
  addOrder:any=false;
  constructor( 
    private userService: HTTPServiceService,
    ) 
    { }
    ngOnInit(): void {
       this.GetOrderList();
    }
  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }
    GetOrderList()
    {
       this.userService.get("api/OrderManagement/GetOrderDetails").subscribe((response:any) => {
        if (response['statusCode'] == 'SUCCESS') {
          this.dataSource = response['data'] || []
          }
      });
    }

     onclickDelete(value:any)
     {
         var idList = [];
         idList.push(value.orderId);
         this.deleteOrder(idList);
    }
    deleteOrder(dataIdList :any)
    {
      var dataId = [];
      if(dataIdList != null)
      {
        dataId = dataIdList 
      }
      else
      {
        this.dataSource.array.forEach((element: { isSelected: boolean; orderId: any; }) => {
          if(element.isSelected  == true)
          {
           dataId.push(element.orderId);
          }
        });
      }
       
       this.userService.post(dataId,"api/OrderManagement/DeleteOrderByOrderId").subscribe((response:any) => {
        if (response['statusCode'] == 'SUCCESS') {
          this.dataSource = response['data'] || []
          }
      });
    }

}
