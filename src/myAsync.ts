export async function myAsync(ok = true) {
  await new Promise((d) => setTimeout(d, 1000));
  if (!ok) throw new Error("error");
  return 42;
}
