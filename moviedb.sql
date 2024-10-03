-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2024 at 06:44 PM
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
  `id` int(11) NOT NULL,
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
('The Avengers', 20120504, 143, 'Joss Whedon', 1, 8.1, 'Action, Sci-Fi, Thriller', 'Earth\'s mightiest heroes must come together and learn to fight as a team if they are to stop the mischievous Loki and his alien army from enslaving humanity.', 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth', 'https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('Avatar', 20091218, 162, 'James Cameron', 2, 7.9, 'Action, Adventure, Fantasy', 'A paraplegic marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', 'Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang', 'https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_QL75_UY562_CR1,0,380,562_.jpg'),
('300', 20060309, 117, 'Zack Snyder', 3, 7.7, 'Action, Drama, Fantasy', 'King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.', 'Gerard Butler, Lena Headey, Dominic West, David Wenham', 'https://m.media-amazon.com/images/M/MV5BMTI4MDE3ODcwNV5BMl5BanBnXkFtZTcwNjYwMjk2MQ@@._V1_FMjpg_UX315_.jpg'),
('Interstellar', 20141107, 169, 'Christopher Nolan', 4, 8.6, 'Adventure, Drama, Sci-Fi', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.', 'Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow', 'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('Deadpool & Wolverine', 20240726, 128, 'Shawn Levy', 5, 7.9, 'Comedy, Action, Superhero', 'Deadpool is offered a place in the Marvel Cinematic Universe by the Time Variance Authority, but instead recruits a variant of Wolverine to save his universe from extinction', 'Ryan Reynolds, Hugh Jackman, Emma Corrin', 'https://m.media-amazon.com/images/M/MV5BZTk5ODY0MmQtMzA3Ni00NGY1LThiYzItZThiNjFiNDM4MTM3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('Alien: Romulus', 20240819, 119, 'Fede Alvarez', 6, 7.4, 'Horror, Sci-Fi', 'While scavenging the deep ends of a derelict space station, a group of young space colonists come face to face with the most terrifying life form in the universe.', 'Cailee Spaeny, David Jonsson, Archie Renau', 'https://m.media-amazon.com/images/M/MV5BMDU0NjcwOGQtNjNjOS00NzQ3LWIwM2YtYWVmODZjMzQzN2ExXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('Spirited Away', 20020831, 135, 'Hayao Miyazaki', 7, 8.6, 'Anime, Supernatural, Adventure', 'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, and where humans are changed into beasts.', 'Daveigh Chase, Suzanne Pleshette, Miyu Irino', 'https://m.media-amazon.com/images/M/MV5BNTEyNmEwOWUtYzkyOC00ZTQ4LTllZmUtMjk0Y2YwOGUzYjRiXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('Dune: Part Two', 20240301, 166, 'Denis Villeneuve', 8, 8.5, 'Sci-Fi, Action, Drama', 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 'Timothee Chalamet, Zendaya, Rebecca Ferguson', 'https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('The Fall Guy', 20240503, 125, 'David Leitch', 9, 6.9, 'Action, Comedy, Romance', 'A stuntman, fresh off an almost career-ending accident, has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job. What could possibly go right?', 'Ryan Gosling, Emily Blunt, Aaron Taylor-Johnson', 'https://m.media-amazon.com/images/M/MV5BM2U0MTJiYTItMjNiZS00MzU4LTkxYTAtYTU0ZGY1ODJhMjRhXkEyXkFqcGc@._V1_QL75_UX380_CR0,20,380,562_.jpg'),
('Spider-Man: Across the Spider-Verse', 20230602, 140, ' Joaquim Dos Santos', 10, 8.6, 'Animation, Superhero, Adventure', 'Miles Morales catapults across the multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero', 'Shameik Moore, Hailee Steinfeld, Brian Tyree Henry', 'https://m.media-amazon.com/images/M/MV5BNThiZjA3MjItZGY5Ni00ZmJhLWEwN2EtOTBlYTA4Y2E0M2ZmXkEyXkFqcGc@._V1_QL75_UX380_CR0,1,380,562_.jpg'),
('Oppenheimer', 20230721, 180, 'Christopher Nolan', 11, 8.3, 'Biography, Drama, Epic', 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 'Cillian Murphy, Emily Blunt, Matt Damon', 'https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('Godzilla Minus One', 20231201, 125, 'Takashi Yamazaki', 12, 7.7, 'Action, Horror, Epic', 'Post-war Japan is at its lowest point when a new crisis emerges in the form of a giant monster, baptized in the horrific power of the atomic bomb.', 'Munetaka Aoki, Minami Hamabe, Sakura Ando', 'https://m.media-amazon.com/images/M/MV5BMjc5MjllMGUtMDIwMS00ZDVkLWEzODQtM2NlMTMwMTZhNThmXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('Mission: Impossible - Dead Reckoning Part One', 20230712, 163, 'Christopher McQuarrie', 13, 7.7, 'Action, Thriller, Adventure', 'Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.', 'Tom Cruise, Hayley Atwell, Ving Rhames', 'https://m.media-amazon.com/images/M/MV5BN2U4OTdmM2QtZTkxYy00ZmQyLTg2N2UtMDdmMGJmNDhlZDU1XkEyXkFqcGc@._V1_QL75_UY562_CR1,0,380,562_.jpg'),
('Top Gun: Maverick', 20220527, 131, 'Joseph Kosinski', 14, 8.2, 'Action, Drama, Epic', 'The story involves Maverick confronting his past while training a group of younger Top Gun graduates, including the son of his deceased best friend, for a dangerous mission.', 'Tom Cruise, Jennifer Connelly, Miles Teller', 'https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg'),
('All Quiet on the Western Front', 20221014, 147, 'Edward Berger', 15, 7.8, 'War, Action, Drama', 'A young German soldier\'s terrifying experiences and distress on the western front during World War I.', 'Felix Kammerer, Albrecht Schuch, Aaron Hilmer', 'https://m.media-amazon.com/images/M/MV5BOWJiYWMyYTktZThhOS00ZjgxLWE0YTQtZDMyNTQxMjMyYjI2XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movies`
--
ALTER TABLE `movies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
