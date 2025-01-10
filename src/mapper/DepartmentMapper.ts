export class DepartmentMapper {
  ModelToDto(data: any[]) {
      const mappedData = data.map((department) => {
          const mappedBranch = {
            //   Id: department.guid,

            ID:department.guid,
              Name: department.name ? department.name : null,
              Code:department.code,
              // Address: department.address ? department.address : null,
            //   ID:department.guid;
              // Emailaddress: department.emailaddress ? department.emailaddress : null,
            //   Phonenumber: department.phonenumber ? department.phonenumber : null,
              // Companyguid:department.companyid?department.companyid:null,
              Created: department.created ? department.created : null,
              Modified: department.modified ? department.modified : null,
              EntryPoint:department.entrypoint ? department.entrypoint :false
              
          };
          return mappedBranch;
      });
      return mappedData;
  }

  DtoToModel(department: any) {
      const mappedBranch = {
        guid:department.ID,
        // guid:department.ID,
        //   guid: department.Id ? department.Id : null,
          name: department.Name ? department.Name : null,
          code:department.Code? department.Code :null
          // address: department.Address ? department.Address : null,
          // emailaddress: department.Emailaddress ? department.Emailaddress : null,
        //   phonenumber: department.Phonenumber ? department.Phonenumber : null,
          // companyguid:department.Companyguid?department.Companyguid:null
      };
      return mappedBranch;
  }
}
