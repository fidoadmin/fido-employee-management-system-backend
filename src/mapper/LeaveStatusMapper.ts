export class LeaveStatusMapper {
    ModelToDto(data: any[]) {
      const mappedData = data.map((leavestatus) => {
        const mappedLeaveStatus = {
          Id: leavestatus.guid,
          Name: leavestatus.name,
          Code:leavestatus.code?leavestatus.code:null,
          Created: leavestatus.created ? leavestatus.created : null,
          Modified: leavestatus.modified ? leavestatus.modified : null,
        };
        {
          return mappedLeaveStatus;
        }
      });
      return mappedData;
    }
  
    DtoToModel(leavestatus: any) {
      const mappedLeaveStatus = {
        guid: leavestatus.Id,
        name: leavestatus.Name,
        code:leavestatus.Code
      };
      return mappedLeaveStatus;
    }
  }
   