public with sharing class accountContoller {

    @AuraEnabled(cacheable = true)
    public static List<Account> getAccount() {
        return [select Id, Name, Phone,Industry from Account limit 10];
    }
}