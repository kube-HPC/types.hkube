
/*---------------------------------------------------------
 * Copyright (C) Hkube. All rights reserved.
 * AUTO-GENERATED CODE, DO NOT EDIT
 *--------------------------------------------------------*/

export interface Algorithm {
    /**
     * key value environment variables for algorithm
     */
    algorithmEnv?: { [key: string]: any };
    /**
     * image name as in the docker registry
     */
    algorithmImage?: string;
    /**
     * Custom docker image to be used as base to the newly built algorithm image
     */
    baseImage?: string;
    /**
     * algorithm cpu
     */
    cpu?: number;
    /**
     * the extension name that will be attached to a file when downloading algorithm result
     */
    downloadFileExt?: string;
    entryPoint?:      string;
    env?:             Env;
    gitRepository?:   GitRepository;
    /**
     * algorithm gpu
     */
    gpu?: number;
    /**
     * algorithm memory
     */
    mem?: string;
    /**
     * how many live algorithm instances will always run
     */
    minHotWorkers?: number;
    /**
     * a list of volumes to mount into the algorithm
     */
    mounts?: Mount[];
    /**
     * Unique identifier representing a specific algorithm
     */
    name: string;
    /**
     * key value labels for nodes constraint
     */
    nodeSelector?: { [key: string]: string };
    options?:      Options;
    /**
     * The amount of algorithms required to be scheduled first in a case of cluster pressure
     */
    quotaGuarantee?: number;
    /**
     * Reserved memory for HKube's operations such as in-memory cache, higher value means faster
     * data retrieval and less algorithm memory, lower value means slower data retrieval and
     * more algorithm memory
     */
    reservedMemory?: string;
    /**
     * type of algorithm code resource
     */
    type?: Type;
    /**
     * Hkube's auto increment semantic versioning
     */
    version?: string;
    /**
     * key value environment variables for worker
     */
    workerEnv?: { [key: string]: any };
}

export enum Env {
    Java = "java",
    Nodejs = "nodejs",
    Python = "python",
}

export interface GitRepository {
    /**
     * the branch name you wish to create a build from
     */
    branchName?: string;
    /**
     * commit details
     */
    commit?:  Commit;
    gitKind?: GitKind;
    /**
     * a specific tag which will trigger the build
     */
    tag?: string;
    /**
     * a token which allows hkube's build system to access private repositories more information
     * https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
     */
    token?: string;
    /**
     * a url for the git repository
     */
    url: string;
}

/**
 * commit details
 */
export interface Commit {
    /**
     * commit id
     */
    id: string;
    /**
     * commit message
     */
    message?: string;
    /**
     * commit time
     */
    timestamp?: string;
}

export enum GitKind {
    Github = "github",
    Gitlab = "gitlab",
}

export interface Mount {
    /**
     * the mount path in the algorithm container
     */
    path: string;
    /**
     * name of an existing kubernetes pvc (persistent volume claim)
     */
    pvcName: string;
}

export interface Options {
    /**
     * debug algorithm locally
     */
    debug?: boolean;
    /**
     * runs algorithm with mounted sources to allow rapid development cycles
     */
    devMode?: boolean;
    /**
     * should algorithm support XGL context creation (mount X socket)
     */
    opengl?: boolean;
    /**
     * pending algorithm
     */
    pending?: boolean;
}

/**
 * type of algorithm code resource
 */
export enum Type {
    Code = "Code",
    Git = "Git",
    Image = "Image",
}
