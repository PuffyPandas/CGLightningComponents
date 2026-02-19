public class VariablesAndConstants 
{
    
    public static void method()
    {
        //Varible
        integer i = 12 ; // declartion and definition [integer i; -> declaration, i=12 -> definition]
        system.debug(i);
        i = 15;
        system.debug(i);
        i=i*3;
        system.debug(i);
        
        //Constants
        final integer j= 10;
        system.debug(j);
        //j=j+15;
        //system.debug(j);
        final integer k;
        k=15;
        system.debug(k);
    }

}