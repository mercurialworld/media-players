import * as cdk from "aws-cdk-lib";
import { MPMediaPlayersStack } from "./stack.ts";

const app = new cdk.App();
new MPMediaPlayersStack(app, "MPMediaPlayersStack", {
    env: { account: "575108959833", region: "us-east-1" },
});
