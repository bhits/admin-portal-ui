# Admin Portal UI

The Admin Portal UI (admin-portal-ui) is administrative user interface module of the Consent2share (C2S) used to create and manage patient accounts. Administrative staffs can use this to log in, visit their home page, create patient accounts, and manage patient information.

## Build

### Prerequisites

+ [Oracle Java JDK 8 with Java Cryptography Extension (JCE) Unlimited Strength Jurisdiction Policy](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
+ [Docker Engine](https://docs.docker.com/engine/installation/) (for building a Docker image from the project)
+ [Node.js](https://nodejs.org/en/) (Optional, *see [Structure](#structure) for details*)
+ [Grunt](http://gruntjs.com/getting-started) (Optional, *see [Structure](#structure) for details*)

### Structure

There are two main modules in this project, one folder named client contains all frontend view code, which is client side using Angular framework to build. Another folder named server is server side with Spring Boot, which servers static client content. This is a Maven project and it uses [Frontend maven plugin](https://github.com/eirslett/frontend-maven-plugin). This plugin can locally download node.js and grunt to build client code and then build packing with server side code in a jar. You even do not need to install Node.js and Grunt. But you need to install them if you want to separately build frontend and backend code.

### Commands

This Maven project requires Apache Maven 3.3.3 or greater to build it. It is recommended to use the *Maven Wrapper* scripts provided with this project. *Maven Wrapper* requires internet connection to download Maven and project dependencies for the very first build.

To build the project, navigate to the folder that contains `pom.xml` file using terminal/command line.

+ To build a JAR:
    + For Windows, run `mvnw.cmd clean install`
    + For *nix systems, run `mvnw clean install`
+ To build a Docker Image (this will create an image with `bhits/admin-portal-ui:latest` tag):
    + For Windows, run `mvnw.cmd clean package docker:build`
    + For *nix systems, run `mvnw clean package docker:build`

Note: For frontend developers, there is a fast way to build project in developing mode. You are able to separately build frontend and backend and then flexible to build project with skipping grunt build:
  
+ To build frontend code, navigate to the client folder run: `grunt build:dev`
+ Then navigate to the server folder run `mvnw.cmd clean install -PskipGrunt`

## Run

### Commands

This is a [Spring Boot](https://projects.spring.io/spring-boot/) project and serves the project via an embedded Tomcat instance, therefore there is no need for a separate application server to run it.

+ Run as a JAR file: `java -jar admin-portal-ui-x.x.x-SNAPSHOT.jar <additional program arguments>`
+ Run as a Docker Container: `docker run -d bhits/admin-portal-ui:latest <additional program arguments>`

*NOTE: In order for this API to fully function as a microservice in C2S Application, it is also required to setup the dependency microservices and support level infrastructure. Please refer to the C2S Deployment Guide for instructions to setup the C2S infrastructure.*

## Configure

### Server Side

This project runs with some default configuration that is primarily targeted for development environment. However, [Spring Boot](https://projects.spring.io/spring-boot/) supports several methods to override the default configuration to configure the project for a certain deployment environment.

Please see the [default configuration](server/src/main/resources/application.yml) for this project as a guidance and override the specific configuration per environment as needed. Also, please refer to [Spring Boot Externalized Configuration](http://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html) documentation to see how Spring Boot applies the order to load the properties and [Spring Boot Common Properties](http://docs.spring.io/spring-boot/docs/current/reference/html/common-application-properties.html) documentation to see the common properties used by Spring Boot.

#### Examples for Overriding a Configuration in Spring Boot

##### Override a Configuration Using Program Arguments While Running as a JAR:

+ `java -jar admin-portal-ui-x.x.x-SNAPSHOT.jar --logging.file=newpath`

##### Override a Configuration Using Program Arguments While Running as a Docker Container:

+ `docker run -d bhits/admin-portal-ui:latest --logging.file=newpath`

+ In the `docker-compose.yml`, this can be provided as:
```yml
...
  admin-ui.c2s.com:
    image: "bhits/admin-portal-ui:latest"
    command: ["--logging.file=newpath"]
...
```
*NOTE: Please note that these additional arguments will be appended to the default `ENTRYPOINT` specified in the `Dockerfile` unless the `ENTRYPOINT` is overridden.*

#### Enable SSL

For simplicity in development and testing environments, SSL is **NOT** enabled by default configuration. SSL can easily be enabled following the examples below:

##### Enable SSL While Running as a JAR

+ `java -jar admin-portal-ui-x.x.x-SNAPSHOT.jar --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`

##### Enable SSL While Running as a Docker Container

+ `docker run -d -v "/path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore" bhits/admin-portal-ui:latest --spring.profiles.active=ssl --server.ssl.key-store=/path/to/ssl_keystore.keystore --server.ssl.key-store-password=strongkeystorepassword`
+ In the `docker-compose.yml`, this can be provided as:
```yml
...
  admin-ui.c2s.com:
    image: "bhits/admin-portal-ui:latest"
    command: ["--spring.profiles.active=ssl","--server.ssl.key-store=/path/to/ssl_keystore.keystore", "--server.ssl.key-store-password=strongkeystorepassword"]
    volumes:
      - /path/on/dockerhost/ssl_keystore.keystore:/path/to/ssl_keystore.keystore
...
```

*NOTE: As seen in the examples above, `/path/to/ssl_keystore.keystore` is made available to the container via a volume mounted from the Docker host running this container.*

#### Override Java CA Certificates Store In Docker Environment

Java has a default CA Certificates Store that allows it to trust well-known certificate authorities. For development and testing purposes, one might want to trust additional self-signed certificates. In order to override the default Java CA Certificates Store in docker container, one can mount a custom `cacerts` file over the default one in the docker image as `docker run -d -v "/path/on/dockerhost/to/custom/cacerts:/etc/ssl/certs/java/cacerts" bhits/admin-portal-ui:latest`

*NOTE: The `cacerts` references given in the both sides of volume mapping above are files, not directories.*

### Client Side

This project runs with some default configuration that is primarily targeted for development environment. You are able to change them in grunt file before building client code.

Please see the [default configuration](client/gruntfile.js) for this Client Side as a guidance and specific configuration for a new environment as needed.

#### Examples for Changing Configuration in Grunt

In the `gruntfile.js`, this can be provided as:
```js
...
  dev: {
      options: {
          dest: '<%= config_dir %>/config.js'
      },
      constants: {
          envService: {
              name: 'Development',
              version:'<%= pkg.version %>',
              base64BasicKey: 'newvalue',
...
```
*NOTE: The `base64BasicKey` references is used for [UAA](http://docs.cloudfoundry.org/api/uaa/#password-grant) Password Grant type. Its value is encoded with `client_id:client_secret` by base64 format*

[//]: # (## API Documentation)

[//]: # (## Notes)

[//]: # (## Contribute)

## Contact
If you have any questions, comments, or concerns please see [Consent2Share](../../contact) page

## Report Issues
Please use [GitHub Issues](https://github.com/bhits/admin-portal-ui/issues) page to report issues.

[//]: # (License)