import React, { Suspense } from "react";
import { BaseErrorBoundary } from "./BaseErrorBoundary";
import { myAsync } from "./myAsync";
import { Resource } from "./Resource";

interface Props {
  ok?: boolean;
}

const resource = new Resource((ok = true) => myAsync(ok));

function MyNewComponentContent({ ok = true }: Props) {
  const value = resource.read(ok);

  return <div>result: {value}</div>;
}

export default function MyNewComponent({ ok }: Props) {
  return (
    <BaseErrorBoundary fallbackRender={() => <div>error</div>}>
      <Suspense fallback={<div>loading...</div>}>
        <MyNewComponentContent ok={ok} />
      </Suspense>
    </BaseErrorBoundary>
  );
}
