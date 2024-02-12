import { AppDataSource } from "../database/config";
import { encrypt } from "../helpers/encrypt";
import { BusinessInterface, BusinessRepositoryInterface } from "../interfaces/business.interface";
import { Businesses } from "../entity/business.entity";


export class BusinessAdapdter implements BusinessRepositoryInterface {
  async findAll() {
    const businessRepository = AppDataSource.getRepository(Businesses);
    const business = await businessRepository.find();
    return business;
  }
  async create(buss: BusinessInterface) {
    const newBusiess = new Businesses();
    newBusiess.name = buss.name;
    newBusiess.owner_id = buss.owner_id;
    newBusiess.created_by = buss.created_by;
    const businessRepository = AppDataSource.getRepository(Businesses);
    await businessRepository.save(newBusiess);
    return newBusiess;
  }
  async update(id: number, duplo: BusinessInterface) {
    const businessRepository = AppDataSource.getRepository(Businesses);
    const businessToUpdate = await businessRepository.findOneBy({ id });
    if (!businessToUpdate) {
      throw new Error("Business not found");
    }
    businessToUpdate.name = duplo.name;
    businessToUpdate.owner_id = duplo.owner_id;
    await businessRepository.save(businessToUpdate);

    return businessToUpdate;
  }
  async delete(id: number) {
    const businessRepository = AppDataSource.getRepository(Businesses);
    const businessToDelete = await businessRepository.findOneBy({ id });
    if (!businessToDelete) {
      throw new Error("Business not found");
    }
    await businessRepository.delete(businessToDelete);

    return businessToDelete;
  }
  async findById(id: number) {
    const businessRepository = AppDataSource.getRepository(Businesses);
    return await businessRepository.findOneBy({ id });
  }

}
