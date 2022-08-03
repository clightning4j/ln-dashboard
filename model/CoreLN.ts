export type GetInfoNode = {
  id: string;
  alias: string;
  color: string;
  num_peers: Number;
  num_pending_channels: Number;
  num_active_channels: Number;
  num_inactive_channels: Number;
  address: Array<NodeAddress>;
  binding: Array<NodeAddress>;
  version: string;
  blockheight: Number;
  network: string;
  msatoshi_fees_collected: Number;
  fees_collected_msat: string;
  lightning_dir: string;
};

export type NodeAddress = {
  type: string;
  address: string;
  port: number;
};

export type ListFunds = {
  outputs: Array<Object>;
  channels: Array<Channel>;
};

export type Channel = {
  peer_id: string;
  amount_msat: number | string;
  node_info: LNNode;
  connected: boolean;
  state: string;
};

export type ListNodes = {
  nodes: Array<LNNode>;
};

export type LNNode = {
  node_id: string;
  alias: string;
  color: string;
};

export type ListOffers = {
  offers: Array<OfferInfo>;
};

export type OfferInfo = {
  bolt12: string;
  active: boolean;
  info: OfferDecode;
  single_use: boolean;
};

export type OfferDecode = {
  label: string | undefined;
  description: string;
};
