export class ClientMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((client) => {
      const mappedBranch = {
        ID: client.guid,
        Name: client.name ? client.name : null,
        Code: client.code ? client.code : false,
        Created: client.created ? client.created : null,
        Modified: client.modified ? client.modified : null,
        EntryPoint: client.entrypoint ? client.entrypoint : false,
      };
      return mappedBranch;
    });
    return mappedData;
  }
  DtoToModel(client: any) {
    const mappedBranch = {
      guid: client.ID,
      name: client.Name,
      code: client.Code,
    };
    return mappedBranch;
  }
}
