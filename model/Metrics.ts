export type Metrics = {
  metrics: Map<String, Object>;
};

export type MetricsOneOutput = {
  __typename: string;
  version: number;
  age: number;
  last_update: number;
  forwards_rating: ForwardsRating;
  up_time: UpTime;
  channels_info: Array<ChannelInfo>;
};

export type ChannelInfo = {
  age: number;
  channel_id: string;
  alias: string;
  direction: string;
  node_id: string;
  fee: Array<ChannelFee>;
  limits: Array<ChannelLimit>;
  up_time: UpTime;
  forwards_rating: ForwardsRating;
};

export type ChannelLimit = {
  min: number;
  max: number;
};

export type UpTime = {
  one_day: number;
  ten_days: number;
  thirty_days: number;
  six_months: number;
  full: number;
};

export type ChannelFee = {
  base: number;
  per_msat: number;
};

export type ForwardsRating = {
  one_day: Forward;
  ten_days: Forward;
  thirty_days: Forward;
  six_months: Forward;
  full: Forward;
};

export type Forward = {
  success: number;
  failure: number;
  internal_failure: number;
};
