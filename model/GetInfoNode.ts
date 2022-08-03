export type GetInfoNode = {
  id: string;
  alias: string;
  color: string;
  num_peers: BigInteger;
  num_pending_channels: BigInteger;
  num_active_channels: BigInteger;
  num_inactive_channels: BigInteger;
  address: Array<NodeAddress>;
  binding: Array<NodeAddress>;
  version: string;
  blockheight: BigInteger;
  network: string;
  msatoshi_fees_collected: BigInteger;
  fees_collected_msat: string;
  lightning_dir: string;
};

export type NodeAddress = {
  type: string;
  address: string;
  port: number;
};
