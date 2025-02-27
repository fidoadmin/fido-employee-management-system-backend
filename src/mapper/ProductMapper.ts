export class ProductMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((product) => {
            const mappedProduct = {
                Id: product.guid,
                Name: product.name ? product.name : null,
                Address: product.address ? product.address : null,
                Emailaddress: product.emailaddress ? product.emailaddress : null,
                Phonenumber: product.phonenumber ? product.phonenumber : null,
                Companyid:product.companyguid?product.companyguid:null,
                Created: product.created ? product.created : null,
                Modified: product.modified ? product.modified : null,
            };
            return mappedProduct;
        });
        return mappedData;
    }

    DtoToModel(productDto: any) {
        const mappedProduct = {
            guid: productDto.Id ? productDto.Id : null,
            name: productDto.Name ? productDto.Name : null,
            address: productDto.Address ? productDto.Address : null,
            emailaddress: productDto.Emailaddress ? productDto.Emailaddress : null,
            phonenumber: productDto.Phonenumber ? productDto.Phonenumber : null,
            companyguid: productDto.Companyid ? productDto.Companyid : null
        };
        return mappedProduct;
    }
}
