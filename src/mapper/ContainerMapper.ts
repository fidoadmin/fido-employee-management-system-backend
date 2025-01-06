export class ContainerMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((container) => {
            const mappedContainer = {
                Id: container.guid,
                Type: container.type ? container.type : null,
                PackSize: container.packsizes ?container.packsizes:null,
                // CategoryId: container.categoryguid?container.categoryguid : null,
                // CategoryName:container.categoryname?container.categoryname:null,
                //Created: container.created ? container.created : null,
                //Modified:container.modified?container.modified:null
            };
            return mappedContainer;
        });
        return mappedData;
    }

    DtoToModel(container: any,req:any) {
        const mappedContainer = {
            guid: container.Id ? container.Id : null,
            type: container.Type ? container.Type : null,
            numberofunits: container.NumberOfUnits ? container.NumberOfUnits : null,
            packsizes: container.PackSizes ? container.PackSizes : null,
            size: container.Size ? container.Size : null,
            userid:req.userId,
            categoryguid: container.CategoryId  ? container.CategoryId : null,
        };
        return mappedContainer;
    }
}
