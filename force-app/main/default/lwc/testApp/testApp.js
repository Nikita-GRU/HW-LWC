import { LightningElement } from 'lwc';
import getAccountsBySearchKey from "@salesforce/apex/HWDynamicSearchController.getAccountsBySearchKey";


const accountColumns = [
    { label: "Name", fieldName: "Name", type: "text" },
    { label: "AccountNumber", fieldName: "AccountNumber", type: "text" },
    { label: "Phone", fieldName: "Phone", type: "text" }
  ];
export default class TestApp extends LightningElement {
    searchKey = '';
    columns=accountColumns;
    contacts;
    error;

    handleKeyChange(event) {
        this.searchKey = event.target.value;
    }

    handleClick() {
        getAccountsBySearchKey({ key: "Acc" })
            .then(result => {
                this.contacts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.contacts = undefined;
            });
    }
}