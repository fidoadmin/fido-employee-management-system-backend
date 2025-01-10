export class DepartmentMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((department) => {
      const mappedBranch = {
        ID: department.guid,
        Name: department.name,
        Code:department.code?department.code:null,
        Created: department.created ? department.created : null,
        Modified: department.modified ? department.modified : null,
        EntryPoint: department.entrypoint ? department.entrypoint : false,
      };
      {
        return mappedBranch;
      }
    });
    return mappedData;
  }

  DtoToModel(department: any) {
    const mappedBranch = {
      guid: department.ID,
      name: department.Name,
      code:department.Code
    };
    return mappedBranch;
  }
}
