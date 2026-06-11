export async function register() {
  const proxyUrl =
    process.env.HTTPS_PROXY ||
    process.env.https_proxy ||
    process.env.HTTP_PROXY ||
    process.env.http_proxy ||
    process.env.npm_config_https_proxy ||
    process.env.npm_config_proxy;

  if (process.env.NEXT_RUNTIME === "nodejs" && proxyUrl) {
    const { setGlobalDispatcher, ProxyAgent } = await import("undici");
    setGlobalDispatcher(new ProxyAgent(proxyUrl));
  }
}
