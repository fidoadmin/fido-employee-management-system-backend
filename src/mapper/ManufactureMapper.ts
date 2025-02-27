export class ManufactureMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((manufacture) => {
            const mappedManufacture = {
                Id: manufacture.guid,
                Name: manufacture.name ? manufacture.name : null,
                Emailaddress: manufacture.emailaddress ? manufacture.emailaddress : null,
                Phonenumber: manufacture.phonenumber ? manufacture.phonenumber : null,
                Address: manufacture.address ? manufacture.address : null,
                Created: manufacture.created ? manufacture.created : null,
                Modified: manufacture.modified ? manufacture.modified : null,
                Deleted: manufacture.deleted ? manufacture.deleted : null,
            };
            return mappedManufacture;
        });
        return mappedData;
    }

    DtoToModel(manufacture: any) {
        const mappedManufacture = {
            guid: manufacture.Id ? manufacture.Id : null,
            name: manufacture.Name ? manufacture.Name : null,
            emailaddress: manufacture.Emailaddress ? manufacture.Emailaddress : null,
            phonenumber: manufacture.Phonenumber ? manufacture.Phonenumber : null,
            address: manufacture.Address ? manufacture.Address : null
        };
        return mappedManufacture;
    }
}
