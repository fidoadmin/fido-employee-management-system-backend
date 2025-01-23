export class CommonService {
  async AddModelData(model, data) {
    try {
      const result: any = await model.create(data);
      return result;
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  async UpdateModelData(model, whereClause, newData) {
    try {
      const result: any = await model.update(newData, { where: whereClause });
      return result;
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  async GetModelData(model, whereClause) {
    try {
      const result: any = await model.findOne({
        where: whereClause,
      });
      
      if (!result) {
        console.error('No record found for the given GUID');
        return;
    }
      console.log(result.dataValues);
      return result.dataValues;
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };
  async isUUID(guid: string): Promise<boolean> {
    // if (typeof guid !== 'string'){
    //   return false;
    // }
    // Simplified regex for validating UUID (version 1 to 5)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(guid.trim());
  }
  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}