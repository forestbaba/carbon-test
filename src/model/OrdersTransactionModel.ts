import mongoose from 'mongoose';

export interface OrderTransactionDocument extends mongoose.Document{
    businessID: number;
    amount: number;
    status: string

  
}
const OrderTransactionDocumentSchema = new mongoose.Schema({
    businessID:{type:String},
    amount:{type: Number},
    status:{type: String},
},{
    timestamps: true
})

const OrderTransaction = mongoose.model<OrderTransactionDocument>("OrderTransactions", OrderTransactionDocumentSchema);
export default OrderTransaction;
