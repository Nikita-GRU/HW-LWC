/**
 * @description       :
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             :
 * @last modified on  : 10-14-2020
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log
 * Ver   Date         Author                               Modification
 * 1.0   10-14-2020   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
 **/
public with sharing class HWContactListController {
  @AuraEnabled(cacheable=true)
  public static Contact[] getContacts(Integer itemCount, Integer pageNumber) {
    Integer offset = ((Integer) pageNumber - 1) * itemCount;
    String sql = 'SELECT Id, FirstName, LastName, Email, Phone FROM Contact WITH SECURITY_ENFORCED LIMIT :itemCount OFFSET :offset';
    return Database.query(sql);
  }
  @AuraEnabled(cacheable=true)
  public static Integer getTotalPages(Integer itemCount) {
    String countSQL = 'SELECT COUNT() FROM Contact WITH SECURITY_ENFORCED';
    Integer totalItems = Database.countQuery(countSQL);
    Integer totalPages = (Math.ceil(totalItems / itemCount).intValue())+1;
    return totalPages;
  }
  @AuraEnabled(cacheable=true)
  public static Contact[] getAllContacts() {
    return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact LIMIT 10];
  }
}
