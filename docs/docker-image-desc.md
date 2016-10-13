# Short Description
The Patient Portal UI is used by the patient to manage his or her health information and consent.

# Full Description

## Supported Tags and Respective `Dockerfile` Links

[`1.16.0`](https://github.com/bhits/admin-portal-ui/blob/master/admin-portal-ui/src/main/docker/Dockerfile),[`latest`](https://github.com/bhits/admin-portal-ui/blob/master/admin-portal-ui/src/main/docker/Dockerfile)[(1.16.0/Dockerfile)](https://github.com/bhits/admin-portal-ui/blob/master/admin-portal-ui/src/main/docker/Dockerfile)

For more information about this image, the source code, and its history, please see the [GitHub repository](https://github.com/bhits/admin-portal-ui).

## What is Admin Portal UI?

The Admin Portal UI (admin-portal-ui) is an administrative user interface component of Consent2Share (C2S) used to create and manage patient accounts. Administrative staff can use this to log in, visit their home page, create patient accounts, and manage patient information.

For more information and related downloads for Consent2Share (C2S), please visit [C2S](https://bhits.github.io/consent2share/).

## How to use this image


### Start a Admin Portal UI instance

Be sure to familiarize yourself with the repository's [README.md](https://github.com/bhits/admin-portal-ui) file before starting the instance.

`docker run  --name admin-portal-ui -d bhits/admin-portal-ui:latest <additional program arguments>`

*NOTE: In order for this API to fully function as a microservice in the Consent2Share (C2S) application, it is required to setup the dependency microservices and support level infrastructure. Please refer to the [C2S Deployment Guide]() for instructions to setup the C2S infrastructure.*


### Configure

This API runs with a [default configuration](https://github.com/bhits/admin-portal-ui/blob/master/admin-portal-ui/src/main/resources/application.yml) that is primarily targeted for the development environment.  The Spring profile `docker` is actived by default when building images. [Spring Boot](https://projects.spring.io/spring-boot/) supports several methods to override the default configuration to configure the API for a certain deployment environment. 

Here is example to override default database password:

`docker run -d bhits/admin-portal-ui:latest --spring.datasource.password=strongpassword`

### Using a custom configuration file

To use custom `application.yml`, mount the file to the docker host and set the environment variable `spring.config.location`.

`docker run -v "/path/on/dockerhost/C2S_PROPS/admin-portal-ui/application.yml:/java/C2S_PROPS/admin-portal-ui/application.yml" -d bhits/admin-portal-ui:tag --spring.config.location="file:/java/C2S_PROPS/admin-portal-ui/"`

## Environment Variables

When you start the Admin Portal UI image, you can edit the configuration of the Admin Portal UI instance by passing one or more environment variables on the command line. 

#### JAR_FILE
This environment variable is used to setup which jar file will run. you need mount the jar file to the root of contianer.
`docker run --name admin-portal-ui -e JAR_FILE="admin-portal-ui-latest.jar" -v "/path/on/dockerhost/admin-portal-ui-latest.jar:/admin-portal-ui-latest.jar" -d bhits/admin-portal-ui:latest`

#### JAVA_OPTS 
This environment variable is used to setup JVM argument, such as memory configuration.
`docker run --name admin-portal-ui -e "JAVA_OPTS=-Xms512m -Xmx700m -Xss1m" -d bhits/admin-portal-ui:latest`

#### DEFAULT_PROGRAM_ARGS 
This environment variable is used to setup application arugument. The default value of is "--spring.profiles.active=docker".
`docker run --name admin-portal-ui -e DEFAULT_PROGRAM_ARGS="--spring.profiles.active=ssl,docker" -d bhits/admin-portal-ui:latest`

# Supported Docker versions
This image is officially supported on Docker version 1.12.1.

Support for older versions (down to 1.6) is provided on a best-effort basis.

Please see the [Docker installation documentation](https://docs.docker.com/engine/installation/) for details on how to upgrade your Docker daemon.

# License
View [license]() information for the software contained in this image.

# User Feedback

## Documentation 
Documentation for this image is stored in the [bhits/admin-portal-ui](https://github.com/bhits/admin-portal-ui) GitHub repository. Be sure to familiarize yourself with the repository's README.md file before attempting a pull request.

## Issues

If you have any problems with or questions about this image, please contact us through a [GitHub issue](https://github.com/bhits/admin-portal-ui/issues).

