export class CompanyHolidayMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((companyHoliday) => {
            const mappedCompanyHoliday = {
                Id: companyHoliday.guid ? companyHoliday.guid : null,
                Name: companyHoliday.name ? companyHoliday.name : null,
                Event: companyHoliday.event ? companyHoliday.event : null,
                Year: companyHoliday.year ? companyHoliday.year : null,
                Month: companyHoliday.month ? companyHoliday.month : null,
                Day: companyHoliday.day ? companyHoliday.day : null,
                IsFixed: companyHoliday.isfixed ? companyHoliday.isfixed : null,
                IsHoliday: companyHoliday.isholiday ? companyHoliday.isholiday : null,
                CompanyName: companyHoliday.companyname ? companyHoliday.companyname : null,
                CompanyId: companyHoliday.companyid ? companyHoliday.companyid : null,
                Weekends: companyHoliday.weekends ? companyHoliday.weekends : null,
                Created: companyHoliday.created ? companyHoliday.created : null,
                Modified: companyHoliday.modified ? companyHoliday.modified : null

            };
            return mappedCompanyHoliday;
        });
        return mappedData;
    }

    DtoToModel(companyHoliday: any) {
        const mappedCompanyHoliday = {
            guid: companyHoliday.Id,
            name: companyHoliday.Name,
            event: companyHoliday.Event,
            year: companyHoliday.Year,
            month: companyHoliday.Month,
            day: companyHoliday.Day,
            isfixed: companyHoliday.IsFixed,
            isholiday: companyHoliday.IsHoliday,
            companyname: companyHoliday.CompanyName,
            companyid: companyHoliday.CompanyId,
            weekends:companyHoliday.Weekends,
            created: companyHoliday.Created,
            modified: companyHoliday.Modified,
        };
        return mappedCompanyHoliday;
    }
}
