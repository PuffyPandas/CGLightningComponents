public class FirstClass 
{
    
    public static void mymethod()
    {
        system.debug('Helo world');
    }
    //Execution for static method => FirstClass.mymethod(); 
    
    public void mymethod2()
    {
        system.debug('Helo world');
    }
    
    //Execution for instance method => FirstClass fc = new FirstClass(); => fc.mymethod();
	// instance method is used for particular objct and static method is used for all the objects
}