export class CompanyMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((company) => {
      const mappedCompany = {
        ID: company.guid,
        Name: company.name ? company.name : null,
        Address: company.address ? company.address : null,
        EmailAddress: company.emailaddress ? company.emailaddress : null,
        PhoneNumber: company.phonenumber ? company.phonenumber : null,
        PAN: company.pan ? company.pan : null,
        ClientId: company.clientid ? company.clientid : null,
        Created: company.created ? company.created : null,
        Modified: company.modified ? company.modified : null,
        Deleted: company.deleted ? company.deleted : null,
      };
      return mappedCompany;
    });
    return mappedData;
  }

  DtoToModel(company: any) {
    const mappedCompany = {
      guid: company.ID,
      name: company.Name ? company.Name : null,
      address: company.Address ? company.Address : null,
      emailaddress: company.EmailAddress ? company.EmailAddress : null,
      phonenumber: company.PhoneNumber ? company.PhoneNumber : null,
      pan: company.PAN ? company.PAN : null,
      clientid: company.ClientId ? company.ClientId : null,
      created: company.Created ? company.Created : null,
      modified: company.Modified ? company.Modified : null,
      deleted: company.Deleted ? company.Deleted : null,
    };
    return mappedCompany;
  }
}
