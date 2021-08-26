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
    channels_info: Array<Object>
}