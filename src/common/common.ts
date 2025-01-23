export class CommonService {
  import
  async AddModelData(model, data) {
    if (!model) {
      throw new Error("Model is undefined in AddModelData.");
    }
    try {
      const result: any = await model.create(data);
      return result;
    } catch (error) {
      console.error("Error adding data:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  async UpdateModelData(model, whereClause, newData) {
    if (!model) {
      throw new Error("Model is undefined in UpdateModelData.");
    }
    try {
      const result: any = await model.update(newData, { where: whereClause });
      return result;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  }

  async GetModelData(model, whereClause) {
    if (!model) {
      throw new Error("Model is undefined in GetModelData.");
    }
    try {
      const result: any = await model.findOne({
        where: whereClause,
      });
      return result ? result.dataValues : null; // Handle case when no data is found
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }

  async isUUID(guid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(guid);
  }

  generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
