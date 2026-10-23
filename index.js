#!/usr/bin/env node
import {main} from "./src/main.js";

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
