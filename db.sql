-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 07, 2018 at 05:41 PM
-- Server version: 5.7.21-0ubuntu0.16.04.1
-- PHP Version: 7.0.28-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asergis_crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `crm_address`
--

CREATE TABLE `crm_address` (
  `id` int(11) NOT NULL,
  `address_type` enum('Default','Mailing','Billing','Shipping','Others') DEFAULT 'Default',
  `street` text,
  `city` int(11) DEFAULT NULL,
  `state_province` int(11) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `country` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_address`
--

INSERT INTO `crm_address` (`id`, `address_type`, `street`, `city`, `state_province`, `zip_code`, `country`) VALUES
(1, 'Default', NULL, 5, 5, '784512', 105),
(2, 'Default', NULL, 5, 5, '784512', 105),
(3, 'Default', NULL, 5, 5, '784512', 105),
(4, 'Default', NULL, 5, 5, '784512', 105),
(5, 'Default', NULL, 5, 5, '784512', 105),
(6, 'Default', NULL, 5, 5, '784512', 105),
(7, 'Default', NULL, 5, 5, '784512', 105),
(8, 'Default', NULL, 5, 5, '784512', 105),
(9, 'Default', NULL, 5, 5, '784512', 105),
(10, 'Default', NULL, 5, 5, '784512', 105),
(11, 'Default', NULL, 5, 5, '784512', 105),
(12, 'Default', NULL, 5, 5, '784512', 105),
(13, 'Default', NULL, 5, 5, '784512', 105),
(14, 'Default', NULL, 5, 5, '784512', 105),
(15, 'Default', 'dffdf', NULL, NULL, '110096', NULL),
(16, 'Default', 'dffdf', NULL, NULL, '110096', NULL),
(17, 'Default', 'dffdf', NULL, NULL, '110096', NULL),
(18, 'Default', 'dffdf', NULL, NULL, '110096', NULL),
(19, 'Default', 'A 19 First Floor Sector 16', NULL, NULL, '201301', NULL),
(20, 'Default', NULL, NULL, NULL, NULL, NULL),
(21, 'Default', NULL, NULL, NULL, NULL, NULL),
(22, 'Default', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `crm_campaign`
--

CREATE TABLE `crm_campaign` (
  `id` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `id_crm_campaign_type_master` int(11) DEFAULT NULL,
  `campaign_name` varchar(50) DEFAULT NULL,
  `campaign_status` enum('Planning','Active','Inactive','Complete') DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `expected_revenue` varchar(50) NOT NULL,
  `budgeted_cost` varchar(50) DEFAULT NULL,
  `actual_cost` varchar(100) NOT NULL,
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_campaign`
--

INSERT INTO `crm_campaign` (`id`, `owner`, `id_crm_campaign_type_master`, `campaign_name`, `campaign_status`, `start_date`, `end_date`, `expected_revenue`, `budgeted_cost`, `actual_cost`, `description`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 786, 2, 'hasan campaign', 'Active', NULL, NULL, '65', '7', '767', '676', 0, '2018-04-06 05:09:29', '2018-04-06 05:09:29', NULL, 786, NULL, NULL),
(2, 786, 1, 'hasan test campaign', 'Planning', '2018-05-05 00:00:00', '2018-05-05 00:00:00', '1878', '177', '1222', NULL, 0, '2018-04-06 05:10:00', '2018-04-06 05:10:00', NULL, 786, NULL, NULL),
(3, 786, 1, 'hasan test campaign', 'Planning', '2018-05-05 00:00:00', '2018-05-05 00:00:00', '1878', '177', '1222', NULL, 0, '2018-04-06 05:10:01', '2018-04-06 05:10:01', NULL, 786, NULL, NULL),
(4, 786, 1, 'hasan test campaign', 'Planning', '2018-05-05 00:00:00', '2018-05-05 00:00:00', '1878', '177', '1222', NULL, 0, '2018-04-06 05:10:02', '2018-04-06 05:10:02', NULL, 786, NULL, NULL),
(5, 786, 1, 'hasan test campaign', 'Planning', '2018-05-05 00:00:00', '2018-05-05 00:00:00', '1878', '177', '1222', NULL, 0, '2018-04-06 05:10:02', '2018-04-06 05:10:02', NULL, 786, NULL, NULL),
(6, 786, 1, 'hasan only', 'Planning', '2018-05-05 00:00:00', '2018-05-05 00:00:00', '1878', '177', '1222', NULL, 0, '2018-04-06 05:10:02', '2018-04-07 10:21:57', NULL, 786, 786, NULL),
(7, 786, 1, 'hasan test campaign', 'Planning', '2018-05-05 00:00:00', '2018-05-05 00:00:00', '1878', '177', '1222', NULL, 0, '2018-04-06 05:10:03', '2018-04-06 05:10:03', NULL, 786, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `crm_campaign_link`
--

CREATE TABLE `crm_campaign_link` (
  `id` int(11) NOT NULL,
  `module_name` enum('Lead','Contact','Deal','') NOT NULL,
  `module_id` int(11) NOT NULL,
  `id_crm_campaign` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_campaign_link`
--

INSERT INTO `crm_campaign_link` (`id`, `module_name`, `module_id`, `id_crm_campaign`) VALUES
(11, 'Lead', 2, 3),
(12, 'Lead', 8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `crm_campaign_type_master`
--

CREATE TABLE `crm_campaign_type_master` (
  `id` int(11) NOT NULL,
  `campaign_type` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_campaign_type_master`
--

INSERT INTO `crm_campaign_type_master` (`id`, `campaign_type`, `weight`) VALUES
(1, 'Conference', 0),
(2, 'Webinar', 0),
(3, 'Banner Ads', 0),
(4, 'Telemarketing', 0),
(6, 'Email', 0),
(7, 'Trade Show', 0),
(8, 'Public Relations', 0),
(9, 'Others', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_company`
--

CREATE TABLE `crm_company` (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `id_crm_company_status_master` tinyint(3) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `company_email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `id_crm_company_type_master` int(11) DEFAULT NULL,
  `id_crm_industry_master` int(11) DEFAULT NULL,
  `id_crm_company_ownership_master` int(11) DEFAULT NULL,
  `no_of_employees` int(11) DEFAULT NULL,
  `annual_revenue` int(11) DEFAULT NULL,
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_company`
--

INSERT INTO `crm_company` (`id`, `owner`, `id_crm_company_status_master`, `company_name`, `registration_number`, `company_email`, `phone`, `fax`, `website`, `id_crm_company_type_master`, `id_crm_industry_master`, `id_crm_company_ownership_master`, `no_of_employees`, `annual_revenue`, `description`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 786, 2, 'B9F37685-3', 'R-784512', 'CDJN@gmail.com', NULL, NULL, NULL, 2, 3, 1, 120, 85475, 'Description', 0, '2018-04-05 06:39:15', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(2, 786, 2, 'B9F58619-3', '78451254', 'NDBU@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:30:58', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(3, 786, 2, 'B9F5870E-3', '78451254', 'YMMA@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:31:02', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(4, 786, 2, 'B9F5874D-3', '78451254', 'PCMI@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:31:07', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(5, 786, 2, 'B9F5877D-3', '78451254', 'CLCD@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:31:12', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(6, 786, 2, 'B9F587A8-3', '78451254', 'JMGW@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:31:21', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(7, 786, 2, 'B9F587D4-3', '78451254', 'TBBB@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:31:29', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(8, 786, 2, 'B9F58801-3', '78451254', 'BESD@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:31:29', '2018-04-07 06:41:39', NULL, 786, NULL, NULL),
(9, 786, 2, 'B9F5882D-3', '78451254', 'MBVB@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-07 06:31:29', '2018-04-07 06:41:39', NULL, 786, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_activity_task`
--

CREATE TABLE `crm_company_activity_task` (
  `id` int(11) NOT NULL,
  `id_crm_company` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `due_date` datetime NOT NULL,
  `task_status` enum('Not Started','Deferred','In Progress','Completed','Waiting on Someone Else') DEFAULT NULL,
  `recurrence_type` enum('daily','weekly','monthly','yearly','none') NOT NULL COMMENT '''daily'',''weekly'',''monthly'',''yearly'',''none''',
  `end_date_option` tinyint(1) DEFAULT NULL COMMENT '1 means no end date, 2 means end after n occurence and 3 means end by any date	',
  `end_after_occurence` int(11) DEFAULT NULL COMMENT 'number of occurrence before end ',
  `recurrence_end_date` datetime DEFAULT NULL COMMENT 'recurrence end date',
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_address`
--

CREATE TABLE `crm_company_address` (
  `id_crm_company` int(11) DEFAULT NULL,
  `id_crm_address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_attachement`
--

CREATE TABLE `crm_company_attachement` (
  `id` int(11) NOT NULL,
  `id_crm_company` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_note`
--

CREATE TABLE `crm_company_note` (
  `id` int(11) NOT NULL,
  `id_crm_company` int(11) NOT NULL,
  `note_title` varchar(255) DEFAULT NULL,
  `note_description` text NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_note_attachement`
--

CREATE TABLE `crm_company_note_attachement` (
  `id` int(11) NOT NULL,
  `id_crm_company_note` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_ownership_master`
--

CREATE TABLE `crm_company_ownership_master` (
  `id` int(11) NOT NULL,
  `company_ownership` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_company_ownership_master`
--

INSERT INTO `crm_company_ownership_master` (`id`, `company_ownership`, `weight`) VALUES
(1, 'private', 0),
(2, 'public', 0),
(3, 'government', 0),
(4, 'subsidiary', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_recurrence_daily`
--

CREATE TABLE `crm_company_recurrence_daily` (
  `id` int(11) NOT NULL,
  `id_crm_company_activity_task` int(11) NOT NULL,
  `daily_option` enum('daily','weekday') DEFAULT 'daily',
  `daily_day_no` int(11) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_recurrence_monthly`
--

CREATE TABLE `crm_company_recurrence_monthly` (
  `id` int(11) NOT NULL,
  `id_crm_company_activity_task` int(11) NOT NULL,
  `monthly_option` enum('day','weekly') DEFAULT 'day',
  `monthly_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_week` varchar(25) DEFAULT NULL,
  `monthly_day_of_week` varchar(25) DEFAULT NULL,
  `monthly_of_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_recurrence_weekly`
--

CREATE TABLE `crm_company_recurrence_weekly` (
  `id` int(11) NOT NULL,
  `id_crm_company_activity_task` int(11) NOT NULL,
  `recur_every_week` int(11) NOT NULL DEFAULT '0',
  `weekly_monday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_tuesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_wednesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_thursday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_friday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_saturday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_sunday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_recurrence_yearly`
--

CREATE TABLE `crm_company_recurrence_yearly` (
  `id` int(11) NOT NULL,
  `id_crm_company_activity_task` int(11) NOT NULL,
  `recur_every_year` tinyint(4) UNSIGNED DEFAULT NULL COMMENT '1 means yes and 0 means no',
  `yearly_option` enum('monthly','weekly') DEFAULT 'monthly',
  `yearly_on_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `yearly_on_month_day` tinyint(4) UNSIGNED DEFAULT NULL,
  `yearly_week` enum('first','second','third','fourth','last') DEFAULT 'first',
  `yearly_day_of_week` enum('day','weekday','weekend day','sunday','monday','tuesday','wednesday','thursday','friday','saturday') DEFAULT 'monday',
  `yearly_of_every_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '1 means deleted and 0 means undeleted',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_status_master`
--

CREATE TABLE `crm_company_status_master` (
  `id` tinyint(3) NOT NULL,
  `company_status` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_company_status_master`
--

INSERT INTO `crm_company_status_master` (`id`, `company_status`, `weight`) VALUES
(1, 'None', 0),
(2, 'Acquired', 0),
(3, 'Active', 0),
(4, 'Market Failed', 0),
(5, 'Project Cancelled', 0),
(6, 'Shut Down', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_company_type_master`
--

CREATE TABLE `crm_company_type_master` (
  `id` int(11) NOT NULL,
  `company_type` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_company_type_master`
--

INSERT INTO `crm_company_type_master` (`id`, `company_type`, `weight`) VALUES
(1, 'analyst', 0),
(2, 'competitor', 0),
(3, 'customer', 0),
(4, 'integrator', 0),
(5, 'investor', 0),
(6, 'partner', 0),
(7, 'press', 0),
(8, 'prospect', 0),
(9, 'reseller', 0),
(10, 'others', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact`
--

CREATE TABLE `crm_contact` (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `id_crm_lead_contact_parent` int(11) NOT NULL,
  `id_crm_company` int(11) NOT NULL,
  `home_phone` varchar(20) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `assistant_name` varchar(50) DEFAULT NULL,
  `assistant_parent_id` int(11) DEFAULT NULL,
  `assistant_phone` varchar(50) DEFAULT NULL,
  `reports_to_name` varchar(50) DEFAULT NULL,
  `reports_to_parent_id` int(11) DEFAULT NULL,
  `id_crm_pipeline_stage` tinyint(3) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_contact`
--

INSERT INTO `crm_contact` (`id`, `owner`, `id_crm_lead_contact_parent`, `id_crm_company`, `home_phone`, `department`, `date_of_birth`, `assistant_name`, `assistant_parent_id`, `assistant_phone`, `reports_to_name`, `reports_to_parent_id`, `id_crm_pipeline_stage`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 786, 52, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:39', '2018-04-05 06:50:25', NULL, 786, NULL, NULL),
(3, 786, 47, 1, '451245787', 'IT ', '2018-02-07', NULL, 9, '7845125478', 'Reza', 11, 2, 0, '2018-04-05 06:39:37', '2018-04-05 07:09:15', NULL, 786, NULL, 786),
(4, 786, 48, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:38', '2018-04-05 06:39:38', NULL, 786, NULL, NULL),
(5, 786, 49, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:38', '2018-04-05 06:39:38', NULL, 786, NULL, NULL),
(6, 786, 50, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:39', '2018-04-05 06:39:39', NULL, 786, NULL, NULL),
(7, 786, 51, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:39', '2018-04-05 06:39:39', NULL, 786, NULL, NULL),
(9, 786, 53, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:39', '2018-04-05 06:39:39', NULL, 786, NULL, NULL),
(10, 786, 54, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:39', '2018-04-05 06:39:39', NULL, 786, NULL, NULL),
(11, 786, 55, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:39', '2018-04-05 06:39:39', NULL, 786, NULL, NULL),
(12, 786, 56, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:39', '2018-04-05 06:39:39', NULL, 786, NULL, NULL),
(13, 786, 57, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:40', '2018-04-05 06:39:40', NULL, 786, NULL, NULL),
(14, 786, 58, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:40', '2018-04-05 06:39:40', NULL, 786, NULL, NULL),
(15, 786, 59, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:40', '2018-04-05 06:39:40', NULL, 786, NULL, NULL),
(16, 786, 60, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:40', '2018-04-05 06:39:40', NULL, 786, NULL, NULL),
(17, 786, 61, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2018-04-05 06:39:40', '2018-04-05 06:39:40', NULL, 786, NULL, NULL),
(18, 786, 62, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2018-04-05 06:39:40', '2018-04-05 06:47:59', '2018-04-05 06:47:59', 786, NULL, 786),
(19, 786, 63, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2018-04-05 06:39:41', '2018-04-05 06:40:13', '2018-04-05 06:40:13', 786, NULL, 786);

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_activity_task`
--

CREATE TABLE `crm_contact_activity_task` (
  `id` int(11) NOT NULL,
  `id_crm_contact` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `due_date` datetime NOT NULL,
  `task_status` enum('Not Started','Deferred','In Progress','Completed','Waiting on Someone Else') DEFAULT NULL,
  `recurrence_type` enum('daily','weekly','monthly','yearly','none') NOT NULL COMMENT '''daily'',''weekly'',''monthly'',''yearly'',''none''',
  `end_date_option` tinyint(1) DEFAULT NULL COMMENT '1 means no end date, 2 means end after n occurence and 3 means end by any date	',
  `end_after_occurence` int(11) DEFAULT NULL COMMENT 'number of occurrence before end ',
  `recurrence_end_date` datetime DEFAULT NULL COMMENT 'recurrence end date',
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_address`
--

CREATE TABLE `crm_contact_address` (
  `id_crm_contact` int(11) NOT NULL,
  `id_crm_address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_attachement`
--

CREATE TABLE `crm_contact_attachement` (
  `id` int(11) NOT NULL,
  `id_crm_contact` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_note`
--

CREATE TABLE `crm_contact_note` (
  `id` int(11) NOT NULL,
  `id_crm_contact` int(11) NOT NULL,
  `note_title` varchar(255) DEFAULT NULL,
  `note_description` text NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_note_attachement`
--

CREATE TABLE `crm_contact_note_attachement` (
  `id` int(11) NOT NULL,
  `id_crm_contact_note` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_recurrence_daily`
--

CREATE TABLE `crm_contact_recurrence_daily` (
  `id` int(11) NOT NULL,
  `id_crm_contact_activity_task` int(11) NOT NULL,
  `daily_option` enum('daily','weekday') DEFAULT 'daily',
  `daily_day_no` int(11) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_recurrence_monthly`
--

CREATE TABLE `crm_contact_recurrence_monthly` (
  `id` int(11) NOT NULL,
  `id_crm_contact_activity_task` int(11) NOT NULL,
  `monthly_option` enum('day','weekly') DEFAULT 'day',
  `monthly_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_week` varchar(25) DEFAULT NULL,
  `monthly_day_of_week` varchar(25) DEFAULT NULL,
  `monthly_of_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_recurrence_weekly`
--

CREATE TABLE `crm_contact_recurrence_weekly` (
  `id` int(11) NOT NULL,
  `id_crm_contact_activity_task` int(11) NOT NULL,
  `recur_every_week` int(11) NOT NULL DEFAULT '0',
  `weekly_monday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_tuesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_wednesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_thursday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_friday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_saturday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_sunday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_contact_recurrence_yearly`
--

CREATE TABLE `crm_contact_recurrence_yearly` (
  `id` int(11) NOT NULL,
  `id_crm_contact_activity_task` int(11) NOT NULL,
  `recur_every_year` tinyint(4) UNSIGNED DEFAULT NULL COMMENT '1 means yes and 0 means no',
  `yearly_option` enum('monthly','weekly') DEFAULT 'monthly',
  `yearly_on_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `yearly_on_month_day` tinyint(4) UNSIGNED DEFAULT NULL,
  `yearly_week` enum('first','second','third','fourth','last') DEFAULT 'first',
  `yearly_day_of_week` enum('day','weekday','weekend day','sunday','monday','tuesday','wednesday','thursday','friday','saturday') DEFAULT 'monday',
  `yearly_of_every_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '1 means deleted and 0 means undeleted',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_deal`
--

CREATE TABLE `crm_deal` (
  `id` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `id_crm_contact` int(11) NOT NULL,
  `id_crm_company` int(11) DEFAULT NULL,
  `deal_name` varchar(100) NOT NULL,
  `deal_type` enum('None','Existing Business','New Business') DEFAULT NULL,
  `deal_closing_date` datetime NOT NULL,
  `deal_amount` varchar(10) NOT NULL,
  `id_crm_lead_source_master` int(11) DEFAULT NULL,
  `id_crm_campaign` int(11) DEFAULT NULL,
  `id_crm_pipeline_stage` tinyint(3) DEFAULT NULL,
  `next_step` varchar(50) DEFAULT NULL,
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_deal`
--

INSERT INTO `crm_deal` (`id`, `owner`, `id_crm_contact`, `id_crm_company`, `deal_name`, `deal_type`, `deal_closing_date`, `deal_amount`, `id_crm_lead_source_master`, `id_crm_campaign`, `id_crm_pipeline_stage`, `next_step`, `description`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`) VALUES
(3, 786, 9, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 3, 6, NULL, NULL, 0, '2018-04-06 05:09:37', '2018-04-06 05:27:00', NULL),
(4, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:09:39', '2018-04-06 05:09:39', NULL),
(5, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:09:40', '2018-04-06 05:09:40', NULL),
(6, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:09:40', '2018-04-06 05:09:40', NULL),
(7, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:09:40', '2018-04-06 05:09:40', NULL),
(8, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, 3, NULL, NULL, 0, '2018-04-06 05:11:59', '2018-04-06 05:11:59', NULL),
(9, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, 3, NULL, NULL, 0, '2018-04-06 05:12:16', '2018-04-06 05:12:16', NULL),
(10, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, 3, NULL, NULL, 0, '2018-04-06 05:15:01', '2018-04-06 05:15:01', NULL),
(11, 786, 1, 1, 'hasan Deal', 'None', '2000-12-31 18:30:00', '1', 1, 1, 3, NULL, NULL, 0, '2018-04-06 05:15:30', '2018-04-06 05:15:30', NULL),
(12, 786, 1, 1, '1', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:57:53', '2018-04-06 05:57:53', NULL),
(13, 786, 1, 1, '1', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:58:18', '2018-04-06 05:58:18', NULL),
(14, 786, 1, 1, '1', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:59:25', '2018-04-06 05:59:25', NULL),
(15, 786, 1, 1, '1', 'None', '2000-12-31 18:30:00', '1', 1, 1, NULL, NULL, NULL, 0, '2018-04-06 05:59:27', '2018-04-06 05:59:27', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `crm_deal_pipeline_history`
--

CREATE TABLE `crm_deal_pipeline_history` (
  `id` int(11) NOT NULL,
  `id_crm_deal` int(11) NOT NULL,
  `id_crm_pipeline_stage` tinyint(3) NOT NULL,
  `amount` float DEFAULT NULL,
  `expected_revenue` varchar(50) DEFAULT NULL,
  `closing_date` datetime DEFAULT NULL,
  `stage_duration` varchar(50) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_industry_master`
--

CREATE TABLE `crm_industry_master` (
  `id` int(11) NOT NULL,
  `industry_name` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_industry_master`
--

INSERT INTO `crm_industry_master` (`id`, `industry_name`, `weight`) VALUES
(1, 'Wireless Industry', 0),
(2, 'ASP (Application Service Provider)', 0),
(3, 'Real Estate', 0),
(4, 'Service Provider', 0),
(5, 'Data/Telecom OEM', 0),
(6, 'ERP (Enterprise Resource Planning)', 0),
(7, 'Government/Military', 0),
(8, 'Large Enterprise', 0),
(9, 'MSP (Management Service provider', 0),
(10, 'Network Equippment Enterprise', 0),
(11, 'Storage Service Provider', 0),
(12, 'Storage Equipment', 0),
(13, 'System Integrator', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead`
--

CREATE TABLE `crm_lead` (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `id_crm_lead_contact_parent` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `id_crm_lead_status_master` int(11) DEFAULT NULL,
  `id_crm_rating_master` int(11) DEFAULT NULL,
  `no_of_employees` int(11) DEFAULT NULL,
  `annual_revenue` int(11) DEFAULT NULL,
  `id_crm_industry_master` int(11) DEFAULT NULL,
  `id_crm_pipeline_stage` tinyint(3) DEFAULT NULL,
  `is_lead_converted` tinyint(1) NOT NULL DEFAULT '0',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_lead`
--

INSERT INTO `crm_lead` (`id`, `owner`, `id_crm_lead_contact_parent`, `company_name`, `id_crm_lead_status_master`, `id_crm_rating_master`, `no_of_employees`, `annual_revenue`, `id_crm_industry_master`, `id_crm_pipeline_stage`, `is_lead_converted`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(1, 786, 115, 'Ratru', NULL, 5, NULL, NULL, 1, 2, 0, 0, '2018-04-06 10:25:15', '2018-04-07 09:24:19', NULL, 786, NULL, NULL),
(2, 786, 114, 'lkjhg', NULL, 5, NULL, NULL, 1, 1, 0, 0, '2018-04-06 10:23:33', '2018-04-07 09:24:24', NULL, 786, NULL, NULL),
(7, 786, 7, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 05:31:07', '2018-04-05 05:33:43', '2018-04-05 05:33:43', 786, NULL, NULL),
(8, 786, 8, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 05:33:58', '2018-04-05 06:06:24', '2018-04-05 06:06:24', 786, NULL, NULL),
(9, 786, 9, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 05:34:28', '2018-04-05 05:35:17', '2018-04-05 05:35:17', 786, NULL, NULL),
(10, 786, 10, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 05:34:31', '2018-04-05 05:36:28', '2018-04-05 05:36:28', 786, NULL, NULL),
(11, 786, 11, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 05:34:33', '2018-04-05 05:37:37', '2018-04-05 05:37:37', 786, NULL, NULL),
(13, 786, 13, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 05:57:29', '2018-04-05 05:58:34', '2018-04-05 05:58:34', 786, NULL, NULL),
(14, 786, 14, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2018-04-05 06:11:57', '2018-04-05 06:13:32', '2018-04-05 06:13:32', 786, NULL, NULL),
(15, 786, 15, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2018-04-05 06:12:09', '2018-04-05 06:49:52', '2018-04-05 06:49:52', 786, NULL, NULL),
(16, 786, 16, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2018-04-05 06:12:25', '2018-04-05 06:50:50', '2018-04-05 06:50:50', 786, NULL, NULL),
(17, 786, 17, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2018-04-05 06:12:37', '2018-04-05 06:52:26', '2018-04-05 06:52:26', 786, NULL, NULL),
(18, 786, 18, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:12:38', '2018-04-05 06:12:38', NULL, 786, NULL, NULL),
(19, 786, 19, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2018-04-05 06:12:39', '2018-04-05 06:17:27', '2018-04-05 06:17:27', 786, NULL, NULL),
(20, 786, 20, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:12:39', '2018-04-05 06:12:39', NULL, 786, NULL, NULL),
(21, 786, 21, 'Asergis', 4, 6, NULL, NULL, 4, 3, 0, 0, '2018-04-05 06:12:39', '2018-04-05 12:44:55', NULL, 786, NULL, NULL),
(22, 786, 22, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:12:39', '2018-04-05 06:12:39', NULL, 786, NULL, NULL),
(23, 786, 23, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2018-04-05 06:12:40', '2018-04-05 09:37:46', '2018-04-05 09:37:46', 786, NULL, NULL),
(24, 786, 24, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:12:40', '2018-04-05 06:12:40', NULL, 786, NULL, NULL),
(25, 786, 25, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 06:12:58', '2018-04-05 07:08:39', '2018-04-05 07:08:39', 786, NULL, NULL),
(26, 786, 26, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:08', '2018-04-05 06:13:08', NULL, 786, NULL, NULL),
(27, 786, 27, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:09', '2018-04-05 06:13:09', NULL, 786, NULL, NULL),
(28, 786, 28, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:09', '2018-04-05 06:13:09', NULL, 786, NULL, NULL),
(29, 786, 29, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:09', '2018-04-05 06:13:09', NULL, 786, NULL, NULL),
(30, 786, 30, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:09', '2018-04-05 06:13:09', NULL, 786, NULL, NULL),
(31, 786, 31, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:09', '2018-04-05 06:13:09', NULL, 786, NULL, NULL),
(32, 786, 32, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:09', '2018-04-05 06:13:09', NULL, 786, NULL, NULL),
(33, 786, 33, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:10', '2018-04-05 06:13:10', NULL, 786, NULL, NULL),
(34, 786, 34, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:13:10', '2018-04-05 06:13:10', NULL, 786, NULL, NULL),
(35, 786, 35, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 06:14:03', '2018-04-05 06:14:49', '2018-04-05 06:14:49', 786, NULL, NULL),
(39, 786, 39, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 0, '2018-04-05 06:16:06', '2018-04-05 06:16:06', NULL, 786, NULL, NULL),
(40, 786, 40, 'hasan Account', NULL, NULL, 500, 5000, 2, NULL, 0, 0, '2018-04-05 06:16:32', '2018-04-05 06:16:32', NULL, 786, NULL, NULL),
(41, 786, 41, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 06:16:32', '2018-04-05 06:16:32', NULL, 786, NULL, NULL),
(42, 786, 42, 'hasan Account', NULL, NULL, 500, 5000, 2, NULL, 0, 0, '2018-04-05 06:32:17', '2018-04-05 06:32:17', NULL, 786, NULL, NULL),
(43, 786, 43, 'hasan Account', NULL, NULL, 500, 5000, 2, NULL, 0, 0, '2018-04-05 06:32:55', '2018-04-05 06:32:55', NULL, 786, NULL, NULL),
(44, 786, 44, 'hasan Account', NULL, NULL, 500, 5000, 2, NULL, 0, 0, '2018-04-05 06:33:42', '2018-04-05 06:33:42', NULL, 786, NULL, NULL),
(45, 786, 64, 'hasan Account', NULL, NULL, 500, 5000, 2, NULL, 0, 1, '2018-04-05 06:39:53', '2018-04-05 07:13:57', '2018-04-05 07:13:57', 786, NULL, NULL),
(46, 786, 65, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 1, '2018-04-05 06:52:50', '2018-04-05 06:53:03', '2018-04-05 06:53:03', 786, NULL, NULL),
(47, 786, 66, 'hasan Account', NULL, NULL, 500, 5000, NULL, NULL, 0, 1, '2018-04-05 08:26:13', '2018-04-05 09:44:52', '2018-04-05 09:44:52', 786, NULL, NULL),
(48, 786, 67, 'E-virtusal Services', NULL, 6, 9999999, 525252, 3, 2, 0, 0, '2018-04-05 08:49:50', '2018-04-05 08:49:50', NULL, 786, NULL, NULL),
(49, 786, 68, 'E-virtusal Services', NULL, 6, 99999999, 5252522, 3, 6, 0, 1, '2018-04-05 08:52:14', '2018-04-05 09:38:57', '2018-04-05 09:38:57', 786, 786, NULL),
(50, 786, 69, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:19', '2018-04-05 09:50:19', NULL, 786, NULL, NULL),
(51, 786, 70, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:20', '2018-04-05 09:50:20', NULL, 786, NULL, NULL),
(52, 786, 71, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:22', '2018-04-05 09:50:22', NULL, 786, NULL, NULL),
(53, 786, 72, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:22', '2018-04-05 09:50:22', NULL, 786, NULL, NULL),
(54, 786, 73, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:22', '2018-04-05 09:50:22', NULL, 786, NULL, NULL),
(55, 786, 74, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:22', '2018-04-05 09:50:22', NULL, 786, NULL, NULL),
(56, 786, 75, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:22', '2018-04-05 09:50:22', NULL, 786, NULL, NULL),
(57, 786, 76, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:23', '2018-04-05 09:50:23', NULL, 786, NULL, NULL),
(58, 786, 77, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:23', '2018-04-05 09:50:23', NULL, 786, NULL, NULL),
(59, 786, 78, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:23', '2018-04-05 09:50:23', NULL, 786, NULL, NULL),
(60, 786, 79, 'Asergis', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, '2018-04-05 09:50:23', '2018-04-05 09:50:23', NULL, 786, NULL, NULL),
(61, 786, 80, 'E-virtusal Services', NULL, 6, 250, 25252, 3, 3, 0, 0, '2018-04-05 12:44:35', '2018-04-05 12:44:35', NULL, 786, NULL, NULL),
(62, 786, 81, 'Asergis Telecom', NULL, 6, 5000, 4545455, 4, 2, 0, 0, '2018-04-05 13:32:48', '2018-04-05 13:32:48', NULL, 786, NULL, NULL),
(67, 786, 86, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:35:32', '2018-04-06 09:35:32', NULL, 786, NULL, NULL),
(68, 786, 87, 'hasan Account', NULL, NULL, 600, NULL, 1, 1, 0, 0, '2018-04-06 09:35:54', '2018-04-06 09:35:54', NULL, 786, NULL, NULL),
(69, 786, 88, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:36:55', '2018-04-06 09:36:55', NULL, 786, NULL, NULL),
(70, 786, 89, 'hasan Account', NULL, NULL, 100, NULL, 1, 1, 0, 0, '2018-04-06 09:37:02', '2018-04-06 09:37:02', NULL, 786, NULL, NULL),
(71, 786, 90, 'hasan Account', NULL, NULL, 5222, NULL, 1, 1, 0, 0, '2018-04-06 09:37:23', '2018-04-06 09:37:23', NULL, 786, NULL, NULL),
(72, 786, 91, 'hasan Account', NULL, NULL, 4500, NULL, 1, 1, 0, 0, '2018-04-06 09:37:33', '2018-04-06 09:37:33', NULL, 786, NULL, NULL),
(73, 786, 92, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:37:38', '2018-04-06 09:37:38', NULL, 786, NULL, NULL),
(74, 786, 93, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:46:28', '2018-04-06 09:46:28', NULL, 786, NULL, NULL),
(75, 786, 94, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:46:39', '2018-04-06 09:46:39', NULL, 786, NULL, NULL),
(76, 786, 95, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:47:53', '2018-04-06 09:47:53', NULL, 786, NULL, NULL),
(77, 786, 96, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:48:46', '2018-04-06 09:48:46', NULL, 786, NULL, NULL),
(78, 786, 97, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:49:27', '2018-04-06 09:49:27', NULL, 786, NULL, NULL),
(79, 786, 98, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:49:40', '2018-04-06 09:49:40', NULL, 786, NULL, NULL),
(80, 786, 99, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:52:26', '2018-04-06 09:52:26', NULL, 786, NULL, NULL),
(81, 786, 100, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:52:49', '2018-04-06 09:52:49', NULL, 786, NULL, NULL),
(82, 786, 101, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:52:55', '2018-04-06 09:52:55', NULL, 786, NULL, NULL),
(83, 786, 102, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:53:00', '2018-04-06 09:53:00', NULL, 786, NULL, NULL),
(84, 786, 103, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:53:06', '2018-04-06 09:53:06', NULL, 786, NULL, NULL),
(85, 786, 104, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:53:37', '2018-04-06 09:53:37', NULL, 786, NULL, NULL),
(86, 786, 105, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:53:41', '2018-04-06 09:53:41', NULL, 786, NULL, NULL),
(87, 786, 106, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:54:09', '2018-04-06 09:54:09', NULL, 786, NULL, NULL),
(88, 786, 107, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:54:21', '2018-04-06 09:54:21', NULL, 786, NULL, NULL),
(89, 786, 108, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:56:17', '2018-04-06 09:56:17', NULL, 786, NULL, NULL),
(90, 786, 109, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:56:35', '2018-04-06 09:56:35', NULL, 786, NULL, NULL),
(91, 786, 110, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:56:35', '2018-04-06 09:56:35', NULL, 786, NULL, NULL),
(92, 786, 111, 'hasan Account', NULL, NULL, NULL, NULL, 1, 1, 0, 0, '2018-04-06 09:56:51', '2018-04-06 09:56:51', NULL, 786, NULL, NULL),
(94, 786, 113, 'Friend', NULL, 5, NULL, NULL, 1, 3, 0, 0, '2018-04-06 10:21:46', '2018-04-06 10:48:28', NULL, 786, 786, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_activity_task`
--

CREATE TABLE `crm_lead_activity_task` (
  `id` int(11) NOT NULL,
  `id_crm_lead` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `due_date` datetime NOT NULL,
  `task_status` enum('Not Started','Deferred','In Progress','Completed','Waiting on Someone Else') DEFAULT NULL,
  `recurrence_type` enum('daily','weekly','monthly','yearly','none') NOT NULL COMMENT '''daily'',''weekly'',''monthly'',''yearly'',''none''',
  `end_date_option` tinyint(1) DEFAULT NULL COMMENT '1 means no end date, 2 means end after n occurence and 3 means end by any date	',
  `end_after_occurence` int(11) DEFAULT NULL COMMENT 'number of occurrence before end ',
  `recurrence_end_date` datetime DEFAULT NULL COMMENT 'recurrence end date',
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_lead_activity_task`
--

INSERT INTO `crm_lead_activity_task` (`id`, `id_crm_lead`, `subject`, `due_date`, `task_status`, `recurrence_type`, `end_date_option`, `end_after_occurence`, `recurrence_end_date`, `description`, `is_deleted`, `created_at`, `updated_at`, `deleted_at`, `created_by`, `updated_by`, `deleted_by`) VALUES
(3, 21, 'Test Daily', '2018-04-03 05:17:09', NULL, 'weekly', NULL, NULL, NULL, NULL, 0, '2018-04-05 13:34:33', '2018-04-05 13:34:33', NULL, 786, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_address`
--

CREATE TABLE `crm_lead_address` (
  `id_crm_lead` int(11) NOT NULL,
  `id_crm_address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_lead_address`
--

INSERT INTO `crm_lead_address` (`id_crm_lead`, `id_crm_address`) VALUES
(8, 1),
(9, 2),
(10, 3),
(11, 4),
(13, 5),
(25, 6),
(35, 7),
(39, 8),
(40, 9),
(42, 10),
(43, 11),
(44, 12),
(45, 13),
(47, 14),
(48, 15),
(49, 16),
(49, 17),
(61, 18),
(62, 19),
(94, 20),
(2, 21),
(1, 22);

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_attachement`
--

CREATE TABLE `crm_lead_attachement` (
  `id` int(11) NOT NULL,
  `id_crm_lead` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_contact_parent`
--

CREATE TABLE `crm_lead_contact_parent` (
  `id` int(11) NOT NULL,
  `salutation` varchar(10) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `secondary_email` varchar(100) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `skype_url` varchar(100) DEFAULT NULL,
  `twitter_url` varchar(100) DEFAULT NULL,
  `linkedin_url` varchar(100) DEFAULT NULL,
  `facebook_url` varchar(100) DEFAULT NULL,
  `description` text,
  `id_crm_lead_source_master` int(11) DEFAULT NULL,
  `is_lead` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_lead_contact_parent`
--

INSERT INTO `crm_lead_contact_parent` (`id`, `salutation`, `first_name`, `last_name`, `title`, `designation`, `phone`, `mobile`, `email`, `secondary_email`, `fax`, `website`, `skype_url`, `twitter_url`, `linkedin_url`, `facebook_url`, `description`, `id_crm_lead_source_master`, `is_lead`) VALUES
(1, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(2, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(3, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(4, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(5, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(6, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(7, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(8, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(9, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(10, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(11, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(12, NULL, 'rezxa', 'raza', NULL, 'dfdfd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'www.facebook.com', NULL, 1, 1),
(13, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(14, NULL, 'Deepika', 'Srivastava', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(15, NULL, 'Aditi', 'Srivastava', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(16, NULL, 'Amita', 'Pandey', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(17, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(18, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(19, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(20, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(21, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(22, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(23, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(24, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(25, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(26, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(27, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(28, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(29, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(30, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(31, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(32, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(33, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(34, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(35, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(36, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(37, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(38, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(39, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(40, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(41, NULL, 'Abc', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(42, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(43, NULL, 'rezxa', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(44, NULL, 'hello', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(45, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(46, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(47, NULL, 'Arjun', 'Singh Rathor', 'Test Title', 'SSP', '7845125478', '7845125478', 'test@gmail.com', 'yahoo@yahoo.com', NULL, 'www.testsitye.com', NULL, NULL, NULL, NULL, NULL, 1, 1),
(48, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(49, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(50, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(51, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(52, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(53, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(54, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(55, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(56, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(57, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(58, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(59, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(60, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(61, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(62, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(63, NULL, 'Arjun', 'Singh Rathor', NULL, 'SSP', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(64, NULL, 'hello', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(65, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(66, NULL, 'hello', 'raza', NULL, 'Tester', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1),
(67, NULL, 'kaushal', 'solanki', 'Mr', 'React Developer', '9911136424', '8057145263', 'kaushal.solanki@asergis.in', 'fdgfh@gmail.com', '0215-525-6352', 'https://www.solanki.com', 'www.skeyeURl.com', 'www.twitterURL.com', 'www.Linkdin.comdddd', 'fdf', 'iio;io;', 2, 1),
(68, NULL, 'Ram ', 'Laxman', 'Mr', 'React Developer', '9911136424', '88888888888', 'kaushal.solanki@asergis.in', 'dwdw@gmail.com', '2222222222', 'https://www.solanki.com', 'www.skeyeURl.com', 'www.twitterURL.com', 'www.Linkdin.comdddd', 'fdf', 'wqwqwqw', 3, 1),
(69, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(70, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(71, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(72, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(73, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(74, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(75, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(76, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(77, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(78, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(79, NULL, 'Deepika', 'xyz', NULL, NULL, '989898989898', NULL, 'deepika.srivastav@asergis.in', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(80, NULL, 'Ashwani ', 'Kumar', 'Mrs', 'React Developer Advanced', '11111111111111', '22222222222222222', 'kaushal.solanki@asergis.in', 'dddd@gmail.com', '333333333333333333333', 'https://www.solanki.com', 'www.skeyeURl.com', 'www.twitterURL.com', 'www.Linkdin.comdddd', 'fdf', 'dgdfgd', 3, 1),
(81, NULL, 'Ashwani', 'Kumar', 'Mr', 'UI Developer', '9891757272', '9891667272', 'akumar757272@gmail.com', 'svsdv@svsd.cvss', '9891667272', 'http://www.ashwaniweb.in', 'ashwaniweb', 'ashwaniweb', 'ashwaniweb', 'ashwaniweb', 'Build responsive, mobile-first projects on the web with the world\'s most popular front-end component library.\n\nBootstrap is an open source toolkit for developing with HTML, CSS, and JS. Quickly prototype your ideas or build your entire app with our Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful plugins built on jQuery.\n\n', 3, 1),
(82, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(83, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(84, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(85, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(86, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(87, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(88, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(89, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(90, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(91, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(92, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(93, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(94, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(95, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(96, NULL, 'rezxa', 'raza', 'fgfhfghgh', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(97, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(98, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(99, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(100, NULL, 'rezxa', 'raza', NULL, '5656', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(101, NULL, 'rezxa', 'raza', NULL, '6567', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(102, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(103, NULL, 'rezxa', 'raza', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(104, NULL, 'rezxa', 'raza', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(105, NULL, 'rezxa', 'raza', NULL, '45454', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(106, NULL, 'rezxa', 'raza', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(107, NULL, 'rezxa', 'raza', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(108, NULL, 'rezxa', 'raza', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(109, NULL, 'rezxa', 'raza', NULL, '5655', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(110, NULL, 'rezxa', 'raza', NULL, '5655', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(111, NULL, 'rezxa', 'raza', NULL, '', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(112, NULL, 'Ankit', 'Gupta', '', '', '965201', '965000', 'a@a.com', 'a@a.comq', '', '', '', '', '', '', '', 5, 1),
(113, NULL, 'Ankit', 'Gupta1', NULL, NULL, '654123', NULL, 'a@a.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 1),
(114, NULL, 'Ghert', 'jhgfd', NULL, NULL, '562413', NULL, 'as@a.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 1),
(115, NULL, 'lokpal', 'singh', NULL, NULL, '456123', NULL, 'a@a.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 1),
(116, NULL, 'kaushal', 'solanki', 'developer', 'React Developer', '9911136424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(117, NULL, 'kaushal', 'solanki', 'developer', 'React Developer', '9911136424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(118, NULL, 'kaushal', 'solanki', 'developer', 'React Developer', '9911136424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(119, NULL, 'kaushal', 'solanki', 'developer', 'React Developer', '9911136424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(120, NULL, 'kaushal', 'solanki', 'developer', 'React Developer', '9911136424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(121, NULL, 'kaushal', 'solanki', 'developer', 'React Developer', '9911136424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(122, NULL, 'kaushal', 'solanki', 'developer', 'React Developer', '9911136424', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(123, NULL, 'ak', 'ks', 'developer', 'react developer', '5555555', '9999999999', 'ag@gmail.com', 'gg@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(124, NULL, 'ak', 'ks', 'developer', 'react developer', '5555555', '9999999999', 'ag@gmail.com', 'gg@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1),
(125, NULL, 'ak', 'ks', 'developer', 'react developer', '5555555', '9999999999', 'ag@gmail.com', 'gg@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_note`
--

CREATE TABLE `crm_lead_note` (
  `id` int(11) NOT NULL,
  `id_crm_lead` int(11) NOT NULL,
  `note_title` varchar(255) DEFAULT NULL,
  `note_description` text NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_note_attachement`
--

CREATE TABLE `crm_lead_note_attachement` (
  `id` int(11) NOT NULL,
  `id_crm_lead_note` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_recurrence_daily`
--

CREATE TABLE `crm_lead_recurrence_daily` (
  `id` int(11) NOT NULL,
  `id_crm_lead_activity_task` int(11) NOT NULL,
  `daily_option` enum('daily','weekday') DEFAULT 'daily',
  `daily_day_no` int(11) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_recurrence_monthly`
--

CREATE TABLE `crm_lead_recurrence_monthly` (
  `id` int(11) NOT NULL,
  `id_crm_lead_activity_task` int(11) NOT NULL,
  `monthly_option` enum('day','weekly') DEFAULT 'day',
  `monthly_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_week` varchar(25) DEFAULT NULL,
  `monthly_day_of_week` varchar(25) DEFAULT NULL,
  `monthly_of_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_recurrence_weekly`
--

CREATE TABLE `crm_lead_recurrence_weekly` (
  `id` int(11) NOT NULL,
  `id_crm_lead_activity_task` int(11) NOT NULL,
  `recur_every_week` int(11) NOT NULL DEFAULT '0',
  `weekly_monday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_tuesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_wednesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_thursday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_friday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_saturday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_sunday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_lead_recurrence_weekly`
--

INSERT INTO `crm_lead_recurrence_weekly` (`id`, `id_crm_lead_activity_task`, `recur_every_week`, `weekly_monday`, `weekly_tuesday`, `weekly_wednesday`, `weekly_thursday`, `weekly_friday`, `weekly_saturday`, `weekly_sunday`, `is_deleted`, `deleted_at`) VALUES
(1, 3, 2, 1, 1, 0, 1, 1, 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_recurrence_yearly`
--

CREATE TABLE `crm_lead_recurrence_yearly` (
  `id` int(11) NOT NULL,
  `id_crm_lead_activity_task` int(11) NOT NULL,
  `recur_every_year` tinyint(4) UNSIGNED DEFAULT NULL COMMENT '1 means yes and 0 means no',
  `yearly_option` enum('monthly','weekly') DEFAULT 'monthly',
  `yearly_on_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `yearly_on_month_day` tinyint(4) UNSIGNED DEFAULT NULL,
  `yearly_week` enum('first','second','third','fourth','last') DEFAULT 'first',
  `yearly_day_of_week` enum('day','weekday','weekend day','sunday','monday','tuesday','wednesday','thursday','friday','saturday') DEFAULT 'monday',
  `yearly_of_every_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '1 means deleted and 0 means undeleted',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_source_master`
--

CREATE TABLE `crm_lead_source_master` (
  `id` int(11) NOT NULL,
  `source` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_lead_source_master`
--

INSERT INTO `crm_lead_source_master` (`id`, `source`, `weight`) VALUES
(1, 'Advertisement', 0),
(2, 'Social', 0),
(3, 'Employee Referral', 0),
(5, 'Trade Show', 0),
(6, 'Web', 0),
(9, 'None', 0),
(11, 'External Referral', 0),
(12, 'Online Store', 0),
(13, 'Public Relations', 0),
(14, 'Sales Email Alias', 0),
(15, 'Seminar Partner', 0),
(16, 'Internal Seminar', 0),
(17, 'Web Download', 0),
(19, 'Web Research', 0),
(20, 'Chat', 0),
(21, 'Partner', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_lead_status_master`
--

CREATE TABLE `crm_lead_status_master` (
  `id` int(11) NOT NULL,
  `status` varchar(40) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_lead_status_master`
--

INSERT INTO `crm_lead_status_master` (`id`, `status`, `weight`) VALUES
(1, 'None', 0),
(2, 'New', 0),
(4, 'Working', 0),
(5, 'Qualified', 0),
(6, 'Unqualified', 0),
(9, 'Attempted to Contact', 0),
(10, 'Contact in Future', 0),
(11, 'Contacted', 0),
(12, 'Junk Lead', 0),
(13, 'Not Contacted', 0),
(14, 'Lost Lead', 0),
(15, 'Pre-Qualified', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_pipeline`
--

CREATE TABLE `crm_pipeline` (
  `id` tinyint(2) NOT NULL,
  `pipeline_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_pipeline`
--

INSERT INTO `crm_pipeline` (`id`, `pipeline_name`, `is_active`) VALUES
(1, 'Sales Pipeline', 1);

-- --------------------------------------------------------

--
-- Table structure for table `crm_pipeline_stage`
--

CREATE TABLE `crm_pipeline_stage` (
  `id` tinyint(3) NOT NULL,
  `id_crm_pipeline` tinyint(2) DEFAULT NULL,
  `stage_name` varchar(40) NOT NULL,
  `win_probabality` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_pipeline_stage`
--

INSERT INTO `crm_pipeline_stage` (`id`, `id_crm_pipeline`, `stage_name`, `win_probabality`, `weight`) VALUES
(1, 1, 'None', '0', 0),
(2, 1, 'Introduction', '10', 0),
(3, 1, 'Opportunity', '20', 0),
(6, 1, 'Proposal/Price Quote', '50', 0),
(7, 1, 'Negotiation/Review', '60', 0),
(8, 1, 'Closed Won', '100', 0),
(9, 1, 'Closed Lost', '0 ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_rating_master`
--

CREATE TABLE `crm_rating_master` (
  `id` int(11) NOT NULL,
  `rating` varchar(100) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `crm_rating_master`
--

INSERT INTO `crm_rating_master` (`id`, `rating`, `weight`) VALUES
(5, 'Warm', 0),
(6, 'Hot', 0),
(7, 'Cold', 0);

-- --------------------------------------------------------

--
-- Table structure for table `crm_recurrence_daily_detail`
--

CREATE TABLE `crm_recurrence_daily_detail` (
  `id` int(11) NOT NULL,
  `id_crm_activities_task` int(11) NOT NULL,
  `daily_option` enum('daily','weekday') DEFAULT 'daily',
  `daily_day_no` int(11) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_recurrence_monthly_detail`
--

CREATE TABLE `crm_recurrence_monthly_detail` (
  `id` int(11) NOT NULL,
  `id_crm_activities_task` int(11) NOT NULL,
  `monthly_option` enum('day','weekly') DEFAULT 'day',
  `monthly_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_week` varchar(25) DEFAULT NULL,
  `monthly_day_of_week` varchar(25) DEFAULT NULL,
  `monthly_of_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_recurrence_weekly_detail`
--

CREATE TABLE `crm_recurrence_weekly_detail` (
  `id` int(11) NOT NULL,
  `id_crm_activities_task` int(11) NOT NULL,
  `recur_every_week` int(11) NOT NULL DEFAULT '0',
  `weekly_monday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_tuesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_wednesday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_thursday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_friday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_saturday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `weekly_sunday` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means yes and 0 means no',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `crm_recurrence_yearly_detail`
--

CREATE TABLE `crm_recurrence_yearly_detail` (
  `id` int(11) NOT NULL,
  `id_crm_activities_task` int(11) NOT NULL,
  `recur_every_year` tinyint(4) UNSIGNED DEFAULT NULL COMMENT '1 means yes and 0 means no',
  `yearly_option` enum('monthly','weekly') DEFAULT 'monthly',
  `yearly_on_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `yearly_on_month_day` tinyint(4) UNSIGNED DEFAULT NULL,
  `yearly_week` enum('first','second','third','fourth','last') DEFAULT 'first',
  `yearly_day_of_week` enum('day','weekday','weekend day','sunday','monday','tuesday','wednesday','thursday','friday','saturday') DEFAULT 'monday',
  `yearly_of_every_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `is_deleted` tinyint(1) DEFAULT NULL COMMENT '1 means deleted and 0 means undeleted',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `name`, `run_on`) VALUES
(1, '/20180327084248-db-crm', '2018-04-05 10:53:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crm_address`
--
ALTER TABLE `crm_address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_campaign`
--
ALTER TABLE `crm_campaign`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_campaign_1_idx` (`id_crm_campaign_type_master`);

--
-- Indexes for table `crm_campaign_link`
--
ALTER TABLE `crm_campaign_link`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_campaign_link_1_idx` (`id_crm_campaign`),
  ADD KEY `fk_crm_campaign_link_2_idx` (`module_id`);

--
-- Indexes for table `crm_campaign_type_master`
--
ALTER TABLE `crm_campaign_type_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_company`
--
ALTER TABLE `crm_company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_2_idx` (`id_crm_company_type_master`),
  ADD KEY `fk_crm_company_3_idx` (`id_crm_company_ownership_master`),
  ADD KEY `fk_crm_company_4_idx` (`id_crm_industry_master`),
  ADD KEY `fk_crm_company_1_idx` (`id_crm_company_status_master`);

--
-- Indexes for table `crm_company_activity_task`
--
ALTER TABLE `crm_company_activity_task`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_crm_company_activity_task_1_idx` (`id_crm_company`);

--
-- Indexes for table `crm_company_address`
--
ALTER TABLE `crm_company_address`
  ADD KEY `fk_crm_company_address_1_idx` (`id_crm_company`),
  ADD KEY `fk_crm_company_address_2_idx` (`id_crm_address`);

--
-- Indexes for table `crm_company_attachement`
--
ALTER TABLE `crm_company_attachement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_crm_company` (`id_crm_company`);

--
-- Indexes for table `crm_company_note`
--
ALTER TABLE `crm_company_note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_note_1_idx` (`id_crm_company`);

--
-- Indexes for table `crm_company_note_attachement`
--
ALTER TABLE `crm_company_note_attachement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_note_attachement_1_idx` (`id_crm_company_note`);

--
-- Indexes for table `crm_company_ownership_master`
--
ALTER TABLE `crm_company_ownership_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_company_recurrence_daily`
--
ALTER TABLE `crm_company_recurrence_daily`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_recurrence_daily_1_idx` (`id_crm_company_activity_task`);

--
-- Indexes for table `crm_company_recurrence_monthly`
--
ALTER TABLE `crm_company_recurrence_monthly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_recurrence_monthly_1_idx` (`id_crm_company_activity_task`);

--
-- Indexes for table `crm_company_recurrence_weekly`
--
ALTER TABLE `crm_company_recurrence_weekly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_recurrence_weekly_1_idx` (`id_crm_company_activity_task`);

--
-- Indexes for table `crm_company_recurrence_yearly`
--
ALTER TABLE `crm_company_recurrence_yearly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_recurrence_yearly_1_idx` (`id_crm_company_activity_task`);

--
-- Indexes for table `crm_company_status_master`
--
ALTER TABLE `crm_company_status_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_company_type_master`
--
ALTER TABLE `crm_company_type_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_contact`
--
ALTER TABLE `crm_contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_1_idx` (`id_crm_company`),
  ADD KEY `fk_crm_contact_2_idx` (`id_crm_lead_contact_parent`),
  ADD KEY `fk_crm_contact_7_idx` (`assistant_parent_id`),
  ADD KEY `fk_crm_contact_8_idx` (`reports_to_parent_id`),
  ADD KEY `fk_crm_contact_9_idx` (`id_crm_pipeline_stage`);

--
-- Indexes for table `crm_contact_activity_task`
--
ALTER TABLE `crm_contact_activity_task`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_crm_contact_activity_task_1_idx` (`id_crm_contact`);

--
-- Indexes for table `crm_contact_address`
--
ALTER TABLE `crm_contact_address`
  ADD KEY `fk_crm_contact_address_1_idx` (`id_crm_contact`),
  ADD KEY `fk_crm_contact_address_2_idx` (`id_crm_address`);

--
-- Indexes for table `crm_contact_attachement`
--
ALTER TABLE `crm_contact_attachement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_crm_contact` (`id_crm_contact`);

--
-- Indexes for table `crm_contact_note`
--
ALTER TABLE `crm_contact_note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_note_1_idx` (`id_crm_contact`);

--
-- Indexes for table `crm_contact_note_attachement`
--
ALTER TABLE `crm_contact_note_attachement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_note_attachement_1_idx` (`id_crm_contact_note`);

--
-- Indexes for table `crm_contact_recurrence_daily`
--
ALTER TABLE `crm_contact_recurrence_daily`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_recurrence_daily_1_idx` (`id_crm_contact_activity_task`);

--
-- Indexes for table `crm_contact_recurrence_monthly`
--
ALTER TABLE `crm_contact_recurrence_monthly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_recurrence_monthly_1_idx` (`id_crm_contact_activity_task`);

--
-- Indexes for table `crm_contact_recurrence_weekly`
--
ALTER TABLE `crm_contact_recurrence_weekly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_recurrence_weekly_1_idx` (`id_crm_contact_activity_task`);

--
-- Indexes for table `crm_contact_recurrence_yearly`
--
ALTER TABLE `crm_contact_recurrence_yearly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_recurrence_yearly_1_idx` (`id_crm_contact_activity_task`);

--
-- Indexes for table `crm_deal`
--
ALTER TABLE `crm_deal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_deal_1_idx` (`id_crm_contact`),
  ADD KEY `fk_crm_deal_2_idx` (`id_crm_company`),
  ADD KEY `fk_crm_deal_3_idx` (`id_crm_campaign`),
  ADD KEY `fk_crm_deal_4_idx` (`id_crm_pipeline_stage`),
  ADD KEY `fk_crm_deal_5_idx` (`id_crm_lead_source_master`);

--
-- Indexes for table `crm_deal_pipeline_history`
--
ALTER TABLE `crm_deal_pipeline_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_deal_pipeline_history_1_idx` (`id_crm_pipeline_stage`),
  ADD KEY `fk_crm_deal_pipeline_history_2_idx` (`id_crm_deal`);

--
-- Indexes for table `crm_industry_master`
--
ALTER TABLE `crm_industry_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_lead`
--
ALTER TABLE `crm_lead`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_1_idx` (`id_crm_lead_status_master`),
  ADD KEY `fk_crm_lead_4_idx` (`id_crm_industry_master`),
  ADD KEY `fk_crm_lead_3_idx` (`id_crm_rating_master`),
  ADD KEY `fk_crm_lead_2_idx` (`id_crm_lead_contact_parent`),
  ADD KEY `fk_crm_lead_9_idx` (`id_crm_pipeline_stage`);

--
-- Indexes for table `crm_lead_activity_task`
--
ALTER TABLE `crm_lead_activity_task`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_crm_lead_activity_task_1_idx` (`id_crm_lead`);

--
-- Indexes for table `crm_lead_address`
--
ALTER TABLE `crm_lead_address`
  ADD KEY `fk_crm_lead_address_1_idx` (`id_crm_address`),
  ADD KEY `fk_crm_lead_address_2_idx` (`id_crm_lead`);

--
-- Indexes for table `crm_lead_attachement`
--
ALTER TABLE `crm_lead_attachement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_crm_lead` (`id_crm_lead`);

--
-- Indexes for table `crm_lead_contact_parent`
--
ALTER TABLE `crm_lead_contact_parent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_contact_parent_1_idx` (`id_crm_lead_source_master`);

--
-- Indexes for table `crm_lead_note`
--
ALTER TABLE `crm_lead_note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_note_1_idx` (`id_crm_lead`);

--
-- Indexes for table `crm_lead_note_attachement`
--
ALTER TABLE `crm_lead_note_attachement`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_crm_lead_note` (`id_crm_lead_note`,`minio_file_id`),
  ADD KEY `fk_crm_lead_note_attachement_1_idx` (`id_crm_lead_note`);

--
-- Indexes for table `crm_lead_recurrence_daily`
--
ALTER TABLE `crm_lead_recurrence_daily`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_recurrence_daily_1_idx` (`id_crm_lead_activity_task`);

--
-- Indexes for table `crm_lead_recurrence_monthly`
--
ALTER TABLE `crm_lead_recurrence_monthly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_recurrence_monthly_1_idx` (`id_crm_lead_activity_task`);

--
-- Indexes for table `crm_lead_recurrence_weekly`
--
ALTER TABLE `crm_lead_recurrence_weekly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_recurrence_weekly_1_idx` (`id_crm_lead_activity_task`);

--
-- Indexes for table `crm_lead_recurrence_yearly`
--
ALTER TABLE `crm_lead_recurrence_yearly`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_recurrence_yearly_1_idx` (`id_crm_lead_activity_task`);

--
-- Indexes for table `crm_lead_source_master`
--
ALTER TABLE `crm_lead_source_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_lead_status_master`
--
ALTER TABLE `crm_lead_status_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_pipeline`
--
ALTER TABLE `crm_pipeline`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_pipeline_stage`
--
ALTER TABLE `crm_pipeline_stage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_pipeline_stage_1` (`id_crm_pipeline`);

--
-- Indexes for table `crm_rating_master`
--
ALTER TABLE `crm_rating_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_recurrence_daily_detail`
--
ALTER TABLE `crm_recurrence_daily_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `crm_recurrence_monthly_detail`
--
ALTER TABLE `crm_recurrence_monthly_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_crm_activities_task` (`id_crm_activities_task`);

--
-- Indexes for table `crm_recurrence_weekly_detail`
--
ALTER TABLE `crm_recurrence_weekly_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `crm_activities_task_recurrence_weekly_detail_ibfk_1` (`id_crm_activities_task`);

--
-- Indexes for table `crm_recurrence_yearly_detail`
--
ALTER TABLE `crm_recurrence_yearly_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_crm_activities_task` (`id_crm_activities_task`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crm_address`
--
ALTER TABLE `crm_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `crm_campaign`
--
ALTER TABLE `crm_campaign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `crm_campaign_link`
--
ALTER TABLE `crm_campaign_link`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `crm_campaign_type_master`
--
ALTER TABLE `crm_campaign_type_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `crm_company`
--
ALTER TABLE `crm_company`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `crm_company_activity_task`
--
ALTER TABLE `crm_company_activity_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_attachement`
--
ALTER TABLE `crm_company_attachement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_note`
--
ALTER TABLE `crm_company_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_note_attachement`
--
ALTER TABLE `crm_company_note_attachement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_recurrence_daily`
--
ALTER TABLE `crm_company_recurrence_daily`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_recurrence_monthly`
--
ALTER TABLE `crm_company_recurrence_monthly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_recurrence_weekly`
--
ALTER TABLE `crm_company_recurrence_weekly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_recurrence_yearly`
--
ALTER TABLE `crm_company_recurrence_yearly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_company_status_master`
--
ALTER TABLE `crm_company_status_master`
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `crm_company_type_master`
--
ALTER TABLE `crm_company_type_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `crm_contact`
--
ALTER TABLE `crm_contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `crm_contact_activity_task`
--
ALTER TABLE `crm_contact_activity_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_contact_attachement`
--
ALTER TABLE `crm_contact_attachement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_contact_note`
--
ALTER TABLE `crm_contact_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_contact_note_attachement`
--
ALTER TABLE `crm_contact_note_attachement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_contact_recurrence_daily`
--
ALTER TABLE `crm_contact_recurrence_daily`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_contact_recurrence_monthly`
--
ALTER TABLE `crm_contact_recurrence_monthly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_contact_recurrence_weekly`
--
ALTER TABLE `crm_contact_recurrence_weekly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_contact_recurrence_yearly`
--
ALTER TABLE `crm_contact_recurrence_yearly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_deal`
--
ALTER TABLE `crm_deal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `crm_deal_pipeline_history`
--
ALTER TABLE `crm_deal_pipeline_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_industry_master`
--
ALTER TABLE `crm_industry_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `crm_lead`
--
ALTER TABLE `crm_lead`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;
--
-- AUTO_INCREMENT for table `crm_lead_activity_task`
--
ALTER TABLE `crm_lead_activity_task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `crm_lead_attachement`
--
ALTER TABLE `crm_lead_attachement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_lead_contact_parent`
--
ALTER TABLE `crm_lead_contact_parent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;
--
-- AUTO_INCREMENT for table `crm_lead_note`
--
ALTER TABLE `crm_lead_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_lead_note_attachement`
--
ALTER TABLE `crm_lead_note_attachement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_lead_recurrence_daily`
--
ALTER TABLE `crm_lead_recurrence_daily`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_lead_recurrence_monthly`
--
ALTER TABLE `crm_lead_recurrence_monthly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_lead_recurrence_weekly`
--
ALTER TABLE `crm_lead_recurrence_weekly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `crm_lead_recurrence_yearly`
--
ALTER TABLE `crm_lead_recurrence_yearly`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_lead_source_master`
--
ALTER TABLE `crm_lead_source_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `crm_lead_status_master`
--
ALTER TABLE `crm_lead_status_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `crm_pipeline`
--
ALTER TABLE `crm_pipeline`
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `crm_pipeline_stage`
--
ALTER TABLE `crm_pipeline_stage`
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `crm_rating_master`
--
ALTER TABLE `crm_rating_master`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `crm_recurrence_daily_detail`
--
ALTER TABLE `crm_recurrence_daily_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_recurrence_monthly_detail`
--
ALTER TABLE `crm_recurrence_monthly_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_recurrence_weekly_detail`
--
ALTER TABLE `crm_recurrence_weekly_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `crm_recurrence_yearly_detail`
--
ALTER TABLE `crm_recurrence_yearly_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `crm_campaign`
--
ALTER TABLE `crm_campaign`
  ADD CONSTRAINT `fk_crm_campaign_1` FOREIGN KEY (`id_crm_campaign_type_master`) REFERENCES `crm_campaign_type_master` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `crm_campaign_link`
--
ALTER TABLE `crm_campaign_link`
  ADD CONSTRAINT `fk_crm_campaign_link_1` FOREIGN KEY (`id_crm_campaign`) REFERENCES `crm_campaign` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_campaign_link_2` FOREIGN KEY (`module_id`) REFERENCES `crm_lead` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_campaign_link_3` FOREIGN KEY (`module_id`) REFERENCES `crm_deal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_company`
--
ALTER TABLE `crm_company`
  ADD CONSTRAINT `fk_crm_company_1` FOREIGN KEY (`id_crm_company_status_master`) REFERENCES `crm_company_status_master` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_company_2` FOREIGN KEY (`id_crm_company_type_master`) REFERENCES `crm_company_type_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_company_3` FOREIGN KEY (`id_crm_company_ownership_master`) REFERENCES `crm_company_ownership_master` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_company_4` FOREIGN KEY (`id_crm_industry_master`) REFERENCES `crm_industry_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_company_activity_task`
--
ALTER TABLE `crm_company_activity_task`
  ADD CONSTRAINT `fk_crm_company_activity_task_1` FOREIGN KEY (`id_crm_company`) REFERENCES `crm_company` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_company_address`
--
ALTER TABLE `crm_company_address`
  ADD CONSTRAINT `fk_crm_company_address_1` FOREIGN KEY (`id_crm_company`) REFERENCES `crm_company` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_company_address_2` FOREIGN KEY (`id_crm_address`) REFERENCES `crm_address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_company_attachement`
--
ALTER TABLE `crm_company_attachement`
  ADD CONSTRAINT `fk_crm_company_attachement_1` FOREIGN KEY (`id_crm_company`) REFERENCES `crm_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_company_note`
--
ALTER TABLE `crm_company_note`
  ADD CONSTRAINT `fk_crm_company_note_1` FOREIGN KEY (`id_crm_company`) REFERENCES `crm_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_company_note_attachement`
--
ALTER TABLE `crm_company_note_attachement`
  ADD CONSTRAINT `fk_crm_company_note_attachement_1` FOREIGN KEY (`id_crm_company_note`) REFERENCES `crm_company_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_company_recurrence_daily`
--
ALTER TABLE `crm_company_recurrence_daily`
  ADD CONSTRAINT `fk_crm_company_recurrence_daily_1` FOREIGN KEY (`id_crm_company_activity_task`) REFERENCES `crm_company_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_company_recurrence_monthly`
--
ALTER TABLE `crm_company_recurrence_monthly`
  ADD CONSTRAINT `fk_crm_company_recurrence_monthly_1` FOREIGN KEY (`id_crm_company_activity_task`) REFERENCES `crm_company_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_company_recurrence_weekly`
--
ALTER TABLE `crm_company_recurrence_weekly`
  ADD CONSTRAINT `fk_crm_company_recurrence_weekly_1` FOREIGN KEY (`id_crm_company_activity_task`) REFERENCES `crm_company_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_company_recurrence_yearly`
--
ALTER TABLE `crm_company_recurrence_yearly`
  ADD CONSTRAINT `fk_crm_company_recurrence_yearly_1` FOREIGN KEY (`id_crm_company_activity_task`) REFERENCES `crm_company_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_contact`
--
ALTER TABLE `crm_contact`
  ADD CONSTRAINT `fk_crm_contact_1` FOREIGN KEY (`id_crm_lead_contact_parent`) REFERENCES `crm_lead_contact_parent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_2` FOREIGN KEY (`id_crm_company`) REFERENCES `crm_company` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_3` FOREIGN KEY (`assistant_parent_id`) REFERENCES `crm_contact` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_4` FOREIGN KEY (`reports_to_parent_id`) REFERENCES `crm_contact` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_5` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES `crm_pipeline_stage` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_contact_activity_task`
--
ALTER TABLE `crm_contact_activity_task`
  ADD CONSTRAINT `fk_crm_contact_activity_task_1` FOREIGN KEY (`id_crm_contact`) REFERENCES `crm_contact` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_contact_address`
--
ALTER TABLE `crm_contact_address`
  ADD CONSTRAINT `fk_crm_contact_address_1` FOREIGN KEY (`id_crm_contact`) REFERENCES `crm_contact` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_address_2` FOREIGN KEY (`id_crm_address`) REFERENCES `crm_address` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_contact_attachement`
--
ALTER TABLE `crm_contact_attachement`
  ADD CONSTRAINT `fk_crm_contact_attachement_1` FOREIGN KEY (`id_crm_contact`) REFERENCES `crm_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_contact_note`
--
ALTER TABLE `crm_contact_note`
  ADD CONSTRAINT `fk_crm_contact_note_1` FOREIGN KEY (`id_crm_contact`) REFERENCES `crm_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_contact_note_attachement`
--
ALTER TABLE `crm_contact_note_attachement`
  ADD CONSTRAINT `fk_crm_contact_note_attachement_1` FOREIGN KEY (`id_crm_contact_note`) REFERENCES `crm_contact_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_contact_recurrence_daily`
--
ALTER TABLE `crm_contact_recurrence_daily`
  ADD CONSTRAINT `fk_crm_contact_recurrence_daily_1` FOREIGN KEY (`id_crm_contact_activity_task`) REFERENCES `crm_contact_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_contact_recurrence_monthly`
--
ALTER TABLE `crm_contact_recurrence_monthly`
  ADD CONSTRAINT `fk_crm_contact_recurrence_monthly_1` FOREIGN KEY (`id_crm_contact_activity_task`) REFERENCES `crm_contact_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_contact_recurrence_weekly`
--
ALTER TABLE `crm_contact_recurrence_weekly`
  ADD CONSTRAINT `fk_crm_contact_recurrence_weekly_1` FOREIGN KEY (`id_crm_contact_activity_task`) REFERENCES `crm_contact_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_contact_recurrence_yearly`
--
ALTER TABLE `crm_contact_recurrence_yearly`
  ADD CONSTRAINT `fk_crm_contact_recurrence_yearly_1` FOREIGN KEY (`id_crm_contact_activity_task`) REFERENCES `crm_contact_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_deal`
--
ALTER TABLE `crm_deal`
  ADD CONSTRAINT `fk_crm_deal_1` FOREIGN KEY (`id_crm_contact`) REFERENCES `crm_contact` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_2` FOREIGN KEY (`id_crm_company`) REFERENCES `crm_company` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_3` FOREIGN KEY (`id_crm_campaign`) REFERENCES `crm_campaign` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_4` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES `crm_pipeline_stage` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_5` FOREIGN KEY (`id_crm_lead_source_master`) REFERENCES `crm_lead_source_master` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `crm_deal_pipeline_history`
--
ALTER TABLE `crm_deal_pipeline_history`
  ADD CONSTRAINT `fk_crm_deal_pipeline_history_1` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES `crm_pipeline_stage` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_pipeline_history_2` FOREIGN KEY (`id_crm_deal`) REFERENCES `crm_deal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead`
--
ALTER TABLE `crm_lead`
  ADD CONSTRAINT `fk_crm_lead_1` FOREIGN KEY (`id_crm_lead_contact_parent`) REFERENCES `crm_lead_contact_parent` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_2` FOREIGN KEY (`id_crm_lead_status_master`) REFERENCES `crm_lead_status_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_3` FOREIGN KEY (`id_crm_rating_master`) REFERENCES `crm_rating_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_4` FOREIGN KEY (`id_crm_industry_master`) REFERENCES `crm_industry_master` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_5` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES `crm_pipeline_stage` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_lead_activity_task`
--
ALTER TABLE `crm_lead_activity_task`
  ADD CONSTRAINT `fk_crm_lead_activity_task_1` FOREIGN KEY (`id_crm_lead`) REFERENCES `crm_lead` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `crm_lead_address`
--
ALTER TABLE `crm_lead_address`
  ADD CONSTRAINT `fk_crm_lead_address_1` FOREIGN KEY (`id_crm_address`) REFERENCES `crm_address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_lead_address_2` FOREIGN KEY (`id_crm_lead`) REFERENCES `crm_lead` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead_attachement`
--
ALTER TABLE `crm_lead_attachement`
  ADD CONSTRAINT `fk_crm_lead_attachement_1` FOREIGN KEY (`id_crm_lead`) REFERENCES `crm_lead` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead_note`
--
ALTER TABLE `crm_lead_note`
  ADD CONSTRAINT `fk_crm_lead_note_1` FOREIGN KEY (`id_crm_lead`) REFERENCES `crm_lead` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead_note_attachement`
--
ALTER TABLE `crm_lead_note_attachement`
  ADD CONSTRAINT `fk_crm_lead_note_attachement_1` FOREIGN KEY (`id_crm_lead_note`) REFERENCES `crm_lead_note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead_recurrence_daily`
--
ALTER TABLE `crm_lead_recurrence_daily`
  ADD CONSTRAINT `fk_crm_lead_recurrence_daily_1` FOREIGN KEY (`id_crm_lead_activity_task`) REFERENCES `crm_lead_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead_recurrence_monthly`
--
ALTER TABLE `crm_lead_recurrence_monthly`
  ADD CONSTRAINT `fk_crm_lead_recurrence_monthly_1` FOREIGN KEY (`id_crm_lead_activity_task`) REFERENCES `crm_lead_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead_recurrence_weekly`
--
ALTER TABLE `crm_lead_recurrence_weekly`
  ADD CONSTRAINT `fk_crm_lead_recurrence_weekly_1` FOREIGN KEY (`id_crm_lead_activity_task`) REFERENCES `crm_lead_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_lead_recurrence_yearly`
--
ALTER TABLE `crm_lead_recurrence_yearly`
  ADD CONSTRAINT `fk_crm_lead_recurrence_yearly_1` FOREIGN KEY (`id_crm_lead_activity_task`) REFERENCES `crm_lead_activity_task` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `crm_pipeline_stage`
--
ALTER TABLE `crm_pipeline_stage`
  ADD CONSTRAINT `fk_crm_pipeline_stage_1` FOREIGN KEY (`id_crm_pipeline`) REFERENCES `crm_pipeline` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
