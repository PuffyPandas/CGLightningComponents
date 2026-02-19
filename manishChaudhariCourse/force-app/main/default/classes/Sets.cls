//Does not store values in sequential order
//values are unique

public class Sets {
    
    public static void setmethod(){

        //Syntax - Set<Datatype> s = new Set<Datatype>();
        
        // Creating and initializing an interger set
        Set<Integer> s = new Set<Integer>();
        
        //Adding values to the set
        s.add(2);
        s.add(4);
        s.add(6);
        s.add(4);
        
        //Initializing and adding values together
        Set<Integer> s1 = new Set<Integer>{2,4,6,4};
        
        Set<String> s2 = new Set<String>{'This', 'is', 'how', 'its', 'done'};
            
        set<Account> sset = new set<Account>();
        
        Account a1 = new Account(Name='Amazon', NumberOfEmployees = 20000);
        Account a2 = new Account(Name='Walmart', NumberOfEmployees = 20000);
        Account a3 = new Account(Name='Amazon', NumberOfEmployees = 20000);//Wont get added to set
        Account a4 = new Account(Name='Amazon');//will get added as no.of employes will be null
        
        sset.add(a1);
        sset.add(a2);
        sset.add(a3);
        sset.add(a4);
        
        //methods of sets
        
        list<Integer> l1 = new list<Integer>{3,6,9,11};
        
        s.addall(l1);
        
        system.debug(s); //{2,3,4,6,9,11} automatically sorted in set
        system.debug(s.contains(3));  //true
        system.debug(s.contains(56)); //false
        system.debug(s.containsAll(l1)); //true
        system.debug(s.size());
        
        system.debug(s); //{2,3,4,6,9,11}
        system.debug(s.retainAll(l1)); //true
        system.debug(s); //{3,6,9,11}
        
        set<Integer> s3 = s.clone();
        s.remove(3);
        system.debug(s); //{6,9,11}
        s.removeAll(l1);
        s.clear();
        
                
    }
}