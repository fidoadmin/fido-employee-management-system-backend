export class RoleMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((role) => {
      const mappedBranch = {
        ID: role.guid,
        Name: role.name ? role.name : null,
        Created: role.created ? role.created : null,
        Modified: role.modified ? role.modified : null,
        EntryPoint: role.entrypoint ? role.entrypoint : false,
        Code: role.code ? role.code : false,
      };
      return mappedBranch;
    });
    return mappedData;
  }

  DtoToModel(role: any) {
    const mappedBranch = {
      guid: role.ID,
      name: role.Name,
      code: role.Code,
    };
    return mappedBranch;
  }
}
