public with sharing class certificationRequestcontroller {
    @AuraEnabled(cacheable=true)

    public static List<Certification_request__c> getCertificationRequest(){
        return [Select Name, Employees__r.Emp_Name__c, Certifications__r.Name, Voucher__r.Name, Status__c, Due_Date__c from Certification_request__c];
    }
}
