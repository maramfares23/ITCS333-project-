-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2025 at 09:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campus_hub`
--

-- --------------------------------------------------------

--
-- Table structure for table `course_reviews`
--

CREATE TABLE `course_reviews` (
  `id` int(11) NOT NULL,
  `course` varchar(255) NOT NULL,
  `instructor` varchar(255) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` between 1 and 5),
  `review` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_reviews`
--

INSERT INTO `course_reviews` (`id`, `course`, `instructor`, `department`, `rating`, `review`, `created_at`) VALUES
(4, 'ITCS333-INTERNET SOFTWARE DEVELOPMENT', 'Dr.Abdulla', 'CS', 5, 'the doctor is good', '2025-05-13 19:16:31'),
(5, 'ITCS411 - CRYPTOGRAPHY & COMPUTER SECURITY', 'Dr.Abdulla', 'CS', 4, 'the good doctor', '2025-05-13 19:39:40'),
(6, 'ITCS112-Digital Design I', 'Dr.Jalal', 'CE', 4, 'the course is vary good', '2025-05-13 19:43:51'),
(7, 'ITCS211-Digital Design II', 'Dr.Reem', 'CE', 2, 'the course is good', '2025-05-13 19:47:12');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course_reviews`
--
ALTER TABLE `course_reviews`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course_reviews`
--
ALTER TABLE `course_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
