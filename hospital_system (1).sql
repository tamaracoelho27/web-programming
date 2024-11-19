-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2024 at 11:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `doctorID` varchar(10) NOT NULL,
  `doctorName` varchar(255) NOT NULL,
  `doctorSpecialty` varchar(255) NOT NULL,
  `doctorPhone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctorID`, `doctorName`, `doctorSpecialty`, `doctorPhone`) VALUES
('DG001', 'Dr. Daniel Green', 'Dermatologist', '+1 234 567 891'),
('GP001', 'Dr. Alice Brown', 'General Practitioner', '+1 234 567 890'),
('GS001', 'Dr. Michael Smith', 'General Surgeon', '+1 234 567 892'),
('PD001', 'Dr. Emma Johnson', 'Pediatrician', '+1 234 567 893');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_schedule`
--

CREATE TABLE `doctor_schedule` (
  `scheduleID` int(11) UNSIGNED NOT NULL,
  `doctorID` varchar(10) NOT NULL,
  `day` varchar(20) NOT NULL,
  `time_slot` varchar(5) NOT NULL,
  `status` varchar(20) DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctor_schedule`
--

INSERT INTO `doctor_schedule` (`scheduleID`, `doctorID`, `day`, `time_slot`, `status`) VALUES
(49, 'GP001', 'Monday', '09:00', 'unavailable'),
(50, 'GP001', 'Monday', '10:00', 'unavailable'),
(51, 'GP001', 'Monday', '11:00', 'available'),
(52, 'GP001', 'Monday', '12:00', 'available'),
(53, 'GP001', 'Monday', '13:00', 'available'),
(54, 'GP001', 'Monday', '14:00', 'available'),
(55, 'GP001', 'Monday', '15:00', 'available'),
(56, 'GP001', 'Monday', '16:00', 'available'),
(57, 'GP001', 'Tuesday', '09:00', 'available'),
(58, 'GP001', 'Tuesday', '10:00', 'available'),
(59, 'GP001', 'Tuesday', '11:00', 'available'),
(60, 'GP001', 'Tuesday', '12:00', 'available'),
(61, 'GP001', 'Tuesday', '13:00', 'available'),
(62, 'GP001', 'Tuesday', '14:00', 'available'),
(63, 'GP001', 'Tuesday', '15:00', 'available'),
(64, 'GP001', 'Tuesday', '16:00', 'available'),
(65, 'DG001', 'Monday', '09:00', 'available'),
(66, 'DG001', 'Monday', '10:00', 'available'),
(67, 'DG001', 'Monday', '11:00', 'available'),
(68, 'DG001', 'Monday', '12:00', 'available'),
(69, 'DG001', 'Monday', '13:00', 'available'),
(70, 'DG001', 'Monday', '14:00', 'available'),
(71, 'DG001', 'Monday', '15:00', 'available'),
(72, 'DG001', 'Monday', '16:00', 'available');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctorID`);

--
-- Indexes for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  ADD PRIMARY KEY (`scheduleID`),
  ADD KEY `doctorID` (`doctorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  MODIFY `scheduleID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  ADD CONSTRAINT `doctor_schedule_ibfk_1` FOREIGN KEY (`doctorID`) REFERENCES `doctors` (`doctorID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
