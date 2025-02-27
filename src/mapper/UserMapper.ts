export class UserMapper {
    ModelToDto(data) {
        return data.map((user) => ({
            Id: user.id,
            FirstName: user.firstname ?? null,
            MiddleName: user.middlename ?? null, // Added MiddleName
            LastName: user.lastname ?? null,
            Address: user.address ?? null,
            EmailAddress: user.emailaddress ?? null,
            PhoneNumber: user.phonenumber ?? null,
            StaffNumber: user.staffnumber ?? null,
            ClientId: user.clientid ?? null,
            RoleId: user.roleid ?? null,
            CompanyId: user.companyid ?? null,
            PositionId: user.positionid ?? null,
            DepartmentId: user.departmentid ?? null,
            Created: user.created ?? null,
            Modified: user.modified ?? null,
        }));
    }

    DtoToModel(user) {
        return {
            id: user.Id ?? null,
            firstname: user.FirstName ?? null,
            middlename: user.MiddleName ?? null, // Added MiddleName
            lastname: user.LastName ?? null,
            address: user.Address ?? null,
            emailaddress: user.EmailAddress ?? null,
            phonenumber: user.PhoneNumber ?? null,
            password: user.Password ?? null,
            clientid: user.ClientId ?? null,
            roleid: user.RoleId ?? null,
            departmentid: user.DepartmentId ?? null,
            companyid: user.CompanyId ?? null,
            positionid: user.PositionId ?? null, // Added PositionId
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
