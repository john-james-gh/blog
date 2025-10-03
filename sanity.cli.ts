/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import {defineCliConfig} from "sanity/cli"

import {envCli} from "@/env-cli"

export default defineCliConfig({
  api: {projectId: envCli.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: envCli.NEXT_PUBLIC_SANITY_DATASET},
})
