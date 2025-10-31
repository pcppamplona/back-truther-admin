export interface BridgeTransaction {
    id: number
    user_id: number
	wallet_id: number
	from_address: string
	to_address: string
	value: number
	tx_hash: string
	status: string
	created_at: string
	flow: string
	type: string
	symbol: string
	retry_count: number
	protocol_destination: string
}