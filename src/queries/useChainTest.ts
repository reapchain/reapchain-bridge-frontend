import { useWeb3React } from "@web3-react/core";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Chain } from "types/chain";

type Connection = Chain | null;

let connection: Connection = null;

const CONNECTION_QUERY_KEY = "/connection";

export const useConnectionQuery = () =>
  useQuery(CONNECTION_QUERY_KEY, () => {
    return connection;
  });

const setConnection = async (newConnection: Connection) => {
  connection = newConnection;
};

export const useConnectionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(setConnection, {
    onSuccess: () => {
      console.log("useConnectionMutation onSuccess");
      queryClient.invalidateQueries(CONNECTION_QUERY_KEY);
    },
    onError: () => {
      console.log("useConnectionMutation onError");
    },
  });
};

// useMutation(setConnection, {
//   onMutate: () => {},
// });

// const useConnectionMutation = useMutation(
//   (newConnection: Connection) => {
//     connection = newConnection;
//     return newConnection;
//   },
//   {
//     onMutate: (newConnection) => {},
//     onError: () => {},
//   }
// );

// const { data: connection } = useQuery('/chainTest', fetchConnection)
