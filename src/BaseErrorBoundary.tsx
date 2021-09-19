import React from "react";

interface Props {
  onError?: (err: unknown) => void;
  fallbackRender: (err: unknown) => React.ReactNode;
}
type State = { caught: unknown | null };

export class BaseErrorBoundary extends React.Component<Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);
    this.state = {
      caught: null,
    };
  }

  static getDerivedStateFromError(caught: unknown) {
    return { caught };
  }

  componentDidCatch(error: unknown, _info: React.ErrorInfo) {
    this.props.onError?.(error);
  }

  render() {
    const { caught } = this.state;
    if (caught) {
      return this.props.fallbackRender(caught);
    }
    return this.props.children;
  }
}
