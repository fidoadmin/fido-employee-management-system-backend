export class DepartmentMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((department) => {
      const mappedBranch = {
        Id: department.guid,
        Name: department.name,
        Code:department.code?department.code:null,
        SubDepartmentName:department.subdepartmentname ? department.subdepartmentname :null,
        ClientName:department.clientname ? department.clientname:null,
        Created: department.created ? department.created : null,
        Modified: department.modified ? department.modified : null,
        ClientId:department.clientid? department.clientid:null,
        ParentId:department.parentid? department.parentid:null
      };
      {
        return mappedBranch;
      }
    });
    return mappedData;
  }

  DtoToModel(department: any) {
    const mappedBranch = {
      guid: department.Id,
      name: department.Name,
      code:department.Code,
      parentid:department.ParentId,
      clientid:department.ClientId,
      subdepartmentguid:department.SubDepartmentId
    };
    return mappedBranch;
  }
}
 