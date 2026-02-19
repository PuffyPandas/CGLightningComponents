//Integration
//Why would organization Or organizations need integration, because the end customer or the internal user 
//cannot juggle between multiple applications. They want a seamless. They want a straightforward, 
//seamless experience, so they will try to use integrations until here this is fine.
public with sharing class CGExploreRestApi {
    public string body {set;get;}
    

        public void fetch(){
            //1. instantiate the http class
            Http http = new Http();

            //2. frame the request
            HttpRequest request = new HttpRequest();
            request.setMethod('GET'); //GET-for getting info, POST - for inserting info
            request.setEndpoint('https://api.github.com/repositories?since=1'); // you cannot use any endpoint you want. it'll be given to you by the third party system

            //3. send the request and handle the  response
            HttpResponse response = http.send(request);
            body = response.getBody();
        }
    
}

// for more info refer-> https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_restful_http.htm
