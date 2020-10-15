/**
 * Created by JJ93 on 05.10.2020.
 */
//table (name, capital, population,  currency code, subregion)
//options - Capital City, Name, Currency
public with sharing class RESTCountriesController {
  @AuraEnabled(cacheable=true)
  public static Country__c[] getCountriesByParam(
    String parameterType,
    String parameterValue
  ) {
    // search by name
    Http httpConnection = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint(
      getEndPointByParameterType(parameterType) + parameterValue
    );
    request.setMethod('GET');
    HttpResponse response = httpConnection.send(request);
    List<Country__c> countries = parseToCountries(response.getBody());

    return countries;
  }
  private static List<Country__c> parseToCountries(String responseBody) {
    List<Country__c> countries = new List<Country__c>();
    List<String> names = new List<String>();
    List<String> capitals = new List<String>();
    List<Integer> populations = new List<Integer>();
    List<String> currencies = new List<String>();
    List<String> subRegions = new List<String>();

    List<Object> response = (List<Object>) JSON.deserializeUntyped(
      responseBody
    );
    for (Object obj : response) {
      Map<String, Object> country = (Map<String, Object>) obj;
      names.add((String) country.get('name'));
      capitals.add((String) country.get('capital'));
      populations.add((Integer) country.get('population'));
      subRegions.add((String) country.get('subregion'));

      List<Object> currenciesList = (List<Object>) country.get('currencies');
      String countryCurrency = '';
      for (Object obj2 : currenciesList) {
        Map<String, Object> currencyMap = (Map<String, Object>) obj2;
        countryCurrency += (currencyMap.get('code') + '/');
      }
      currencies.add(countryCurrency);
    }
    for (Integer i = 0; i < names.size(); i++) {
      countries.add(
        new Country__c(
          Name = names.get(i),
          Capital__c = capitals.get(i),
          Population__c = populations.get(i),
          Currency_Code__c = currencies.get(i),
          SubRegion__c = subRegions.get(i)
        )
      );
    }
    return countries;
  }

  private static String getEndPointByParameterType(String parameterType) {
    if (parameterType.equals('Capital City')) {
      return 'https://restcountries.eu/rest/v2/capital/';
    }
    if (parameterType.equals('Name')) {
      return 'https://restcountries.eu/rest/v2/name/';
    }
    if (parameterType.equals('Currency')) {
      return 'https://restcountries.eu/rest/v2/currency/';
    }
    return 'https://restcountries.eu/rest/v2/name/';
  }
}
