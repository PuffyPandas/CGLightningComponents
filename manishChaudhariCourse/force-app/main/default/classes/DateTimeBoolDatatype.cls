public class DateTimeBoolDatatype {

    public static void method()
    {
        //====================Date Datatype==========
        
        Date d1;
        d1= Date.today();	// Current Date
        system.debug(d1);
        
        d1 = Date.newInstance(2018,01,02);		// (YYYY,MM,DD)
        system.debug(d1.toStartOfMonth());		//2018-01-01 00:00:00
        system.debug(d1.toStartOfWeek());		//2017-12-31 00:00:00
        
        system.debug(d1 = d1.addDays(5));		//2018-01-07 00:00:00
        system.debug(d1 =d1+5);					//Same as above 2018-01-12 00:00:00
        
        system.debug(d1 = d1.addMonths(4));			//2018-05-12 00:00:00
        system.debug(d1 = d1.addYears(5));			//2023-05-12 00:00:00
        
        //================Time Datatype===============
        
        Time t1;
        t1 = time.newInstance(15,44,45,50);		//(HH,MM,SS,MS)
        
        system.debug(t1.addHours(2));		//17:44:45.050
        system.debug(t1.addMinutes(20));	//16:04:45.050
        
        //=============DateTime Datatype=====================
       	
        Datetime dt1 = DateTime.newInstance(2018,05,15, 09,20,30);		//(YYYY,MM,DD,HH,MM,SS)
        system.debug(Datetime.now()); 		//Current Date & Time
        
        //================Boolean datatype===================
        
        Boolean b = true;
        boolean b1 = false;
        Boolean b2 = 5>7; //false
        
        //Id id 15 digit or 18 digit ID which identifies the record uniquely in the whole org. It is system generated id
        ID i = '15digitrecordid'; // will automatically converts 15 digit recor id into 18 digit record id
        
       	string s = '00B6F00000F3sppUAB';
        ID i2 = s;
        
        ID i3 = 'ABCDEFGHIKLMOPQ';	//Runtime Error
        
        // BLOB - a collection of binary data stored as single object.
        // BLOB is typically used to store images, audio or other multimedia and sometimes binary executable code is also stored as a blob.
        // we can convert this datatype to string or from string using the toString() and valueOf() methods
        
        string s1 = 'ashaiduhwfbdhv3e8sfluygwdiwkdjawoidhwleidhlwehliwefh';
        Blob bb = blob.valueOf(s);
        string s2 = bb.toString();
    }
}