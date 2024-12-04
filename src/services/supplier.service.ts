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

  async getListSuppliers(query: { pageSize?: number, page?: number }) {
    const { pageSize = 10, page = 1 } = query // Giá trị mặc định nếu không có query

    const skip = (page - 1) * pageSize

    const suppliers = await SupplierModel.find({ isDelete: { $ne: true } })
      .select('-isDelete')
      .limit(pageSize)
      .skip(skip)

    const total = await SupplierModel.countDocuments({ isDelete: { $ne: true } })

    return {
      suppliers,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      }
    }
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


