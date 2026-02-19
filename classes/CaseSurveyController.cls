/**
 * @description Controller for Case Feedback Survey LWC.
 * Provides read of Case Status and creation of Case_Survey__c in user mode.
 * Enforces sharing and FLS. Designed to be called from LWC (AuraEnabled) and Flow (Invocable).
 */
public with sharing class CaseSurveyController {
    /**
     * @description Return the Status of a Case by Id.
     * @param caseId Id of the Case
     * @return Case Status value or null if not found/accessible
     */
    @AuraEnabled(cacheable=true)
    public static String getCaseStatus(Id caseId) {
        if (caseId == null) {
            return null;
        }
        // Field-level security check for Case.Status
        if (!Schema.sObjectType.Case.fields.Status.isAccessible()) {
            // Do not expose specific security details to the UI
            return null;
        }
        // Query in user mode to respect sharing/FLS
        List<Case> cs = [SELECT Status FROM Case WHERE Id = :caseId WITH USER_MODE LIMIT 1];
        return cs.isEmpty() ? null : cs[0].Status;
    }

    /**
     * @description Create a Case_Survey__c record in USER_MODE with provided ratings (1-5) and optional comments.
     * @return Id of created survey record
     */
    @AuraEnabled
    public static Id createSurvey(
        Id caseId,
        Integer q1,
        Integer q2,
        Integer q3,
        Integer q4,
        Integer q5,
        String comments
    ) {
        // Basic validation and early returns
        if (caseId == null) {
            throw new AuraHandledException('Case Id is required.');
        }
        List<Integer> ratings = new List<Integer>{ q1, q2, q3, q4, q5 };
        for (Integer r : ratings) {
            if (r == null || r < 1 || r > 5) {
                throw new AuraHandledException('All ratings must be between 1 and 5.');
            }
        }

        // FLS checks for Case_Survey__c fields
        if (!Schema.sObjectType.Case_Survey__c.fields.Case__c.isCreateable()
            || !Schema.sObjectType.Case_Survey__c.fields.Q1__c.isCreateable()
            || !Schema.sObjectType.Case_Survey__c.fields.Q2__c.isCreateable()
            || !Schema.sObjectType.Case_Survey__c.fields.Q3__c.isCreateable()
            || !Schema.sObjectType.Case_Survey__c.fields.Q4__c.isCreateable()
            || !Schema.sObjectType.Case_Survey__c.fields.Q5__c.isCreateable()
            || !Schema.sObjectType.Case_Survey__c.fields.Comments__c.isCreateable()
        ) {
            throw new AuraHandledException('You do not have permission to create survey fields.');
        }

        Case_Survey__c survey = new Case_Survey__c();
        survey.Case__c = caseId;
        survey.Q1__c = q1;
        survey.Q2__c = q2;
        survey.Q3__c = q3;
        survey.Q4__c = q4;
        survey.Q5__c = q5;
        survey.Comments__c = comments;

        // Insert in user mode to respect sharing/FLS
        Database.SaveResult sr = Database.insert(survey, AccessLevel.USER_MODE);
        if (!sr.isSuccess()) {
            Database.Error err = sr.getErrors().isEmpty() ? null : sr.getErrors()[0];
            throw new AuraHandledException(err != null ? err.getMessage() : 'Failed to create survey.');
        }
        return sr.getId();
    }

    /**
     * @description Invocable version for Flow usage to create Case_Survey__c.
     */
    public class CreateSurveyRequest {
        @InvocableVariable(required=true) public Id caseId;
        @InvocableVariable(required=true) public Integer q1;
        @InvocableVariable(required=true) public Integer q2;
        @InvocableVariable(required=true) public Integer q3;
        @InvocableVariable(required=true) public Integer q4;
        @InvocableVariable(required=true) public Integer q5;
        @InvocableVariable(required=false) public String comments;
    }

    public class CreateSurveyResponse {
        @InvocableVariable public Id surveyId;
        @InvocableVariable public String error;
    }

    @InvocableMethod(label='Create Case Survey' description='Create Case_Survey__c for a Case with 5 ratings and optional comments.')
    public static List<CreateSurveyResponse> createSurveyInvocable(List<CreateSurveyRequest> requests) {
        List<CreateSurveyResponse> results = new List<CreateSurveyResponse>();
        if (requests == null) return results;
        for (CreateSurveyRequest req : requests) {
            CreateSurveyResponse res = new CreateSurveyResponse();
            try {
                res.surveyId = createSurvey(req.caseId, req.q1, req.q2, req.q3, req.q4, req.q5, req.comments);
            } catch (Exception e) {
                res.error = e.getMessage();
            }
            results.add(res);
        }
        return results;
    }
}
