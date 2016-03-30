FROM java:8
VOLUME /java
ARG finalName
ADD $finalName /admin-portal-ui.jar
ENTRYPOINT ["java","-jar","/admin-portal-ui.jar","--spring.profiles.active=docker"]
