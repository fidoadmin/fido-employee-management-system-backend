export class EmailTemplateMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((emailTemplate) => {
            const mappedEmailTemplate = {
                Id: emailTemplate.guid?emailTemplate.guid:null,
                Name:emailTemplate.name?emailTemplate.name:null,
                Subject: emailTemplate.subject?emailTemplate.subject:null,
                Body: emailTemplate.body?emailTemplate.body:null,
                TemplateCode: emailTemplate.templatecode?emailTemplate.templatecode:null,
                Created: emailTemplate.created?emailTemplate.created:null,
                Modified: emailTemplate.modified?emailTemplate.modified:null,
                Deleted: emailTemplate.deleted?emailTemplate.deleted:null,
            };
            return mappedEmailTemplate;
        });
        return mappedData;
    }

    DtoToModel(emailTemplate: any) {
        const mappedEmailTemplate = {
            guid: emailTemplate.Id?emailTemplate.Id:null,
            name: emailTemplate.Name?emailTemplate.Name:null,
            subject: emailTemplate.Subject?emailTemplate.Subject:null,
            body: emailTemplate.Body?emailTemplate.Body:null,
            templatecode: emailTemplate.TemplateCode?emailTemplate.TemplateCode:null
        };
        return mappedEmailTemplate;
    }
}





