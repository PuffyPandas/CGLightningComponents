public class Nestedlists {

    public static void nestedlist()
    {
        list<list<Integer>> lst = new list<list<Integer>>();
        
        list<Integer> l1 = new list<Integer>{11,20,33};
        list<integer> l2 = new list<integer>{12,40,22};
       	list<Integer> l3 = new list<Integer>{13,50,11};
            
        lst.add(l1);
        lst.add(l2);
        lst.add(l3);
        
        System.debug(lst);
        list<list<Integer>> lst2 = new list<list<Integer>>{new list<Integer>{11,20,33},
        													new list<integer>{12,40,22},
                											new list<Integer>{13,50,11}};
		system.debug(lst2);        
    }
}