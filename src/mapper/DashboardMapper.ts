export class DashboardMapper {
    ModelToDto(results: any[]) {
        const mappedData = results.map((dashboard) => {
            const mapped = {
                CurrentInventory: dashboard.currentinventory,
                ExpirationInventory : dashboard.expirationinventory ,
                LowStockInventory : dashboard.lowstockinventory,
                Transactions : dashboard.transactions
            };
            return mapped;
        });
        return mappedData;
    }
}
