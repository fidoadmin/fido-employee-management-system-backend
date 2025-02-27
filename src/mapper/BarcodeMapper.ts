export class BarcodeMapper {
    ModelToDto(data: any[]) {
        const mappedData = data.map((item) => item.barcode);
        return mappedData;
    }
}
