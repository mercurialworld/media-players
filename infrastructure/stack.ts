import * as cdk from "aws-cdk-lib";
import { CodeDeployApp } from "chaeri/codedeploy-app.ts";
import { getRepoFromEnv } from "chaeri/get-repo.ts";
import { Construct } from "constructs";

export class MPMediaPlayersStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        new CodeDeployApp(this, "CodeDeploy", {
            githubRepo: getRepoFromEnv(),
            codedeployGitHubEnv: "codedeploy",
            onPremInstanceTag: "dreamcatching",
        });
    }
}
