export class AuthenticationMapper {
    ModelToDTO(data: any,source:any) {
        const mappedLogin = {
            userid: data.id,
            clientid: data.clientid,
            source: source,
            operation :'insert'

        };
        return mappedLogin;
    }

    
    LoginResponse(data: any,userInfo:any) {
        // if (data[0].dropdown ){
            let listdropdown = data[0].dropdown;
            const dropdownlist = listdropdown.map(dropdown => ({
                Name: dropdown.name,
                URI: dropdown.uri,
                Value: dropdown.value
            }));
            
        // }
        const mapped = {
            UserId:userInfo.guid,
            AuthKey: data[0].authkey,
            FirstName: userInfo.firstname,
            LastName: userInfo.lastname,
            EmailAddress: userInfo.emailaddress,
            RoleId:null,
            ClientName:data[0].clientname,
            Dropdown:dropdownlist
        };
        return mapped;
    }
}
