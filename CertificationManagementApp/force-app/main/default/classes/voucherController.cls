public with sharing class voucherController {
    @AuraEnabled(cacheable=true)

    public static List<Voucher__c> getVoucher(){
        return [Select Name, Certification__r.Name, Voucher_cost__c, Validity__c, Activity__c from Voucher__c];
    }
}
