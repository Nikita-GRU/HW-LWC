import { LightningElement, wire, track } from "lwc";

import getAllContacts from "@salesforce/apex/HWContactListController.getAllContacts";
import getContacts from "@salesforce/apex/HWContactListController.getContacts";
import getTotalPages from "@salesforce/apex/HWContactListController.getTotalPages";

const columns = [
  { label: "FirstName", fieldName: "FirstName", type: "text" },
  { label: "LastName", fieldName: "LastName", type: "text" },
  { label: "Email", fieldName: "Email", type: "text" }
];
export default class FundTileList extends LightningElement {
  columns = columns;
  @wire(getAllContacts)
  contacts;
  page = 1;
  itemCount = 5;
  @wire(getContacts, { itemCount: "$itemCount", pageNumber: "$page" })
  paginatedContacts;
  @wire(getTotalPages, { itemCount: "$itemCount" })
  totalPages;
  value = "inProgress";

  get options() {
    return [
      { label: "5", value: "5" },
      { label: "10", value: "10" },
      { label: "15", value: "15" }
    ];
  }

  handleChange(event) {
    this.itemCount = event.detail.value;
  }

  handlePrevious() {
    if (this.page > 1) {
      this.page = this.page - 1;
    }
  }

  handleNext() {
    if (this.page < this.totalPages.data) {
      this.page = this.page + 1;
    }
  }
}
