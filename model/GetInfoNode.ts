export type GetInfoNode = {
  id: String;
  alias: String;
  color: String;
  num_peers: BigInteger;
  num_pending_channels: BigInteger;
  num_active_channels: BigInteger;
  num_inactive_channels: BigInteger;
  address: Array<NodeAddress>;
  binding: Array<NodeAddress>;
  version: String;
  blockheight: BigInteger;
  network: String;
  msatoshi_fees_collected: BigInteger;
  fees_collected_msat: String;
  lightning_dir: String;
};

export type NodeAddress = {
  type: string;
  address: string;
  port: number;
};
