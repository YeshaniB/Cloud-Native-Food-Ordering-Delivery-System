#FROM ubuntu:latest
#LABEL authors="Lenovo"
#
#ENTRYPOINT ["top", "-b"]


FROM openjdk:17-jdk-oracle

#RUN addgroup -S app && adduser -S app -G app
RUN groupadd -r app && useradd -r -g app app


USER app

COPY target/*.jar deliveryService-docker.jar

ENTRYPOINT ["java", "-jar", "/deliveryService-docker.jar"]