// https://github.com/justjavac/openai-proxy/blob/main/deno.ts

const OPENAI_API_HOST = "api.openai.com";
const GEMINI_API_HOST = "https://generativelanguage.googleapis.com";

Deno.serve(async (request) => {
  const url = new URL(request.url);

  if (url.pathname.includes("gemini")) {
    url.host = GEMINI_API_HOST;
  } else {
    url.host = OPENAI_API_HOST;
  }

  const newRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: "follow",
  });
  return fetch(newRequest);
});
