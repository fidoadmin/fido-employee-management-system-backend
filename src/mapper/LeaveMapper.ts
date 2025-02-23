export class LeaveMapper {
    ModelToDto(data: any[]) {
      return data.map((leave) => ({
        Id: leave.guid,
        StartDate: leave.startdate,
        EndDate: leave.enddate,
        NumberOfDays: leave.numberofdays,
        ApproverComment: leave.approvercomment ? leave.approvercomment : null,
        LeaveTypeId: leave.leavetypeid,
        LeaveTypeName: leave.leavetypename ? leave.leavetypename : null,
        StatusId: leave.statusid ? leave.statusid : null,
        StatusName: leave.statusname ? leave.statusname : null,
        ApprovalCancelReason:leave.approvalcancelreason ? leave.approvalcancelreason : null,
        Reason: leave.reason ? leave.reason : null,
        EmployeeId: leave.employeeid,
        EmployeeFirstName: leave.employeefirstname ? leave.employeefirstname : null,
        EmployeeMiddleName: leave.employeemiddlename ? leave.employeemiddlename : null,
        EmployeeLastName: leave.employeelastname ? leave.employeelastname : null,
        Created: leave.created ? leave.created : null,
        Modified: leave.modified ? leave.modified : null,
        ApproverId: leave.approverid ? leave.approverid : null,
        ApproverName: leave.approvername ? leave.approvername : null,
        ApproverMiddleName: leave.approvermiddlename ? leave.approvermiddlename : null,
        ApproverLastName: leave.approverlastname ? leave.approverlastname : null
    }));
    }
  
    DtoToModel(leave: any) {
      return {
        guid: leave.Id,
        startdate: leave.StartDate,
        enddate: leave.EndDate,
        numberofdays: leave.NumberOfDays,
        approvercomment: leave.ApproverComment,
        leavetypeid: leave.LeaveTypeId,
        leavetypename: leave.LeaveTypeName,
        statusid: leave.StatusId,
        statusname: leave.StatusName,
        approvalcancelreason:leave.ApprovalCancelReason,
        reason: leave.Reason,
        employeeid: leave.EmployeeId,
        created: leave.Created,
        modified: leave.Modified,
        approverid: leave.ApproverId,
        employeefirstname: leave.EmployeeFirstName,
        employeemiddlename: leave.EmployeeMiddleName,
        employeelastname: leave.EmployeeLastName,
      
      };
    }
  }
  