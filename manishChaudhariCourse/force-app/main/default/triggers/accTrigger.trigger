trigger accTrigger on Account (after Update)
{
    if(trigger.isAfter && trigger.isUpdate){
        
        Set<Id> accrec = new Set<Id>();
        
        for(Account acc: trigger.new)
        {
            if(acc.id!= null){
                accrec.add(acc.id);
            }
        }
        
        list<opportunity> opplist = new list<opportunity>([Select id, StageName, AccountId, CreatedDate,CloseDate from Opportunity where AccountId in :accrec]);
        List<Opportunity> opprec = new list<Opportunity>();
        
        for(opportunity opp : opplist)
        {
            if(opp.CreatedDate < Datetime.now()-30 && opp.StageName != 'Closed Won')
            {
                opp.StageName = 'Closed Lost';
                opp.CloseDate = Date.today();
                opprec.add(opp);
            }
        }
        update opprec;
        
    }
}













/*Write a trigger on Account, when an account is inserted, automatically account billing address should populate into the account shipping address.
 * 
 * 
 * trigger accTrigger on Account (before insert) {

    if (trigger.isBefore && trigger.isInsert)
    {
        Set<Id> accobj = new Set<Id>();
        
        for(Account acc : trigger.new)
        {
            if(acc.Id != null)
            {
                accobj.add(acc.id);
            }
        }
        
        list<Account> acclist = new list<Account>([Select id, BillingAddress,ShippingAddress from Account where id in :accobj ]);
        list<Account> accrec = new list<Account>();
        
        for(Account acc2 : trigger.new)
        {
            if(acc2.BillingCountry != null || acc2.BillingState != null || acc2.BillingCity != null || acc2.BillingStreet != null || acc2.BillingPostalCode != null)
            {
                acc2.ShippingCountry = acc2.BillingCountry;
                acc2.ShippingState = acc2.BillingState;
                acc2.ShippingCity = acc2.BillingCity;
                acc2.ShippingStreet = acc2.BillingStreet;
                acc2.ShippingPostalCode = acc2.BillingPostalCode;
                accrec.add(acc2);
            }
        }
    }
}*/