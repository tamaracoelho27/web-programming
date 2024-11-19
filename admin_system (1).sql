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
-- Database: `admin_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`, `pin`) VALUES
(1, 'admin1', 'password123', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `appointmentlink`
--

CREATE TABLE `appointmentlink` (
  `id` int(10) UNSIGNED NOT NULL,
  `patient_id` int(10) UNSIGNED NOT NULL,
  `schedule_id` int(10) UNSIGNED NOT NULL,
  `appointment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
('GP001', 'Dr. Alice Brown', 'General Practitioner', '02'),
('GS001', 'Dr. Michael Smith', 'General Surgeon', '03'),
('PD001', 'Dr. Emma Johnson', 'Pediatrician', '04');

-- --------------------------------------------------------

--
-- Table structure for table `doctors_schedule`
--

CREATE TABLE `doctors_schedule` (
  `id` int(11) NOT NULL,
  `doctor_id` varchar(10) NOT NULL,
  `day` varchar(10) NOT NULL,
  `time_slot` time NOT NULL,
  `status` enum('available','booked') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctors_schedule`
--

INSERT INTO `doctors_schedule` (`id`, `doctor_id`, `day`, `time_slot`, `status`) VALUES
(161, 'DG001', 'Monday', '09:00:00', 'available'),
(162, 'DG001', 'Monday', '10:00:00', 'available'),
(163, 'DG001', 'Monday', '11:00:00', 'available'),
(164, 'DG001', 'Monday', '12:00:00', 'available'),
(165, 'DG001', 'Monday', '13:00:00', 'available'),
(166, 'DG001', 'Monday', '14:00:00', 'available'),
(167, 'DG001', 'Monday', '15:00:00', 'available'),
(168, 'DG001', 'Monday', '16:00:00', 'available'),
(169, 'DG001', 'Tuesday', '09:00:00', 'available'),
(170, 'DG001', 'Tuesday', '10:00:00', 'available'),
(171, 'DG001', 'Tuesday', '11:00:00', 'available'),
(172, 'DG001', 'Tuesday', '12:00:00', 'available'),
(173, 'DG001', 'Tuesday', '13:00:00', 'available'),
(174, 'DG001', 'Tuesday', '14:00:00', 'available'),
(175, 'DG001', 'Tuesday', '15:00:00', 'available'),
(176, 'DG001', 'Tuesday', '16:00:00', 'available'),
(177, 'DG001', 'Wednesday', '09:00:00', 'available'),
(178, 'DG001', 'Wednesday', '10:00:00', 'available'),
(179, 'DG001', 'Wednesday', '11:00:00', 'available'),
(180, 'DG001', 'Wednesday', '12:00:00', 'available'),
(181, 'DG001', 'Wednesday', '13:00:00', 'available'),
(182, 'DG001', 'Wednesday', '14:00:00', 'available'),
(183, 'DG001', 'Wednesday', '15:00:00', 'available'),
(184, 'DG001', 'Wednesday', '16:00:00', 'available'),
(185, 'DG001', 'Thursday', '09:00:00', 'available'),
(186, 'DG001', 'Thursday', '10:00:00', 'available'),
(187, 'DG001', 'Thursday', '11:00:00', 'available'),
(188, 'DG001', 'Thursday', '12:00:00', 'available'),
(189, 'DG001', 'Thursday', '13:00:00', 'available'),
(190, 'DG001', 'Thursday', '14:00:00', 'available'),
(191, 'DG001', 'Thursday', '15:00:00', 'available'),
(192, 'DG001', 'Thursday', '16:00:00', 'available'),
(193, 'DG001', 'Friday', '09:00:00', 'available'),
(194, 'DG001', 'Friday', '10:00:00', 'available'),
(195, 'DG001', 'Friday', '11:00:00', 'available'),
(196, 'DG001', 'Friday', '12:00:00', 'available'),
(197, 'DG001', 'Friday', '13:00:00', 'available'),
(198, 'DG001', 'Friday', '14:00:00', 'available'),
(199, 'DG001', 'Friday', '15:00:00', 'available'),
(200, 'DG001', 'Friday', '16:00:00', 'available'),
(201, 'GP001', 'Monday', '09:00:00', 'available'),
(202, 'GP001', 'Monday', '10:00:00', 'available'),
(203, 'GP001', 'Monday', '11:00:00', 'available'),
(204, 'GP001', 'Monday', '12:00:00', 'available'),
(205, 'GP001', 'Monday', '13:00:00', 'available'),
(206, 'GP001', 'Monday', '14:00:00', 'available'),
(207, 'GP001', 'Monday', '15:00:00', 'available'),
(208, 'GP001', 'Monday', '16:00:00', 'available'),
(209, 'GP001', 'Tuesday', '09:00:00', 'available'),
(210, 'GP001', 'Tuesday', '10:00:00', 'available'),
(211, 'GP001', 'Tuesday', '11:00:00', 'available'),
(212, 'GP001', 'Tuesday', '12:00:00', 'available'),
(213, 'GP001', 'Tuesday', '13:00:00', 'available'),
(214, 'GP001', 'Tuesday', '14:00:00', 'available'),
(215, 'GP001', 'Tuesday', '15:00:00', 'available'),
(216, 'GP001', 'Tuesday', '16:00:00', 'available'),
(217, 'GP001', 'Wednesday', '09:00:00', 'available'),
(218, 'GP001', 'Wednesday', '10:00:00', 'available'),
(219, 'GP001', 'Wednesday', '11:00:00', 'available'),
(220, 'GP001', 'Wednesday', '12:00:00', 'available'),
(221, 'GP001', 'Wednesday', '13:00:00', 'available'),
(222, 'GP001', 'Wednesday', '14:00:00', 'available'),
(223, 'GP001', 'Wednesday', '15:00:00', 'available'),
(224, 'GP001', 'Wednesday', '16:00:00', 'available'),
(225, 'GP001', 'Thursday', '09:00:00', 'available'),
(226, 'GP001', 'Thursday', '10:00:00', 'available'),
(227, 'GP001', 'Thursday', '11:00:00', 'available'),
(228, 'GP001', 'Thursday', '12:00:00', 'available'),
(229, 'GP001', 'Thursday', '13:00:00', 'available'),
(230, 'GP001', 'Thursday', '14:00:00', 'available'),
(231, 'GP001', 'Thursday', '15:00:00', 'available'),
(232, 'GP001', 'Thursday', '16:00:00', 'available'),
(233, 'GP001', 'Friday', '09:00:00', 'available'),
(234, 'GP001', 'Friday', '10:00:00', 'available'),
(235, 'GP001', 'Friday', '11:00:00', 'available'),
(236, 'GP001', 'Friday', '12:00:00', 'available'),
(237, 'GP001', 'Friday', '13:00:00', 'available'),
(238, 'GP001', 'Friday', '14:00:00', 'available'),
(239, 'GP001', 'Friday', '15:00:00', 'available'),
(240, 'GP001', 'Friday', '16:00:00', 'available'),
(241, 'GS001', 'Monday', '09:00:00', 'available'),
(242, 'GS001', 'Monday', '10:00:00', 'available'),
(243, 'GS001', 'Monday', '11:00:00', 'available'),
(244, 'GS001', 'Monday', '12:00:00', 'available'),
(245, 'GS001', 'Monday', '13:00:00', 'available'),
(246, 'GS001', 'Monday', '14:00:00', 'available'),
(247, 'GS001', 'Monday', '15:00:00', 'available'),
(248, 'GS001', 'Monday', '16:00:00', 'available'),
(249, 'GS001', 'Tuesday', '09:00:00', 'available'),
(250, 'GS001', 'Tuesday', '10:00:00', 'available'),
(251, 'GS001', 'Tuesday', '11:00:00', 'available'),
(252, 'GS001', 'Tuesday', '12:00:00', 'available'),
(253, 'GS001', 'Tuesday', '13:00:00', 'available'),
(254, 'GS001', 'Tuesday', '14:00:00', 'available'),
(255, 'GS001', 'Tuesday', '15:00:00', 'available'),
(256, 'GS001', 'Tuesday', '16:00:00', 'available'),
(257, 'GS001', 'Wednesday', '09:00:00', 'available'),
(258, 'GS001', 'Wednesday', '10:00:00', 'available'),
(259, 'GS001', 'Wednesday', '11:00:00', 'available'),
(260, 'GS001', 'Wednesday', '12:00:00', 'available'),
(261, 'GS001', 'Wednesday', '13:00:00', 'available'),
(262, 'GS001', 'Wednesday', '14:00:00', 'available'),
(263, 'GS001', 'Wednesday', '15:00:00', 'available'),
(264, 'GS001', 'Wednesday', '16:00:00', 'available'),
(265, 'GS001', 'Thursday', '09:00:00', 'available'),
(266, 'GS001', 'Thursday', '10:00:00', 'available'),
(267, 'GS001', 'Thursday', '11:00:00', 'available'),
(268, 'GS001', 'Thursday', '12:00:00', 'available'),
(269, 'GS001', 'Thursday', '13:00:00', 'available'),
(270, 'GS001', 'Thursday', '14:00:00', 'available'),
(271, 'GS001', 'Thursday', '15:00:00', 'available'),
(272, 'GS001', 'Thursday', '16:00:00', 'available'),
(273, 'GS001', 'Friday', '09:00:00', 'available'),
(274, 'GS001', 'Friday', '10:00:00', 'available'),
(275, 'GS001', 'Friday', '11:00:00', 'available'),
(276, 'GS001', 'Friday', '12:00:00', 'available'),
(277, 'GS001', 'Friday', '13:00:00', 'available'),
(278, 'GS001', 'Friday', '14:00:00', 'available'),
(279, 'GS001', 'Friday', '15:00:00', 'available'),
(280, 'GS001', 'Friday', '16:00:00', 'available'),
(281, 'PD001', 'Monday', '09:00:00', 'available'),
(282, 'PD001', 'Monday', '10:00:00', 'available'),
(283, 'PD001', 'Monday', '11:00:00', 'available'),
(284, 'PD001', 'Monday', '12:00:00', 'available'),
(285, 'PD001', 'Monday', '13:00:00', 'available'),
(286, 'PD001', 'Monday', '14:00:00', 'available'),
(287, 'PD001', 'Monday', '15:00:00', 'available'),
(288, 'PD001', 'Monday', '16:00:00', 'available'),
(289, 'PD001', 'Tuesday', '09:00:00', 'available'),
(290, 'PD001', 'Tuesday', '10:00:00', 'available'),
(291, 'PD001', 'Tuesday', '11:00:00', 'available'),
(292, 'PD001', 'Tuesday', '12:00:00', 'available'),
(293, 'PD001', 'Tuesday', '13:00:00', 'available'),
(294, 'PD001', 'Tuesday', '14:00:00', 'available'),
(295, 'PD001', 'Tuesday', '15:00:00', 'available'),
(296, 'PD001', 'Tuesday', '16:00:00', 'available'),
(297, 'PD001', 'Wednesday', '09:00:00', 'available'),
(298, 'PD001', 'Wednesday', '10:00:00', 'available'),
(299, 'PD001', 'Wednesday', '11:00:00', 'available'),
(300, 'PD001', 'Wednesday', '12:00:00', 'available'),
(301, 'PD001', 'Wednesday', '13:00:00', 'available'),
(302, 'PD001', 'Wednesday', '14:00:00', 'available'),
(303, 'PD001', 'Wednesday', '15:00:00', 'available'),
(304, 'PD001', 'Wednesday', '16:00:00', 'available'),
(305, 'PD001', 'Thursday', '09:00:00', 'available'),
(306, 'PD001', 'Thursday', '10:00:00', 'available'),
(307, 'PD001', 'Thursday', '11:00:00', 'available'),
(308, 'PD001', 'Thursday', '12:00:00', 'available'),
(309, 'PD001', 'Thursday', '13:00:00', 'available'),
(310, 'PD001', 'Thursday', '14:00:00', 'available'),
(311, 'PD001', 'Thursday', '15:00:00', 'available'),
(312, 'PD001', 'Thursday', '16:00:00', 'available'),
(313, 'PD001', 'Friday', '09:00:00', 'available'),
(314, 'PD001', 'Friday', '10:00:00', 'available'),
(315, 'PD001', 'Friday', '11:00:00', 'available'),
(316, 'PD001', 'Friday', '12:00:00', 'available'),
(317, 'PD001', 'Friday', '13:00:00', 'available'),
(318, 'PD001', 'Friday', '14:00:00', 'available'),
(319, 'PD001', 'Friday', '15:00:00', 'available'),
(320, 'PD001', 'Friday', '16:00:00', 'available'),
(382, 'DG009', 'Monday', '09:00:00', 'available'),
(383, 'DG009', 'Monday', '10:00:00', 'available'),
(384, 'DG009', 'Monday', '11:00:00', 'available'),
(385, 'DG009', 'Tuesday', '09:00:00', 'available'),
(386, 'DG009', 'Tuesday', '10:00:00', 'available'),
(387, 'DG009', 'Tuesday', '11:00:00', 'available'),
(388, 'DG009', 'Wednesday', '09:00:00', 'available'),
(389, 'DG009', 'Wednesday', '10:00:00', 'available'),
(390, 'DG009', 'Wednesday', '11:00:00', 'available'),
(391, 'DG009', 'Thursday', '09:00:00', 'available'),
(392, 'DG009', 'Thursday', '10:00:00', 'available'),
(393, 'DG009', 'Thursday', '11:00:00', 'available'),
(394, 'DG009', 'Friday', '09:00:00', 'available'),
(395, 'DG009', 'Friday', '10:00:00', 'available'),
(396, 'DG009', 'Friday', '11:00:00', 'available');

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
(64, 'GP001', 'Tuesday', '16:00', 'unavailable'),
(65, 'DG001', 'Monday', '09:00', 'available'),
(66, 'DG001', 'Monday', '10:00', 'available'),
(67, 'DG001', 'Monday', '11:00', 'available'),
(68, 'DG001', 'Monday', '12:00', 'available'),
(69, 'DG001', 'Monday', '13:00', 'available'),
(70, 'DG001', 'Monday', '14:00', 'available'),
(71, 'DG001', 'Monday', '15:00', 'available'),
(72, 'DG001', 'Monday', '16:00', 'available');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `username`, `password`, `pin`) VALUES
(1, 'patient', 'password', '123456'),
(2, 'patient1', 'password1', '111'),
(3, 'pa', 'pa', '11'),
(4, 'ss', 'ss', '11'),
(5, 'mrdeno', 'deno', '11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `appointmentlink`
--
ALTER TABLE `appointmentlink`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctorID`);

--
-- Indexes for table `doctors_schedule`
--
ALTER TABLE `doctors_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  ADD PRIMARY KEY (`scheduleID`),
  ADD KEY `doctorID` (`doctorID`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `appointmentlink`
--
ALTER TABLE `appointmentlink`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctors_schedule`
--
ALTER TABLE `doctors_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=397;

--
-- AUTO_INCREMENT for table `doctor_schedule`
--
ALTER TABLE `doctor_schedule`
  MODIFY `scheduleID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointmentlink`
--
ALTER TABLE `appointmentlink`
  ADD CONSTRAINT `appointmentlink_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
