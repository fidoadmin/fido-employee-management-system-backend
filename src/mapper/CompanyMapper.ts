export class CompanyMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((company) => {
      const mappedCompany = {
        Id: company.guid,
        Name: company.name ,
        Address: company.address ,
        EmailAddress: company.emailaddress ,
        PhoneNumber:company.phonenumber ,
        Pan: company.pan ,
        Client: company.clientname ,
        District:company.district,
        Province:company.province,
        LocalLevel:company.locallevel,
        Ward:company.ward,
        Code:company.code,
        Created: company.created ,
        Modified: company.modified,
        Deleted: company.deleted ,
        ClientId:company.clientid
      };
      return mappedCompany;
    });
    return mappedData;
  }

  DtoToModel(company: any) {
    const mappedCompany = {
      guid: company.Id,
      name: company.Name,
      address: company.Address,
      emailaddress: company.EmailAddress,
      phonenumber: company.PhoneNumber ,
      pan: company.Pan ,
      clientname:company.Client,
      district:company.District,
      province:company.Province,
      locallevel:company.LocalLevel,
      ward:company.Ward,
      code:company.Code,
      clientid:company.ClientId,
      created: company.Created,
      modified: company.Modified ,
      deleted: company.Deleted ,
      
    };
    return mappedCompany;
  }
} 
