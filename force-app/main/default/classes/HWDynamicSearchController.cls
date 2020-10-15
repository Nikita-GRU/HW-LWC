public with sharing class HWDynamicSearchController {
  @AuraEnabled(cacheable=true)
  public static Account[] getAccountsBySearchKey(String searchKey) {
    String searchParam = '%' + searchKey + '%';
    return [
      SELECT Name, AccountNumber, Phone
      FROM Account
      WHERE Name LIKE :searchParam
      WITH SECURITY_ENFORCED
    ];
  }
  @AuraEnabled(cacheable=true)
  public static Contact[] getContactsBySearchKey(String searchKey) {
    String searchParam = '%' + searchKey + '%';
    return [
      SELECT FirstName, LastName, Email
      FROM Contact
      WHERE FirstName LIKE :searchParam OR LastName LIKE :searchParam
      WITH SECURITY_ENFORCED
    ];
  }
  @AuraEnabled(cacheable=true)
  public static Lead[] getLeadsBySearchKey(String searchKey) {
    String searchParam = '%' + searchKey + '%';
    return [
      SELECT Name, Phone, Company
      FROM Lead
      WHERE Name LIKE :searchParam
      WITH SECURITY_ENFORCED
    ];
  }
  @AuraEnabled(cacheable=true)
  public static Opportunity[] getOpportunitiesBySearchKey(String searchKey) {
    String searchParam = '%' + searchKey + '%';
    return [
      SELECT Name, StageName, Amount
      FROM Opportunity
      WHERE Name LIKE :searchParam
      WITH SECURITY_ENFORCED
    ];
  }
}
