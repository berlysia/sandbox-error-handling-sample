import React from "react";
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

export default class MyOldClassComponent extends React.Component<Props, State> {
  state: State = {
    isInit: false,
    isLoading: true,
    isError: false,
    value: null,
  };

  runMyAsync() {
    myAsync(this.props.ok ?? true).then(
      (value) =>
        this.setState({
          isInit: false,
          isLoading: false,
          isError: false,
          value,
        }),
      (error) =>
        this.setState({
          isInit: false,
          isLoading: false,
          isError: true,
          value: error,
        })
    );
  }

  componentDidMount() {
    this.runMyAsync();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.ok !== this.props.ok) {
      this.runMyAsync();
    }
  }

  render() {
    if (this.state.isInit || this.state.isLoading) {
      return <div>loading...</div>;
    }
    if (this.state.isError) {
      return <div>error</div>;
    }
    return <div>result: {this.state.value}</div>;
  }
}
