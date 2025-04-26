#FROM ubuntu:latest
#LABEL authors="HP"
#
#ENTRYPOINT ["top", "-b"
FROM openjdk:17-jdk-oracle

#RUN addgroup -S app && adduser -S app -G app
RUN groupadd -r app && useradd -r -g app app

USER app

COPY target/*.jar restaurentService-docker.jar

ENTRYPOINT ["java", "-jar", "/restaurentService-docker.jar"]