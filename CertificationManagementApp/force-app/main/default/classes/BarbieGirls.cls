public with sharing class BarbieGirls {
    @AuraEnabled
    public static String productList() {
    Http http = new Http();
    HttpRequest request = new HttpRequest();
    request.setEndpoint('https://makeup-api.herokuapp.com/api/v1/products.json');
    request.setMethod('GET');


    HttpResponse response = http.send(request);
    if (response.getStatusCode() != 200) {
        System.debug('There were some error with the Integration callout');
    }
        System.debug('Response Body ==> '+response.getBody());
    return response.getBody();
    }
}