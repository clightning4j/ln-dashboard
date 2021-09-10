export type Metrics = {
    metrics: Map<String, Object>
}

export type UpTime = {
    channels: Array<Object>
    forwards: {
        completed: number
        failed: number
    }
    timestamp: number
}

export type MetricsOne = {
    metric_name: string
    color: string
    node_id: string
    os_info: {
        architecture: string
        os: string
        version: string
    }
    timezone: string
    up_time: Array<UpTime>
    channels_info: Array<ChannelInfo>
}

export type ChannelInfo = {
    node_alias: string
    node_id: string,
    channel_id: string,
    capacity: number,
    online: boolean,
    color: string,
    direction: string,
    forwards: Array<Forward>
    last_update: number,
    public: boolean,
    up_times: Array<Uptime>,
}

export type Uptime = {
    status: string,
    timestamp: number,
}

export type Forward = {
    direction: string,
    status: string,
}