# This is a basic workflow to help you get started with Actions

name: generate

# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch and petstore.yaml
on:
  push:
    branches: [ master ]
    # paths: petstore.yaml

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # clientをcheckout
      - uses: actions/checkout@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repository: andrei-varchanka/bohian-art
          path: client

      # openapi generate
      - uses: docker://openapitools/openapi-generator-cli
        with:
          args: generate -i ./petstore.yaml -g typescript-angular -o ./client --additional-properties=fileNaming=camelCase --enable-post-process-file

      # Create pull request
      - uses: peter-evans/create-pull-request@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          path: client
          commit-message: update client
          title: update client
          body: update client
          branch: feature/update_client
          branch-suffix: short-commit-hash
