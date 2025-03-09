export class DropdownMapper {

    ModelToDto(data: any[]) {
        const mappedData = data.map((data) => {
            const mappeddata = {
                Id: data.guid,
                Name: data.name ? data.name : null
            };
            return mappeddata;
        });
        return mappedData;
    }

    
}