export class LeaveTypeMapper {
    ModelToDto(data: any[]) {
      const mappedData = data.map((leavetype) => {
        const mappedLeaveType = {
          Id: leavetype.guid,
          Name: leavetype.name,
          Code:leavetype.code?leavetype.code:null,
          Created: leavetype.created ? leavetype.created : null,
          Modified: leavetype.modified ? leavetype.modified : null,
        };
        {
          return mappedLeaveType;
        }
      });
      return mappedData;
    }
  
    DtoToModel(leavetype: any) {
      const mappedLeaveType = {
        guid: leavetype.Id,
        name: leavetype.Name,
        code:leavetype.Code
      };
      return mappedLeaveType;
    }
  }
   