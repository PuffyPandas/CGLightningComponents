public with sharing class expenseController {

    @AuraEnabled(cacheable = true) 
    public static List<AggregateResult> getExpenseGroupByType(Date startDate, Date endDate){
        return [SELECT Expense_Type__c, SUM(Expense_Amount__c) totalAmount from Expense__c where Expense_Date__c >= :startDate 
        and Expense_Date__c <= :endDate with User_Mode Group By Expense_Type__c
        ];
}
}
