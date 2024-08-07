-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2024 at 10:44 AM
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
-- Database: `expense-tracker-application`
--

-- --------------------------------------------------------

--
-- Table structure for table `budgets`
--

CREATE TABLE `budgets` (
  `budget_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `category_name` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `expense_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `amount` decimal(10,0) DEFAULT NULL,
  `expense_date` date DEFAULT current_timestamp(),
  `description` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `payment_method_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `payment_method_name` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `user_id` int(11) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`created_at`, `user_id`, `username`, `email`, `password`, `updated_at`) VALUES
('2024-07-29 21:16:52.269233', 1, 'alunyapatrick', 'patrickalunya2021@gmail.com', '$2b$10$gEnzJGrHQ2B10vQzQkdNCOwFdNf4osn25un7gMzYmAlKGyrr0PEHO', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 2, '12345', 'alunyapatricksolutions@gmail.com', '$2b$10$FzLrCLcO7Gz1UvGw93n.iOqTsm/15aG0xn18lvwZ6Ibr5Z87ZT/em', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 3, 's09-9199-2021', 'sandeyosamsolutions@gmail.com', '$2b$20$AOUW3YYzjyvAeXIL/yNMF.nWRRHUeF4/oKxbn7s4T8UM6tLd5jKPK', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 4, 'alunyapat', 'chris@gnail.com', '$2b$10$n58H/7vKu6IBNSYFADZBlOMcRsr4ptJYeCf4vWi2LeSh8ASVC/C/2', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 5, 'patricky2002', 'micky@gmail.com', '$2b$10$pLFa65ltioJmta8aYu.6V..u6DCkJrvQUSQhXhNLBb.HbW8Syjjya', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 6, 'patoo2024', 'patrick@gmail.com', '$2b$10$S1SqljdIBVueQx376KefheACw0IFnfkMJkB5AoOJW8OOdEYndHBvq', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 7, 'sande', 'sande@gmail.com', '$2b$10$8FvtceSi.Gp8rPo9EPxx6.8l5LVKAAtOM0cxCr76igcsuj.1uXCz.', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 8, 'yosam', 'yosam@gmail.com', '$2b$10$AglA2R0FN.XJ.vwgCQVTB.oPUB441bB7mP4T.5ee1g2jQ50cXEsiq', '2024-07-29 21:18:10.735268'),
('2024-07-29 21:16:52.269233', 9, 'alunyapat', 'test@beispiel.de', '$2b$10$peO/IF.XXtY8Nw24mn1FJeRMkFAKWIJhlii2cUGqk2LslXbSgTjaC', '2024-07-29 21:18:10.735268');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `budgets`
--
ALTER TABLE `budgets`
  ADD PRIMARY KEY (`budget_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`category_id`) USING BTREE,
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`payment_method_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `budgets`
--
ALTER TABLE `budgets`
  ADD CONSTRAINT `budgets_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `budgets_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD CONSTRAINT `payment_methods_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
