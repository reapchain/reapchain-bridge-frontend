import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { getApi } from "../apis/axios";

export const QUERY_KEY = "/chains";

const fetcherNodeInfo = () => getApi("/node_info");

export const useNodeInfoQuery = () => useQuery(QUERY_KEY, fetcherNodeInfo);

// const fetcher

const fetcherChain = async () => {};

// export const useChainMutation = () => {};

export const getChain = async () => {};
