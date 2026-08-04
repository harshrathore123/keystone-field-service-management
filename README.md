# KEYSTONE - Field Service Management Platform

## 📌 Project Overview

KEYSTONE is a full-stack Field Service Management Platform designed to
streamline maintenance operations for commercial facilities.

The platform helps organizations manage customers, sites, work orders,
technicians, inventory, service requests, notifications, and field
operations through a centralized role-based system.

------------------------------------------------------------------------

# 🚀 Features

## Authentication & Authorization

-   JWT based authentication
-   Secure login system
-   Role Based Access Control (RBAC)
-   Protected routes
-   Token based security

Supported Roles: - Manager - Dispatcher - Technician - Customer

------------------------------------------------------------------------

# User Modules

## Manager

-   Dashboard analytics
-   Customer management
-   Site management
-   Work Order management
-   Technician management
-   Inventory management
-   Reports dashboard
-   Notifications

## Dispatcher

-   Dashboard access
-   Customer management
-   Site management
-   Work Order assignment
-   Work Order tracking
-   Notifications

## Technician

-   Technician Dashboard
-   View assigned jobs
-   Update work order status
-   Part Usage tracking
-   Time Logs management
-   Notifications

## Customer

-   Customer Portal
-   Raise Service Request
-   View submitted requests
-   Track request status
-   Profile management
-   Settings management
-   Notifications

------------------------------------------------------------------------

# Technology Stack

## Backend

-   Java 17
-   Spring Boot
-   Spring Security
-   JWT Authentication
-   Spring Data JPA
-   Hibernate
-   MySQL
-   Maven

## Frontend

-   React.js
-   TypeScript
-   Material UI (MUI)
-   Axios
-   React Router

## Tools

-   Eclipse / IntelliJ IDEA
-   Visual Studio Code
-   Postman
-   MySQL Workbench
-   Git & GitHub

------------------------------------------------------------------------

# Project Structure

    KEYSTONE-field-service-management

    ├── keystone-field-service-management
    │   ├── src
    │   ├── pom.xml
    │   └── Spring Boot Backend

    ├── keystone-frontend
    │   ├── src
    │   ├── public
    │   ├── package.json
    │   └── React Frontend

    ├── KeyStone_Project_User.postman_collection.json

    └── README.md

------------------------------------------------------------------------

# Backend Setup

Create MySQL database:

``` sql
CREATE DATABASE keystone_db;
```

Update database details in:

    src/main/resources/application.properties

Example:

``` properties
spring.datasource.url=jdbc:mysql://localhost:3306/keystone_db?serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

------------------------------------------------------------------------

# Run Backend

    cd keystone-field-service-management

Run:

    mvn spring-boot:run

Backend URL:

    http://localhost:8080

------------------------------------------------------------------------

# Frontend Setup

    cd keystone-frontend

Install:

    npm install

Run:

    npm run dev

Frontend URL:

    http://localhost:5173

------------------------------------------------------------------------

# API Documentation & Postman Collection

Complete Postman collection is included in the project:

    KeyStone_Project_User.postman_collection.json

The Postman collection contains API requests for:

-   Authentication API
-   User API
-   Customer API
-   Site API
-   WorkOrder API
-   Technician API
-   Inventory API
-   Part API
-   Part Usage API
-   TimeLog API
-   Status History API
-   Dashboard API
-   Analytics API
-   Report API
-   Customer Portal API
-   Notification API

## How to Test APIs Using Postman

1.  Start Spring Boot backend.
2.  Open Postman.
3.  Import:

```{=html}
<!-- -->
```
    KeyStone_Project_User.postman_collection.json

4.  Use backend URL:

```{=html}
<!-- -->
```
    http://localhost:8080

5.  Login using Auth API.
6.  Copy JWT token.
7.  Use token for protected APIs.

------------------------------------------------------------------------

# Project Status

✅ Authentication Completed\
✅ Role Based Access Control Completed\
✅ Dashboard Completed\
✅ Customer Module Completed\
✅ Site Module Completed\
✅ Work Order Module Completed\
✅ Technician Module Completed\
✅ Inventory Module Completed\
✅ Part Usage Module Completed\
✅ Time Logs Module Completed\
✅ Notification Module Completed\
✅ Customer Portal Completed\
✅ Profile Management Completed\
✅ Settings Management Completed\
✅ Reports Dashboard Completed

------------------------------------------------------------------------

# Build Information

Backend:

    mvn clean package

Frontend:

    npm run build

------------------------------------------------------------------------

# Developer

Harsh Rathore

Java Full Stack Developer Intern

Project: KEYSTONE - Field Service Management Platform

------------------------------------------------------------------------

# Internship Project

Developed as part of Java Full Stack Development Internship.

This project demonstrates full-stack development using Spring Boot,
React.js, TypeScript, JWT Authentication, REST APIs, and MySQL database
integration.
