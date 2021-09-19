import React, { useEffect, useState } from "react";
import { myAsync } from "./myAsync";

interface Props {
  ok?: boolean;
}
type State =
  | {
      isInit: true;
      isLoading: false;
      isError: false;
      value: null;
    }
  | {
      isInit: false;
      isLoading: true;
      isError: false;
      value: null;
    }
  | {
      isInit: false;
      isLoading: false;
      isError: true;
      value: unknown;
    }
  | {
      isInit: false;
      isLoading: false;
      isError: false;
      value: number;
    };

export default function MyOldComponent({ ok = true }: Props) {
  const [state, setState] = useState<State>(() => ({
    isInit: true,
    isLoading: false,
    isError: false,
    value: null,
  }));

  useEffect(() => {
    setState({
      isInit: false,
      isLoading: true,
      isError: false,
      value: null,
    });
    myAsync(ok ?? true).then(
      (value) =>
        setState({
          isInit: false,
          isLoading: false,
          isError: false,
          value,
        }),
      (error) =>
        setState({
          isInit: false,
          isLoading: false,
          isError: true,
          value: error,
        })
    );
  }, [ok]);

  if (state.isInit || state.isLoading) {
    return <div>loading...</div>;
  }
  if (state.isError) {
    return <div>error</div>;
  }
  return <div>result: {state.value}</div>;
}
