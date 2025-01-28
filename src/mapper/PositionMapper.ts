export class PositionMapper {
  ModelToDto(data: any[]) {
    const mappedData = data.map((position) => {
      const mappedBranch = {
        Id: position.guid,
        Name: position.name,
        Code:position.code?position.code:null,
        Created: position.created ? position.created : null,
        Modified: position.modified ? position.modified : null,
      };
      {
        return mappedBranch;
      }
    });
    return mappedData;
  }

  DtoToModel(position: any) {
    const mappedBranch = {
      guid: position.Id,
      name: position.Name,
      code:position.Code
    };
    return mappedBranch;
  }
}
 