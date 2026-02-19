public with sharing class appoitmentbooking {
        @AuraEnabled(Cacheable=true)
        public static List<Contact> getdoctorname(String textkey){
            
            return [select id, Name, MailingAddress, Years_of_exp__c, Doctor_pic__c,Specialty__c FROM Contact where Name LIKE :textkey];
        }

        @AuraEnabled(Cacheable=true)
        public static List<Contact> getspeciality(String textkey){
            
            return [select id, Name, MailingAddress, Years_of_exp__c, Doctor_pic__c FROM Contact where Specialty__c LIKE: textkey];
        }
}