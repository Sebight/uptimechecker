import { performance } from "perf_hooks";

let tasks: any = {};

export function startTimer(task: string)
{
    tasks[task] = performance.now();
}

export function endTimer(task: string)
{
    let endTimer = performance.now();
    let timeTaken = endTimer - tasks[task];
    return timeTaken;
}