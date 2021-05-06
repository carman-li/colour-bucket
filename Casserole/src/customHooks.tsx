import React, { useState, useEffect, useRef } from "react";
import { Api } from "./common";

enum FetchStatus {
    IDLE = "IDLE",
    FETCHING = "FETCHING",
    FETCHED = "FETCHED",
}

const functions = new Map<string, any>([
    ["getTags", Api.getTags],
    ["getImageUrls", Api.getImageUrls]
]);

const getFunction = (functionName: string) => {
    return functions.get(functionName)();
};

const useFetch = (functionName: any) => {
    const cache = useRef<any>({});
    const [status, setStatus] = useState(FetchStatus.IDLE);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        if (!functionName) return;

        const fetchData = async () => {
            // if function call has already been made, get data from cache
            if (cache.current[functionName]) {
                console.log("data found in cache");
                const data = cache.current[functionName];
                setData(data);
                setStatus(FetchStatus.FETCHED);
            } else {
                console.log("data not found in cache - making call");
                setStatus(FetchStatus.FETCHING);
                const fnc = getFunction(functionName);
                await fnc?.then((data: any) => {
                    cache.current[functionName] = data;
                    setData(data);
                });
                setStatus(FetchStatus.FETCHED);
            }
        };

        fetchData();
    }, [functionName]);

    return { status, data };
};

export { FetchStatus, useFetch };