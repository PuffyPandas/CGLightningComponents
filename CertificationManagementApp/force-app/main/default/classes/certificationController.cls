public with sharing class certificationController {
    @AuraEnabled(cacheable=true)

    public static List<Certification__c> getCertification(){
        return [Select Name, Cert_Name__c,Cost__c,Comments__c from Certification__c];
    }
}
