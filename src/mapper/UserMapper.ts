export class UserMapper {
    ModelToDto(data) {
        const mappedData = data.map((users) => {
            const mappedUser = {
                Id: users.guid,
                FirstName: users.firstname ? users.firstname : null,
                LastName: users.lastname ? users.lastname : null,
                Address: users.address ? users.address : null,
                EmailAddress: users.emailaddress ? users.emailaddress : null,
                PhoneNumber: users.phonenumber ? users.phonenumber : null,
                StaffNumber:users.staffnumber ?users.staffnumber  :null,
                ClientName:users.clientname?users.clientname :null,
                RoleName:users.rolename?users.rolename :null,
                CompanyName:users.companyname?users.companyname :null,
                Created: users.created ? users.created : null,
                Modified: users.modified ? users.modified :null,
            };
            return mappedUser;
        });
        return mappedData;
    }

    DtoToModel(user) {
        const mappedUser = {
            userguid: user.Id ? user.Id : null,
            firstname: user.FirstName ? user.FirstName : null,
            lastname: user.LastName ? user.LastName : null,
            address: user.Address ? user.Address : null,
            emailaddress: user.EmailAddress ? user.EmailAddress : null,
            phonenumber: user.PhoneNumber ? user.PhoneNumber : null,
            password: user.Password ? user.Password : null,
            clientguid: user.ClientId ? user.ClientId :null,
            roleguid:user.RoleId ? user.RoleId :null,
            companyguid:user.CompanyId ? user.CompanyId :null
        };
        return mappedUser;
    }

    ModelPassword(user) {
        return {
            id: user.Id ?? null,
            changepassword: user.Password ?? null,
            operation: 'updatepassword',
        };
    }
}
