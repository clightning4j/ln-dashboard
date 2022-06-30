export type Offer = {
      changes: {};
      decoded: {
        amount_msat: string;
        created_at: number;
        description: string;
        features: string;
        min_final_cltv_expiry: number;
        node_id: string;
        offer_id: string;
        payer_info: string;
        payer_key: string;
        payment_hash: string;
        relative_expiry: number;
        signature: string;
        timestamp: number;
        type: string;
        valid: boolean;
      };
      invoice: string;
  };
  