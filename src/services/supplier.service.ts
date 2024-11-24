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

  //================================================================================================================
}

const supplierService = new SupplierService()
export default supplierService


