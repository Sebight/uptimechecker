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
    if (process.env.LOG_TIME == "YES") console.log("[performanceAnalyzer] Time taken executing task <"+task+">: " + timeTaken + "ms");
    return timeTaken;
}