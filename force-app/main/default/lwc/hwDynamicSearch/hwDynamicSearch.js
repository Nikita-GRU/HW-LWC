import { LightningElement, track, wire, api } from "lwc";
import { refreshApex } from "@salesforce/apex";
import getAccountsBySearchKey from "@salesforce/apex/HWDynamicSearchController.getAccountsBySearchKey";
import getContactsBySearchKey from "@salesforce/apex/HWDynamicSearchController.getContactsBySearchKey";
import getLeadsBySearchKey from "@salesforce/apex/HWDynamicSearchController.getLeadsBySearchKey";
import getOpportunitiesBySearchKey from "@salesforce/apex/HWDynamicSearchController.getOpportunitiesBySearchKey";
const DELAY = 1000;
const contactColumns = [
  { label: "FirstName", fieldName: "FirstName", type: "text" },
  { label: "LastName", fieldName: "LastName", type: "text" },
  { label: "Email", fieldName: "Email", type: "text" }
];
const opportunityColumns = [
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "StageName", fieldName: "StageName", type: "text" },
  { label: "Amount", fieldName: "Amount", type: "text" }
];
const accountColumns = [
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "AccountNumber", fieldName: "AccountNumber", type: "text" },
  { label: "Phone", fieldName: "Phone", type: "text" }
];
const leadColumns = [
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "Phone", fieldName: "Phone", type: "text" },
  { label: "Company", fieldName: "Company", type: "text" }
];
const searchOptions = [
  { label: "Account", value: "Account" },
  { label: "Contact", value: "Contact" },
  { label: "Lead", value: "Lead" },
  { label: "Opportunity", value: "Opportunity" }
];
export default class HwDynamicSearch extends LightningElement {
  searchKey = '';
  searchOption = "Account";
  columns;
  @track
  searchResult;
  @track
  error;
  // @wire( getAccountsBySearchKey,{ searchKey: "$searchKey" })
  // acc;
  get options() {
    return searchOptions;
  }

  handleOptionChange(event) {
    this.searchOption = event.detail.value;
  }

  handleSearchChange(event) {
    window.clearTimeout(this.delayTimeout);
    const searchKey = event.target.value;
    this.searchKey = searchKey;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.delayTimeout = setTimeout(() => {
      if (this.searchOption === "Account") {
        this.columns = accountColumns;
        getAccountsBySearchKey({ searchKey: this.searchKey })
          .then((result) => {
            this.searchResult = result;
          })
          .catch((error) => {
            this.error = error;
          });
      }
      if (this.searchOption === "Contact") {
        this.columns = contactColumns;
        getContactsBySearchKey({ searchKey: this.searchKey })
          .then((result) => {
            this.searchResult = result;
          })
          .catch((error) => {
            this.error = error;
          });
      }
      if (this.searchOption === "Lead") {
        this.columns = leadColumns;
        getLeadsBySearchKey({ searchKey: this.searchKey })
          .then((result) => {
            this.searchResult = result;
          })
          .catch((error) => {
            this.error = error;
          });
      }
      if (this.searchOption === "Opportunity") {
        this.columns = opportunityColumns;
        getOpportunitiesBySearchKey({ searchKey: this.searchKey })
          .then((result) => {
            this.searchResult = result;
          })
          .catch((error) => {
            this.error = error;
          });
      }
    }, DELAY);
  }
}
