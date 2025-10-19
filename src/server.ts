/** biome-ignore-all lint/suspicious/noConsole: is allowed here */
import { app } from "./app.js";
import { envVariables } from "./env-variables/index.js";

app.listen({ port: envVariables.PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
