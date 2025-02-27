export class CheckoutInventoryMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((checkoutInventory) => {
            const mappedCheckoutInventory = {
                Id: checkoutInventory.guid,
                InventoryId: checkoutInventory.inventoryid ? checkoutInventory.inventoryid : null,
                SellerId: checkoutInventory.sellerid ? checkoutInventory.sellerid : null,
                Quantity: checkoutInventory.quantity ? checkoutInventory.quantity : null,
                CheckoutId: checkoutInventory.checkoutid ? checkoutInventory.checkoutid : null,
                Created: checkoutInventory.created ? checkoutInventory.created : null,
                Modified: checkoutInventory.modified ? checkoutInventory.modified : null,
                Deleted: checkoutInventory.deleted ? checkoutInventory.deleted : null
            };
            return mappedCheckoutInventory;
        });
        return mappedData;
    }

    DtoToModel(checkoutInventory: any) {
        const mappedCheckoutInventory = {
            guid: checkoutInventory.Id ? checkoutInventory.Id : null,
            inventoryid: checkoutInventory.InventoryId ? checkoutInventory.InventoryId : null,
            sellerid: checkoutInventory.SellerId ? checkoutInventory.SellerId : null,
            quantity: checkoutInventory.Quantity ? checkoutInventory.Quantity : null,
            checkoutid: checkoutInventory.CheckoutId ? checkoutInventory.CheckoutId : null,
            created: checkoutInventory.Created ? checkoutInventory.Created : null,
            modified: checkoutInventory.Modified ? checkoutInventory.Modified : null,
            deleted: checkoutInventory.Deleted ? checkoutInventory.Deleted : null
        };
        return mappedCheckoutInventory;
    }
}
