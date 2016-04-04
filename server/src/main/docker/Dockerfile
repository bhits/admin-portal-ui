FROM java:8
VOLUME /java
ARG finalName
ADD $finalName /admin-portal-ui.jar
ENTRYPOINT ["java","-Djavax.net.ssl.trustStore=/java/keystore/mhc.keystore","-Djavax.net.ssl.trustStorePassword=changeit","-jar","/admin-portal-ui.jar","--spring.profiles.active=docker"]
