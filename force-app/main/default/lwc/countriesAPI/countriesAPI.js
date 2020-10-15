import { LightningElement, wire } from "lwc";
import getCountriesByParam from "@salesforce/apex/RESTCountriesController.getCountriesByParam";
const columns = [
  { label: "Name", fieldName: "Name", type: "text" },
  { label: "Capital__c", fieldName: "Capital__c", type: "text" },
  { label: "Population__c", fieldName: "Population__c", type: "text" },
  { label: "Currency_Code__c", fieldName: "Currency_Code__c", type: "text" },
  { label: "Population__c", fieldName: "SubRegion__c", type: "text" }
];
export default class CountriesAPI extends LightningElement {
  columns = columns;
  parameterType;
  parameterValue;
  @wire(getCountriesByParam, {
    parameterType: "$parameterType",
    parameterValue: "$parameterValue"
  })
  countries;

  handleKeyUp(evt) {
    const isEnterKey = evt.keyCode === 13;
    if (isEnterKey) {
      this.parameterValue = evt.target.value;
    }
  }
  get options() {
    return [
      { label: "Capital City", value: "Capital City" },
      { label: "Name", value: "Name" },
      { label: "Currency", value: "Currency" }
    ];
  }

  handleChange(event) {
    this.parameterType = event.detail.value;
  }
}
