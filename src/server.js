import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { applyFeedback, cloneDefaultState, LivedError, recommend } from "./domain/lived.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(__dirname, "..", "public");
let state = cloneDefaultState();

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

export function createLivedServer() {
  return createServer(async (request, response) => {
    try {
      if (request.method === "GET" && request.url === "/api/state") {
        return sendJson(response, 200, state);
      }

      if (request.method === "POST" && request.url === "/api/recommend") {
        const body = await readJson(request);
        const result = recommend(body, state);
        return sendJson(response, 200, result);
      }

      if (request.method === "POST" && request.url === "/api/feedback") {
        const body = await readJson(request);
        const result = applyFeedback(state, body);
        state = result.state;
        return sendJson(response, 200, result);
      }

      if (request.method === "POST" && request.url === "/api/reset") {
        state = cloneDefaultState();
        return sendJson(response, 200, { ok: true });
      }

      const pathname = request.url === "/" ? "/index.html" : new URL(request.url, "http://localhost").pathname;
      const filePath = join(publicDir, pathname);
      const content = await readFile(filePath);
      response.writeHead(200, { "content-type": contentTypes[extname(filePath)] ?? "application/octet-stream" });
      response.end(content);
    } catch (error) {
      const status = error instanceof LivedError ? 400 : 500;
      sendJson(response, status, {
        error: {
          code: error.code ?? "INTERNAL_ERROR",
          message: error.message,
          visible: true
        }
      });
    }
  });
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  createLivedServer().listen(port, () => {
    console.log(JSON.stringify({ level: "info", event: "server_started", port, app: "LIVED prototype" }));
  });
}
