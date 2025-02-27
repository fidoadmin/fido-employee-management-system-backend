export class EmployeeMapper {
  ModelToDto(data) {
      return data.map((user) => ({
          Id: user.guid,
          FirstName: user.firstname ?? null,
          MiddleName: user.middlename ?? null, 
          LastName: user.lastname ?? null,
          Address: user.address ?? null,
          EmailAddress: user.emailaddress ?? null,
          PhoneNumber: user.phonenumber ?? null,
          StaffNumber: user.staffnumber ?? null,
          Created: user.created ?? null,
          Modified: user.modified ?? null,
          CompanyName:user.companyname ??null,
          DepartmentName:user.departmentname ?? null,
          RoleName:user.rolename ?? null, 
          PositionName:user.positionname ?? null,
          ClientName:user.clientname?? null,


        }));
  }

  DtoToModel(user) {
      return {
          guid: user.Id ?? null,
          firstname: user.FirstName ?? null,
          middlename: user.MiddleName ?? null, 
          lastname: user.LastName ?? null,
          address: user.Address ?? null,
          emailaddress: user.EmailAddress ?? null,
          phonenumber: user.PhoneNumber ?? null,
          password: user.Password ?? null,
          clientid: user.ClientId ?? null,
          roleid: user.RoleId ?? null,
          departmentid: user.DepartmentId ?? null,
          companyid: user.CompanyId ?? null,
          positionid: user.PositionId ?? null, 
          
        };
  }

  ModelPassword(user) {
      return {
          id: user.Id ?? null,
          changepassword: user.Password ?? null,
          operation: 'updatepassword',
      };
  }
}
