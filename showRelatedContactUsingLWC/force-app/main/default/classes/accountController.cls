public with sharing class accountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountList() {
        return [SELECT Id, Name, Phone, Type,Industry,TickerSymbol,NumberOfEmployees,Jigsaw FROM Account];
    }
    @AuraEnabled
    public static List<Contact> getContacts(String accountId){
        return [Select Id,FirstName,LastName,Email,Phone,Specialty__c from Contact where accountId=:accountId];
         
    }
}