export interface BilletCashoutTransaction {
    id: number
    uuid: string
    identifier: string
    movimentCode: string
    transactionCode: string
    transactionIdentifier: string
    aditionalInfor: string
    receiverName: string
    receiverDocument: string
    brcode: string
    msgError: string
    tryAgain: number
    status: string
    countTimer: number
    refundMovimentCode: string
    createdAt: string
    updateAt: string
    banksId: number
    orderId: number
    feeSymbol: string
    price: number
    fee: number
    amount: number
    typeBoleto: string
    module: string
}