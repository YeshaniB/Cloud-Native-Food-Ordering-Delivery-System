##FROM ubuntu:latest
##LABEL authors="USER"
##
##ENTRYPOINT ["top", "-b"]
#
#FROM openjdk:17-jdk-oracle
#
##RUN addgroup -S app && adduser -S app -G app
#RUN groupadd -r app && useradd -r -g app app
#
#USER app
#
#COPY target/*.jar spring-boot-docker.jar
#
#ENTRYPOINT ["java", "-jar", "/spring-boot-docker.jar"]
#
##EXPOSE 8080
##ADD target/spring-boot-docker.jar spring-boot-docker.jar
##ENTRYPOINT ["java", "-jar", "/spring-boot-docker.jar"]

# Start from an official Java image
FROM openjdk:21-jdk-oracle

# Set working directory inside container
WORKDIR /app

# Copy the built JAR file into the container
COPY target/*.jar order.jar

# Expose the port your app runs on
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "order.jar"]