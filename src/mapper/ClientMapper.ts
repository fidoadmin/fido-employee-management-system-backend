export class ClientMapper {

    ModelToDto(data: any[]) {
        const mappedData = data.map((data) => {
            const mappeddata = {
                Id: data.guid,
                Name: data.name ? data.name : null,
                Code: data.code ? data.code : null,
                Created: data.created ? data.created : null,
                Modified: data.modified ? data.modified : null,
               
            };
            return mappeddata;
        });
        return mappedData;
    }

    DtoToModel(data: any,userId:string) {
        const mappeddata = {
            clientguid: data.Id ? data.Id : null,
            name: data.Name ? data.Name : null,
            code: data.Code ? data.Code : null,
        };
        return mappeddata;
    }
}
