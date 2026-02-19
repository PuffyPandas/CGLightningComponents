//Values does not get stored in sequential order
//Stores the data in key value pair where key is unique and value can be duplicate
public class Maps {

    public static void mapmethod()
    {
        //Initilization
        /*
         * Map<Datatype_key, Datatype_value> mmap = new Map<Datatype key, Datatype value>();
         * Datatype_key can only be primitive
         * Datatype_value can be primitive, sObjects, Apex Objects and other collections
         */
         
        //Creating and initilization of Map
        
        Map<Integer, String> mmap = new Map<Integer, String>();
        //Adding values to map
        mmap.put(11, 'Jack');
        mmap.put(21, 'John');
        mmap.put(31, 'Ron');
        system.debug(mmap); 
        mmap.put(11, 'James'); //=> will override Jack
        
        //Initilize and add values together
        
        Map<Integer, String> m1 = new Map<Integer, String>{1 => 'Pill', 2 => 'Will', 3 => 'Jill'};
            
       	// Methods of Maps
       	
        mmap.putAll(m1); //{1 => 'Pill', 2 => 'Will', 3 => 'Jill'}
       	system.debug(mmap.get(1)); // Pill
        List<String> l = new list<String>();
        l = mmap.values();
        
        system.debug(l); // (James, John, Ron, Pill, Will, Jill)
        
        Map<Integer, string> o = new Map<Integer, string>();
        
        o= mmap.clone(); //{1 => 'Pill', 2 => 'Will', 3 => 'Jill', 11 => James, 21 => John, 31 => Ron}
        
        System.debug(mmap.keySet()); //{1,2,3,11,21,31}
        system.debug(mmap.containsKey(1)); //true
        system.debug(mmap.isEmpty()); //false
        system.debug(mmap.size()); //6
        
        mmap.remove(2); //removes the element at key 2
        mmap.clear();// clears the map
    }
 }