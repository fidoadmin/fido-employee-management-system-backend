export class CompanyMapper {
    ModelToDto(data) {
        const mappedData = data.map((company) => {
            const mappedCompany = {
                Id: company.guid,
                Name: company.name ? company.name : null,
                Address: company.address ? company.address : null,
                EmailAddress: company.emailaddress ? company.emailaddress : null,
                PhoneNumber: company.phonenumber ? company.phonenumber : null,
                PanNumber: company.pannumber ? company.pannumber : null,
                BranchName:company.branchname ? company.branchname:null,
                ClientName:company.clientname ? company.clientname:null,
                CompanyType:company.companytype ? company.companytype:null,
                Created: company.created ? company.created : null,
                Modified: company.modified ? company.modified :null,
            };
            return mappedCompany;
        });
        return mappedData;
    };

    DtoToModel(company) {
        const mappedCompany = {
            companyguid: company.Id ? company.Id : null,
            name: company.Name ? company.Name : null,
            address: company.Address ? company.Address : null,
            emailaddress: company.EmailAddress ? company.EmailAddress : null,
            phonenumber: company.PhoneNumber ? company.PhoneNumber : null,
            pannumber: company.PanNumber ? company.PanNumber : null,
            clientguid: company.ClientId ? company.ClientId:null,
            companytypeguid: company.CompanyTypeId ? company.CompanyTypeId:null,
            branchguid: company.BranchId ? company.BranchId:null
        };
        return mappedCompany;
    };
}
