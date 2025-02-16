export class CalendarMapper {
    ModelToDto(data: any[]) {
      const mappedData = data.map((calendar) => {
        const mappedCalendar = {
          Id: calendar.id,
          EngDate: calendar.engdate,
          NepDate: calendar.nepdate,
          EngYear: calendar.engyear,
          EngMonth: calendar.engmonth,
          EngDay: calendar.engday,
          EnglMonth: calendar.englmonth,
          NepYear: calendar.nepyear,
          NepMonth: calendar.nepmonth,
          NepDay: calendar.nepday,
          NeplMonth: calendar.neplmonth,
          Days: calendar.days,
          EnglDays: calendar.engldays,
          NeplDays: calendar.nepldays,
          NepUYear: calendar.nepuyear,
          NepUMonth: calendar.nepumonth,
          NepUDay: calendar.nepuday,
          Events: calendar.events,
          Holiday: calendar.holiday,
          Parwa: calendar.parwa,
          Created: calendar.created ? calendar.created : null,
          Modified: calendar.modified ? calendar.modified : null,
          Deleted: calendar.deleted ? calendar.deleted : null,
        };
        return mappedCalendar;
      });
      return mappedData;
    }
  
    DtoToModel(calendar: any) {
      const mappedCalendar = {
        id: calendar.Id,
        engdate: calendar.EngDate,
        nepdate: calendar.NepDate,
        engyear: calendar.EngYear,
        engmonth: calendar.EngMonth,
        engday: calendar.EngDay,
        englmonth: calendar.EnglMonth,
        nepyear: calendar.NepYear,
        nepmonth: calendar.NepMonth,
        nepday: calendar.NepDay,
        neplmonth: calendar.NeplMonth,
        days: calendar.Days,
        engldays: calendar.EnglDays,
        nepldays: calendar.NeplDays,
        nepuyear: calendar.NepUYear,
        nepumonth: calendar.NepUMonth,
        nepuday: calendar.NepUDay,
        events: calendar.Events,
        holiday: calendar.Holiday,
        parwa: calendar.Parwa,
        created: calendar.Created,
        modified: calendar.Modified,
        deleted: calendar.Deleted,
      };
      return mappedCalendar;
    }
  }
  