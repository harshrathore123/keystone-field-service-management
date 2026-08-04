-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: keystone_db
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `activity` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKrfbvkrffamfql7cjmen8v976v` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (4,_binary '','Indore, MP','Keystone Pvt','Harsh Rathore Updated','customer@gmail.com','8457593245',NULL),(6,_binary '','Indore','Test Pvt Ltd','Test Company','test@gmail.com','9999999999',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `minimum_stock` int NOT NULL,
  `part_code` varchar(255) NOT NULL,
  `part_name` varchar(255) NOT NULL,
  `quantity_in_stock` int NOT NULL,
  `unit_price` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4br0wudlfmsxkrxbhlof9pykd` (`part_code`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `work_order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9y21adhxn0ayjhfocscqox7bh` (`user_id`),
  KEY `FKtjfkt5in3x6o3yrat767l3w5e` (`work_order_id`),
  CONSTRAINT `FK9y21adhxn0ayjhfocscqox7bh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKtjfkt5in3x6o3yrat767l3w5e` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (28,'2026-08-03 10:06:46.777715',_binary '\0','Work Order WO-5008 has been assigned to you.','New Work Order Assigned',19,28),(30,'2026-08-03 10:07:29.027192',_binary '','Work Order WO-5010 has been assigned to you.','New Work Order Assigned',19,30),(31,'2026-08-03 10:10:20.830985',_binary '','Work Order WO-5008 has been assigned to you.','New Work Order Assigned',19,28),(32,'2026-08-03 10:10:31.802017',_binary '','Work Order WO-5008 has been assigned to you.','New Work Order Assigned',19,28),(34,'2026-08-03 15:28:50.334335',_binary '','Work Order WO-6011 has been assigned to you.','New Work Order Assigned',19,33),(35,'2026-08-04 07:50:39.314288',_binary '','Work Order WO-6012 has been assigned to you.','New Work Order Assigned',19,35),(36,'2026-08-04 07:52:19.460042',_binary '\0','Work Order WO-5008 has been started by Tech One','Work Order Started',17,28),(37,'2026-08-04 08:04:51.915087',_binary '\0','Work Order WO-1785828768966 has been assigned to you.','New Work Order Assigned',19,34),(38,'2026-08-04 08:06:41.766783',_binary '\0','Work Order WO-1785828768966 has been started by Tech One','Work Order Started',17,34),(39,'2026-08-04 08:40:54.663286',_binary '\0','Work Order WO-1785831897331 has been assigned to you.','New Work Order Assigned',19,38),(40,'2026-08-04 08:41:55.754530',_binary '\0','Work Order WO-1785831897331 has been started by Tech One','Work Order Started',17,38),(41,'2026-08-04 08:51:49.032072',_binary '','Work Order WO-6014 has been assigned to you.','New Work Order Assigned',19,39),(42,'2026-08-04 08:53:38.939572',_binary '\0','Work Order WO-6014 has been assigned to you.','New Work Order Assigned',19,39),(43,'2026-08-04 08:53:53.832252',_binary '\0','Work Order WO-6014 has been started by Tech One','Work Order Started',17,39),(44,'2026-08-04 08:56:38.756323',_binary '\0','Work Order WO-1785833736957 has been assigned to you.','New Work Order Assigned',19,40),(45,'2026-08-04 09:26:49.247395',_binary '\0','Work Order WO-1785833736957 has been started by Tech One','Work Order Started',17,40);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `part_usage`
--

DROP TABLE IF EXISTS `part_usage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `part_usage` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `part_name` varchar(255) DEFAULT NULL,
  `quantity_used` int DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `used_date` varchar(255) DEFAULT NULL,
  `part_id` bigint NOT NULL,
  `work_order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKc258y3uhwyprokbq4w0qew4g4` (`part_id`),
  KEY `FKt37mki2569fkk7i96nk1knva0` (`work_order_id`),
  CONSTRAINT `FKc258y3uhwyprokbq4w0qew4g4` FOREIGN KEY (`part_id`) REFERENCES `parts` (`id`),
  CONSTRAINT `FKt37mki2569fkk7i96nk1knva0` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `part_usage`
--

LOCK TABLES `part_usage` WRITE;
/*!40000 ALTER TABLE `part_usage` DISABLE KEYS */;
INSERT INTO `part_usage` VALUES (15,NULL,2,'Test Part Usage','2026-08-04T15:28',6,35);
/*!40000 ALTER TABLE `part_usage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `part_name` varchar(255) DEFAULT NULL,
  `part_number` varchar(255) DEFAULT NULL,
  `quantity_in_stock` int DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES (6,_binary '','Electricity','AC - Repair','AC001',1,3000),(8,_binary '','Electrical','TV -  Repair','W009',4,2000);
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sites` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `site_name` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `customer_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKo4tggk9x1c2ulci91kvd43c3t` (`customer_id`),
  CONSTRAINT `FKo4tggk9x1c2ulci91kvd43c3t` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sites`
--

LOCK TABLES `sites` WRITE;
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;
INSERT INTO `sites` VALUES (3,_binary '','Vijay Naga','Indore','452010','Indore Head Office','Madhya Pradesh',4),(6,_binary '','A-288 Abhinandan Nagar','Indore','452010','Test Office','Madhya Pradesh',6);
/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_history`
--

DROP TABLE IF EXISTS `status_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `changed_by` varchar(255) DEFAULT NULL,
  `changed_date` varchar(255) DEFAULT NULL,
  `new_status` varchar(255) DEFAULT NULL,
  `old_status` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `work_order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK63crn75dv23egrd2cexesmwcb` (`work_order_id`),
  CONSTRAINT `FK63crn75dv23egrd2cexesmwcb` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_history`
--

LOCK TABLES `status_history` WRITE;
/*!40000 ALTER TABLE `status_history` DISABLE KEYS */;
INSERT INTO `status_history` VALUES (23,'tech@gmail.com','2026-07-31T18:28:15.859242600','IN_PROGRESS','ASSIGNED','Job Started',30),(27,'tech@gmail.com','2026-08-01T18:40:06.734006','COMPLETED','IN_PROGRESS','Job Completed',30),(33,'tech@gmail.com','2026-08-04T13:22:19.440168100','IN_PROGRESS','ASSIGNED','Job Started',28),(34,'tech@gmail.com','2026-08-04T13:22:29.228488100','COMPLETED','IN_PROGRESS','Job Completed',28),(35,'tech@gmail.com','2026-08-04T13:36:41.751778300','IN_PROGRESS','ASSIGNED','Job Started',34),(36,'tech@gmail.com','2026-08-04T13:37:13.212552400','ON_HOLD','IN_PROGRESS','Job Paused',34),(37,'tech@gmail.com','2026-08-04T13:37:14.677052200','IN_PROGRESS','ON_HOLD','Job Resumed',34),(38,'tech@gmail.com','2026-08-04T13:37:15.297233400','COMPLETED','IN_PROGRESS','Job Completed',34),(39,'tech@gmail.com','2026-08-04T14:11:55.719444800','IN_PROGRESS','ASSIGNED','Job Started',38),(40,'tech@gmail.com','2026-08-04T14:14:15.099540900','COMPLETED','IN_PROGRESS','Job Completed',38),(41,'tech@gmail.com','2026-08-04T14:23:53.808562','IN_PROGRESS','ASSIGNED','Job Started',39),(42,'tech@gmail.com','2026-08-04T14:23:54.805902600','COMPLETED','IN_PROGRESS','Job Completed',39),(43,'tech@gmail.com','2026-08-04T14:56:49.234117400','IN_PROGRESS','ASSIGNED','Job Started',40);
/*!40000 ALTER TABLE `status_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_logs`
--

DROP TABLE IF EXISTS `time_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `time_logs` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `end_time` varchar(255) DEFAULT NULL,
  `hours_worked` double DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `work_description` varchar(255) DEFAULT NULL,
  `work_order_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdytlqda6a2yt3rdbi15gny430` (`work_order_id`),
  CONSTRAINT `FKdytlqda6a2yt3rdbi15gny430` FOREIGN KEY (`work_order_id`) REFERENCES `work_orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_logs`
--

LOCK TABLES `time_logs` WRITE;
/*!40000 ALTER TABLE `time_logs` DISABLE KEYS */;
INSERT INTO `time_logs` VALUES (6,'17:27',5,'15:27','AC repair work',35);
/*!40000 ALTER TABLE `time_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `role` enum('MANAGER','DISPATCHER','TECHNICIAN','CUSTOMER') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (10,_binary '','dispatcher@gmail.com','Dispatcher','One','$2a$10$sUsGh9kTZoETR1qIxANqIe6FxUhKn2FFZH/nofeZUQXkPG2.ZxEm2','9999999992','DISPATCHER',NULL,NULL),(12,_binary '','customer@gmail.com','Customer','One','$2a$10$9Q1UrfjAZTcTLZ8s5ue67uHj5XQT6veEv3AW4gQ.sUMdbRzf9Rx5S','9999999994','CUSTOMER',NULL,NULL),(13,_binary '','dispatchr@gmail.com','Customer','One','$2a$10$yRxZIiBTcNzwlj32D9ZktO053CoRvr1I.qLmOy7u/40emOlCiS.2S','999888323','CUSTOMER',NULL,NULL),(17,_binary '','harsh@gmail.com','Harsh','Rathore','$2a$10$zsh8yxyDEnzv6fEpKafdUOe0aGhe9NM5BnWUMNLmvqQVAMRklL07m','9876543219','MANAGER',NULL,NULL),(19,_binary '','tech@gmail.com','Tech','One','$2a$10$0L81B.SGP24U4Nh4/aNSH.SEJk9cgmGy6VmNFMV4WM2ZYhGJFtLNy','7584965235','TECHNICIAN',NULL,NULL),(20,_binary '','dispatcher2@gmail.com','Dispatcher','Two','$2a$10$E2rVov8UWePjpkTNnoENi.XnWbIf5y1wPaKHO7yc4sZGFwLvd3yR.','9999999998','DISPATCHER',NULL,NULL),(21,_binary '','test@gmail.com',NULL,NULL,'$2a$10$9Q1UrfjAZTcTLZ8s5ue67uHj5XQT6veEv3AW4gQ.sUMdbRzf9Rx5S',NULL,'CUSTOMER',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_orders`
--

DROP TABLE IF EXISTS `work_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `priority` varchar(255) DEFAULT NULL,
  `scheduled_date` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `work_order_number` varchar(255) DEFAULT NULL,
  `customer_id` bigint NOT NULL,
  `site_id` bigint NOT NULL,
  `assigned_user_id` bigint DEFAULT NULL,
  `sla_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9bkpbdto93imqm7u6yg0r2kqw` (`customer_id`),
  KEY `FKio9cg0efakk71fly5qtnw9m6h` (`site_id`),
  KEY `FK8vy95udoai5dmm3obncyik4iv` (`assigned_user_id`),
  CONSTRAINT `FK8vy95udoai5dmm3obncyik4iv` FOREIGN KEY (`assigned_user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK9bkpbdto93imqm7u6yg0r2kqw` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `FKio9cg0efakk71fly5qtnw9m6h` FOREIGN KEY (`site_id`) REFERENCES `sites` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_orders`
--

LOCK TABLES `work_orders` WRITE;
/*!40000 ALTER TABLE `work_orders` DISABLE KEYS */;
INSERT INTO `work_orders` VALUES (28,_binary '','Testing technician notification after assignment','MEDIUM','2026-07-15T17:27','COMPLETED','Notification Test','WO-5008',4,3,19,'2026-07-17T17:27'),(30,_binary '','Their is one ac fundamental repair','MEDIUM','2026-07-15T18:22','COMPLETED','AC Fundamental Repair','WO-5010',4,3,19,'2026-07-17T18:22'),(32,_binary '','Testing This Working Properly or Not','MEDIUM','2026-07-15T20:19','NEW','AC-Mechanics','WO-5012',4,3,NULL,'2026-07-17T20:19'),(33,_binary '','This is ac mechanic shop','HIGH','2026-08-17T20:58','NEW','AC - Mechanic ','WO-6011',4,3,19,'2026-08-18T20:58'),(34,_binary '','Office AC is not cooling properly.','HIGH','2026-08-04','COMPLETED','AC Not Working','WO-1785828768966',4,3,19,'2026-08-05'),(35,_binary '','Ac is not working','HIGH','2026-07-07T13:20','NEW','AC Not Working','WO-6012',4,3,19,'2026-07-08T13:20'),(36,_binary '','Testing customer portal','HIGH','2026-08-04','NEW','Test Request','WO-1785830098834',4,3,NULL,'2026-08-05'),(37,_binary '','AC cooling nahi kar raha','HIGH','2026-08-04','NEW','AC Issue','WO-1785830916373',4,3,NULL,'2026-08-05'),(38,_binary '','Printer not working','HIGH','2026-08-04','COMPLETED','Printer Issue','WO-1785831897331',6,6,19,'2026-08-05'),(39,_binary '','This  is fan  reparing','HIGH','2026-08-02T14:21','COMPLETED','FAN - Repair','WO-6014',6,6,19,'2026-08-03T14:21'),(40,_binary '','Testing customer request','HIGH','2026-08-04','IN_PROGRESS','Test Request','WO-1785833736957',6,6,19,'2026-08-05');
/*!40000 ALTER TABLE `work_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'keystone_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-04 16:15:20
