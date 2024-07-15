In this folder we must set up our infrastructure. For example, for an AWS deployment with serverless framework we can set the following structure:

apps
    person
        resources
            dynamodb.yml
        scripts
            deploy-aws.sh
            destroy-aws.sh
        src
            config
                dependency-injection
                    // files related to the dependency injection
                infrastructure
                    // files related to the infra configuration
                config.ts
            controllers
                search
                    searchGetController.ts
                    function.yml
                find
                    findGetController.ts
                    function.yml
                create
                    createPostController.ts
                    function.yml
            handlers // only if any handlers are needed
                specificCommand
                    specificCommandHandler.ts
                    function.yml
                specificQuery
                    specificQueryHandler.ts
                    function.yml
            subscribers // only if any subscribers are needed
                eventSubscribers.ts
        tests

        // general configuration files
        .env.offline // ejemplo de archivo .env para un entorno
        .eslintignore
        .eslintrc.json
        .lintstagedrc.json
        .jest.config.json
        .jest.d.ts
        package.json
        readme.md
        tsconfig.json

        // deployment files
        .esbuild-plugins.js
        serverless.yml

