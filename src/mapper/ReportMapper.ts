export class ReportMapper {
    // Existing method for mapping to DTO (with InventoryDetails in JSON format)
    ModelToDto(data: any[]) {
        const mappedData = data.map((item) => {
            const mappedReport = {
                Customer: item.salestocustomer ? item.salestocustomer : null, 
                InventoryDetails: item.inventorydetails ? item.inventorydetails.map((detail) => ({
                    InventoryDescription: detail.inventorydescription ? detail.inventorydescription : null,
                    ShortName: detail.shortname ? detail.shortname : null,
                    Quantity: detail.quantity ? detail.quantity : null,
                    Date: detail.datecreated ? detail.datecreated : null,
                    ExpirationDate: detail.expirationdate ? detail.expirationdate : null
                })) : []
            };
            return mappedReport;
        });
        return mappedData;
    }

    ModelToFlatDtoForCustomerWithSeparateRows(data: any[]) {
        const result = [];
        data.forEach((item) => {
            const customerName = item.salestocustomer ? item.salestocustomer : null;
            item.inventorydetails.forEach((detail, index) => {
                result.push({
                    Customer: index === 0 ? customerName : '',
                    InventoryDescription: detail.inventorydescription ? detail.inventorydescription : null,
                    ShortName: detail.shortname ? detail.shortname : null,
                    Quantity: detail.quantity ? detail.quantity : null,
                    Date: detail.datecreated ? detail.datecreated : null,
                    ExpirationDate: detail.expirationdate ? detail.expirationdate : null
                });
            });
        });
        return result;
    }
}


