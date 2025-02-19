export class AuthenticationMapper {
  ModelToDTO(data: any,source:any) {
      const mappedLogin = {
          userid: data.id,
          companyid: data.companyid,
          clientid:data.clientid,
          source: source,
          operation :'insert'
       };
      return mappedLogin;
  }

  
  LoginResponse(data: any,userInfo:any) {
      const mapped = {
          UserId:userInfo.guid,
          AuthKey: data.results,
          FirstName: userInfo.firstname,
          LastName: userInfo.lastname,
          EmailAddress: userInfo.emailaddress,
          RoleId:null
      };
      return mapped;
  }
}
