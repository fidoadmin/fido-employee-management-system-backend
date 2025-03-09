export class UserMapper {
    ModelToDto(data) {
        return data.map((user) => ({
            Id: user.id,
            FirstName: user.firstname ?? null,
            MiddleName: user.middlename ?? null, 
            LastName: user.lastname ?? null,
            Address: user.address ?? null,
            EmailAddress: user.emailaddress ?? null,
            MobileNumber: user.mobilenumber ?? null,
            LandlineNumber:user.landlinenumber?? null,
            StaffNumber: user.staffnumber ?? null,
            ClientName: user.clientname ?? null,
            RoleName: user.rolename ?? null,
            CompanyName: user.companyname ?? null,
            PositionName: user.positionname ?? null,
            DepartmentName: user.departmentname ?? null,
            Created: user.created ?? null,
            Modified: user.modified ?? null,
        }));
    }

    DtoToModel(user) {
        return {
            id: user.Id ?? null,
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
            mobilenumber:user.MobileNumber ?? null,
            landlinenumber:user.LandlineNumber ?? null,
            
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
