export class BranchMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((branch) => {
            const mappedBranch = {
                Id: branch.guid,
                Name: branch.name ? branch.name : null,
                Address: branch.address ? branch.address : null,
                EmailAddress: branch.emailaddress ? branch.emailaddress : null,
                PhoneNumber: branch.phonenumber ? branch.phonenumber : null,
                IsEntryPoint:branch.entrypoint ? branch.entrypoint :false,
                Created: branch.created ? branch.created : null,
                Modified: branch.modified ? branch.modified : null,
             
            };
            return mappedBranch;
        });
        return mappedData;
    }

    DtoToModel(branch: any) {
        const mappedBranch = {
            branchguid: branch.Id ? branch.Id : null,
            name: branch.Name ? branch.Name : null,
            address: branch.Address ? branch.Address : null,
            emailaddress: branch.EmailAddress ? branch.EmailAddress : null,
            phonenumber: branch.PhoneNumber ? branch.PhoneNumber : null,
            isentrypoint: branch.IsEntryPoint?branch.IsEntryPoint:false
        };
        return mappedBranch;
    }
}
