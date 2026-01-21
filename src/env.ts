import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  server: {
    BACKEND_URL: z.url(),
  },
  client: {},
  experimental__runtimeEnv: process.env,
});

export default env;
