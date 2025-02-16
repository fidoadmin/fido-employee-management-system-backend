export class EmployeeMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((employee) => {
      const mappedEmployee = {
        Id: employee.guid,
        FirstName: employee.firstname,
        LastName: employee.lastname,
        MiddleName: employee.middlename ? employee.middleName : null,
        Address: employee.address,
        EmailAddress: employee.emailaddress,
        PhoneNumber: employee.phonenumber,
        Password: employee.password,
        DepartmentName: employee.departmentname,
        PositionName: employee.positionname,
        RoleName: employee.rolename,
        Created: employee.created ? employee.created : null,
        Modified: employee.modified ? employee.modified : null,
      };
      return mappedEmployee;
    });
    return mappedData;
  }

  DtoToModel(employee: any) {
    const mappedEmployee = {
      guid: employee.Id,
      firstname: employee.FirstName,
      lastname: employee.LastName,
      middlename: employee.MiddleName,
      address: employee.Address,
      emailaddress: employee.EmailAddress,
      phonenumber: employee.PhoneNumber,
      password: employee.Password,
      departmentid: employee.DepartmentName,
      positionid: employee.PositionName,
      roleid: employee.RoleName,
      created: employee.Created,
      modified: employee.Modified,
    };
    return mappedEmployee;
  }
}
