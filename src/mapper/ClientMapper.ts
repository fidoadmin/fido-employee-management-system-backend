export class ClientMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((client) => {
      const mappedBranch = {
        Id: client.guid,
        Name: client.name,
        Code:client.code?client.code:null,
        Created: client.created ? client.created : null,
        Modified: client.modified ? client.modified : null,
      };
      {
        return mappedBranch;
      }
    });
    return mappedData;
  }

  DtoToModel(client: any) {
    const mappedBranch = {
      guid: client.Id,
      name: client.Name,
      code:client.Code
    };
    return mappedBranch;
  }
}
