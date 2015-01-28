-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Jan 26, 2015 at 05:51 PM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `cloudMatrix`
--

-- --------------------------------------------------------

--
-- Table structure for table `linkedTenantCatalogs`
--

CREATE TABLE `linkedTenantCatalogs` (
  `id` int(4) unsigned NOT NULL AUTO_INCREMENT,
  `linkedTenantID` int(4) NOT NULL,
  `providerID` int(4) NOT NULL,
  `defaultCatalogID` int(3) NOT NULL,
  `serviceName` varchar(255) NOT NULL,
  `points` int(6) NOT NULL,
  `startingPrice` decimal(10,0) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=264 ;

--
-- Dumping data for table `linkedTenantCatalogs`
--

INSERT INTO `linkedTenantCatalogs` (`id`, `linkedTenantID`, `providerID`, `defaultCatalogID`, `serviceName`, `points`, `startingPrice`, `description`, `icon`) VALUES
(232, 80, 2, 0, '', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png'),
(233, 80, 1, 0, '', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466761/providers/aws.jpg'),
(234, 80, 2, 0, '', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png'),
(235, 80, 1, 0, '', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466761/providers/aws.jpg'),
(236, 80, 2, 3, 'Some Google Service', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png'),
(243, 81, 23, 29, 'Azure Service', 0, 0, 'sdfsdg', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/azure.png'),
(244, 81, 2, 3, 'Some Google Service', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png'),
(245, 81, 1, 2, 'Another Amazon Service', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466761/providers/aws.jpg'),
(251, 82, 2, 3, 'Some Google Service', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png'),
(252, 82, 23, 29, 'Azure Service', 0, 0, 'sdfsdg', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/azure.png'),
(253, 82, 1, 2, 'Another Amazon Service', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466761/providers/aws.jpg'),
(254, 82, 1, 1, 'Some Amazon Service', 0, 0, '', 'http://res.cloudinary.com/gravitant/image/upload/v1413466761/providers/aws.jpg'),
(260, 79, 23, 29, 'Azure Service', 0, 320, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/azure.png'),
(261, 79, 2, 3, 'Some Google Service', 0, 450, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png'),
(262, 79, 1, 2, 'Another Amazon Service', 0, 750, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'http://res.cloudinary.com/gravitant/image/upload/v1413466761/providers/aws.jpg'),
(263, 79, 2, 31, 'google service', 0, 500, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png');

-- --------------------------------------------------------

--
-- Table structure for table `linkedTenants`
--

CREATE TABLE `linkedTenants` (
  `id` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `masterTenantID` int(3) NOT NULL,
  `catalogID` int(3) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=83 ;

--
-- Dumping data for table `linkedTenants`
--

INSERT INTO `linkedTenants` (`id`, `masterTenantID`, `catalogID`, `name`) VALUES
(75, 100, 0, 'link'),
(76, 100, 0, 'bup'),
(77, 100, 0, 'npo'),
(78, 100, 0, 'non'),
(79, 100, 0, 'new tenant'),
(80, 100, 0, 'testing'),
(81, 100, 0, 'more'),
(82, 100, 0, 'jb;');

-- --------------------------------------------------------

--
-- Table structure for table `masterTenants`
--

CREATE TABLE `masterTenants` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `tenants` int(3) NOT NULL,
  `defaultCatalog` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=102 ;

--
-- Dumping data for table `masterTenants`
--

INSERT INTO `masterTenants` (`id`, `name`, `tenants`, `defaultCatalog`) VALUES
(100, 'Master Tenant', 4, 1),
(101, 'Add form field', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `providers`
--

CREATE TABLE `providers` (
  `id` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `providers`
--

INSERT INTO `providers` (`id`, `name`, `icon`, `description`) VALUES
(1, 'Amazon', 'http://res.cloudinary.com/gravitant/image/upload/v1413466761/providers/aws.jpg', 'Some Amazon description'),
(2, 'Google', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/google.png', 'Some Google description'),
(23, 'Azure', 'http://res.cloudinary.com/gravitant/image/upload/v1413466762/providers/azure.png', 'sdhsdg');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(2) unsigned NOT NULL AUTO_INCREMENT,
  `providerID` int(2) NOT NULL DEFAULT '1',
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=32 ;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `providerID`, `name`, `price`, `description`) VALUES
(1, 1, 'Some Amazon Service', 320, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
(2, 1, 'Another Amazon Service', 150, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
(3, 2, 'Some Google Service', 400, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
(29, 23, 'Azure Service', 980, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
(31, 2, 'google service', 450, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
