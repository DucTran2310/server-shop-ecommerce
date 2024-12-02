import { SupplierRequestAddType } from "~/models/request/supplierRequest.model";
import SupplierModel from "~/models/supplier.model";
import UserModel from "~/models/user.model";

class SupplierService {
  //================================================================================================================
  //** PRIVATE */

  //================================================================================================================

  //================================================================================================================
  //** SERVICE LOGIC */

  async addNewSupplier(body: SupplierRequestAddType) {
    const newSupplier = new SupplierModel(body)
    newSupplier.save()
    return newSupplier
  }

  async getListSuppliers() {
    const suppliers = await SupplierModel.find({ isDelete: { $ne: true } }).select('-isDelete')
    return suppliers
  }

  async updateSupplier(id: string, body: SupplierRequestAddType) {
    const suppliers = await SupplierModel.findByIdAndUpdate(id, body)
    const item = await SupplierModel.findById(suppliers?._id)
    return item
  }

  async deleteSupplier(id: string) {
    const suppliers = await SupplierModel.findByIdAndUpdate(id, { isDelete: true })
    return suppliers
  }

  //================================================================================================================
}

const supplierService = new SupplierService()
export default supplierService


