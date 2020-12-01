
/*---------------------------------------------------------
 * Copyright (C) Hkube. All rights reserved.
 * AUTO-GENERATED CODE, DO NOT EDIT
 *--------------------------------------------------------*/

export interface Pipeline {
    /**
     * pipeline description
     */
    description?: string;
    /**
     * edges define relation between nodes
     */
    edges?: any[];
    /**
     * experiment name
     */
    experimentName?: string;
    /**
     * input object
     */
    flowInput?: { [key: string]: any };
    kind?:      Kind;
    /**
     * Unique identifier representing a specific pipeline
     */
    name: string;
    /**
     * Array of nodes
     */
    nodes: Node[];
    /**
     * optional properties
     */
    options?:  Options;
    priority?: number;
    /**
     * the root job id of the current tree
     */
    rootJobId?: string;
    /**
     * streaming options
     */
    streaming?: Streaming;
    /**
     * Array of tags
     */
    tags?:     string[];
    triggers?: Triggers;
    webhooks?: Webhooks;
}

export enum Kind {
    Batch = "batch",
    Stream = "stream",
}

export interface Node {
    /**
     * Unique identifier representing a specific algorithm
     */
    algorithmName?:   string;
    batchOperation?:  BatchOperation;
    includeInResult?: boolean;
    /**
     * The input for the algorithm
     */
    input?:   any[];
    metrics?: Metrics;
    /**
     * Unique node identifier
     */
    nodeName: string;
    /**
     * Unique identifier representing a specific pipeline
     */
    pipelineName?: string;
    retry?:        Retry;
    stateType?:    StateType;
    /**
     * Algorithm execution time to live in seconds. 0 to disable
     */
    ttl?: number;
}

export enum BatchOperation {
    Cartesian = "cartesian",
    Indexed = "indexed",
}

export interface Metrics {
    /**
     * Should tensorboard metrics be collected.
     */
    tensorboard?: boolean;
}

export interface Retry {
    limit?:  number;
    policy?: Policy;
}

export enum Policy {
    Always = "Always",
    Never = "Never",
    OnCrash = "OnCrash",
    OnError = "OnError",
}

export enum StateType {
    Stateful = "stateful",
    Stateless = "stateless",
}

/**
 * optional properties
 */
export interface Options {
    batchTolerance?:         number;
    concurrentPipelines?:    ConcurrentPipelines;
    progressVerbosityLevel?: ProgressVerbosityLevel;
    /**
     * pipeline time to live in seconds
     */
    ttl?: number;
}

export interface ConcurrentPipelines {
    amount?:          number;
    rejectOnFailure?: boolean;
}

export enum ProgressVerbosityLevel {
    Critical = "critical",
    Debug = "debug",
    Error = "error",
    Info = "info",
    Trace = "trace",
    Warn = "warn",
}

/**
 * streaming options
 */
export interface Streaming {
    /**
     * define custom streaming flow in simple syntax
     */
    customFlow?: { [key: string]: any };
}

export interface Triggers {
    cron?: Cron;
    /**
     * pipelines to activate upon result
     */
    pipelines?: string[];
}

export interface Cron {
    /**
     * enable or disable cron job
     */
    enabled?: boolean;
    /**
     * cron job
     */
    pattern?: string;
}

export interface Webhooks {
    /**
     * url to activate upon progress
     */
    progress?: string;
    /**
     * url to activate upon result
     */
    result?: string;
}
