# AWS CloudFormation

This directory contains AWS CloudFormation templates to deploy the website to AWS.

## Bootstrapping

To enable CI/CD integration with GitHub Actions, IAM roles and users must be created.
The `bootstrap.yaml` template contains the required definitions to do this:

    aws cloudformation create-stack --stack-name argo-heli-website-bootstrap-dev --template-body file://bootstrap.yaml --capabilities CAPABILITY_IAM --parameters ParameterKey=BucketName,ParameterValue=argo-heli-website-dev
    aws cloudformation create-stack --stack-name argo-heli-website-bootstrap-prod --template-body file://bootstrap.yaml --capabilities CAPABILITY_IAM --parameters ParameterKey=BucketName,ParameterValue=argo-heli-website-prod

## Deleting

    aws cloudformation delete-stack --stack-name argo-heli-website-bootstrap-dev
    aws cloudformation delete-stack --stack-name argo-heli-website-bootstrap-prod
