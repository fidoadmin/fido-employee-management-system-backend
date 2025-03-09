export class CompanyMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((company) => {
      const mappedCompany = {
        Id: company.guid,
        Name: company.name ,
        Address: company.address ,
        EmailAddress: company.emailaddress ,
        MobileNumber:company.mobilenumber ,
        LandlineNumber:company.landlinenumber,
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
      mobilenumber: company.MobileNumber ,
      landlinenumber:company.LandlineNumber,
      pan: company.Pan ,
      district:company.District,
      province:company.Province,
      locallevel:company.LocalLevel,
      ward:company.Ward,
      code:company.Code,
      clientid:company.ClientId,
      
    };
    return mappedCompany;
  }
} 
