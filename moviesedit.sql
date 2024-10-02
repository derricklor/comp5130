-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2024 at 11:52 PM
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
-- Database: `moviedb`
--

-- --------------------------------------------------------

--
-- Table structure for table `movies`
--

CREATE TABLE `movies` (
  `title` varchar(255) NOT NULL,
  `released` int(11) DEFAULT NULL,
  `runtime` int(11) DEFAULT NULL,
  `director` varchar(255) DEFAULT NULL,
  `id` int(11) DEFAULT NULL,
  `rating` double DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `plot` varchar(255) DEFAULT NULL,
  `actors` varchar(255) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `movies`
--

INSERT INTO `movies` (`title`, `released`, `runtime`, `director`, `id`, `rating`, `genre`, `plot`, `actors`, `poster`) VALUES
('The Avengers', 20120504, 143, 'Joss Whedon', '', 8.1, 'Action, Sci-Fi, Thriller', 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.', 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth', 'http://ia.media-imdb.com/images/M/MV5BMTk2NTI1MTU4N15BMl5BanBnXkFtZTcwODg0OTY0Nw@@._V1_SX300.jpg'),
('Avatar', 20091218, 162, 'James Cameron', '', 7.9, 'Action, Adventure, Fantasy', 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang', 'http://ia.media-imdb.com/images/M/MV5BMTYwOTEwNjAzMl5BMl5BanBnXkFtZTcwODc5MTUwMw@@._V1_SX300.jpg'),
('300', 20060309, 117, 'Zack Snyder', '', 7.7, 'Action, Drama, Fantasy', 'King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.', 'Gerard Butler, Lena Headey, Dominic West, David Wenham', 'http://ia.media-imdb.com/images/M/MV5BMjAzNTkzNjcxNl5BMl5BanBnXkFtZTYwNDA4NjE3._V1_SX300.jpg'),
('Interstellar', 20141107, 169, 'Christopher Nolan', '', 8.6, 'Adventure, Drama, Sci-Fi', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', 'Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow', 'http://ia.media-imdb.com/images/M/MV5BMjIxNTU4MzY4MF5BMl5BanBnXkFtZTgwMzM4ODI3MjE@._V1_SX300.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
