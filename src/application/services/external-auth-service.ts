import { env } from "@/infra/env";

let cachedToken: string;
let tokenExpiresAt: number | null = null;

function decodeJwtExpiration(token: string): number {
  const [, payload] = token.split(".");
  const decoded = JSON.parse(Buffer.from(payload, "base64").toString("utf8"));
  return decoded.exp;
}

export async function getValidExternalToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return cachedToken;
  }

  const res = await fetch(`${env.SERVICE_PROXY_URL}/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username: env.EXTERNAL_USERNAME,
      password: env.EXTERNAL_PASSWORD,
    }),
  });
  console.log("res:",res)

  if (!res.ok) {
    throw new Error("External auth failed");
  }

  const json = await res.json();
  const newToken = json?.access_token;
  if (!newToken) {
    throw new Error("Invalid external token response");
  }

  cachedToken = newToken;
  tokenExpiresAt = decodeJwtExpiration(newToken);

  return cachedToken;
}
