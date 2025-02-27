export class CompanyTypeMapper {

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

}
