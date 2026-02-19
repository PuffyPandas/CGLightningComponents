public with sharing class cgExploreControllersApex {

    @AuraEnabled(cacheable=true)//you fetch the data and store it in server cache such that 
    //when the method is user will be fetching info from the cache rather than reinvoking the query
    // also when you give caheable=true you cannot perform DML opertaion as both oppose each other in their funcionalities
    public static List<Account> getAccounts(){
       
        /* DML statements
            Account a = new account();
            a.name ='testing';
            insert a;
            this changes state of data, whereas cacheable is where you fetch the data when it is not changed 
         */
        return [SELECT Id,Industry,Rating from Account];
    }
    
    //imperative apex - if you want to perform dml meaning you have to remove cahceable=true
    @AuraEnabled
    public static Contact createContact(){
        
        Contact c = new Contact();
        c.LastNAme = 'Testing';
        insert c;
        return c;
    }
}
