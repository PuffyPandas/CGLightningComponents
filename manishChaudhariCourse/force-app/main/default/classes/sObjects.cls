public class sObjects {

    //sObject => Standard object => is record of an object=> to refer any record of object in your apex you use sObject
    
    public static void method()
    {
        //======================Standard object====================================
        //Create an Account sObject
        
        Account a = new Account();
        
        //Create an Contact sObject
        
        Contact c = new Contact();
        
        //=====Assign field values to account and contact sObject========
        
        	//Through Constructor
        	
        Account a1 = new Account (Name = 'Amazon');
        Contact c1 = new Contact(firstname = 'Mad', lastname = 'Max', Languages__c = 'Spanish');
        
        //Using dot notation
        
        a1.Name = 'Flipkart';
        a1.NumberOfEmployees = 3000;
        
        c1.firstname = 'Mad';
        c1.lastname = 'Max';
        c1.Languages__c = 'Spanish';
        
        //===========================Custom Object=============================
        
        //Create a custom sObbject
        
        //Student__c st1 = new student__c(Student_Name_c = 'Amit');
        
        
        //========================Generic Object====================
        //incase we dont know what object records it is gonna store then we use sObject
        
        sObject s1;
        s1 = new Account(Name = 'Amazon');
        
        sObject s2 = new Contact (lastname = 'Person');
        
        //================Twist with Generic sObjects=====================
        	
        	//======================Setting a field=======================
        	
        //s1.NumberOfEmployees = 3000; 		will not work as it will search in sobject class and not account class
        // so u need to use another method put
        
        s1.put('NumberOfEmployees', 3000);
        
        //=============Access a field value============
        
        //	integer i = s1.NumberOfEmployees; 		will not work
        
        object objval= s1.get('NumberOfEmployees');
        
        integer i = (integer)s1.get('NumberOfEmployees');        
        
    }
}