export type GetInfoNode = {
  id: String;
  alias: String;
  color: String;
  num_peers: Number;
  num_pending_channels: Number;
  num_active_channels: Number;
  num_inactive_channels: Number;
  address: Array<NodeAddress>;
  binding: Array<NodeAddress>;
  version: String;
  blockheight: Number;
  network: String;
  msatoshi_fees_collected: Number;
  fees_collected_msat: String;
  lightning_dir: String;
};

export type NodeAddress = {
  type: string;
  address: string;
  port: number;
};

export type ListFunds = {
  outputs: Array<Object>;
  channels: Array<Object>;
};
