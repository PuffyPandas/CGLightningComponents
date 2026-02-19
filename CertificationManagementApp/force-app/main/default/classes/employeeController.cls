public with sharing class employeeController {

    @AuraEnabled(cacheable=true)

    public static List<Employee__c> getEmployee(){
        return [Select Name, Emp_Name__c,Company_Name__c,Primary_Skills__c, Email_ID__c from Employee__c];
    }

}
