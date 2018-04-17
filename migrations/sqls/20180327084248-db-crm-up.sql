SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

DROP TABLE IF EXISTS crm_activity_call;
CREATE TABLE crm_activity_call (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `call_type` enum('inbound','outbound') DEFAULT NULL,
  `call_details` enum('current','completed','schedule') NOT NULL,
  `call_start_time` datetime DEFAULT NULL,
  `call_duration` int(11) DEFAULT NULL COMMENT 'call duration in second',
  `result` text,
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_activity_call_link;
CREATE TABLE crm_activity_call_link (
  `id` int(11) NOT NULL,
  `id_crm_activity_call` int(11) NOT NULL,
  `model_name` enum('Lead','Contact','Company','Deal','Campaign') NOT NULL,
  `model_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_activity_event;
CREATE TABLE crm_activity_event (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `event_start_time` datetime NOT NULL,
  `event_end_time` datetime DEFAULT NULL,
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_activity_event_link;
CREATE TABLE crm_activity_event_link (
  `id` int(11) NOT NULL,
  `id_crm_activity_event` int(11) NOT NULL,
  `model_name` enum('Lead','Contact','Company','Deal','Campaign') NOT NULL,
  `model_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_activity_event_participant;
CREATE TABLE crm_activity_event_participant (
  `id` int(11) NOT NULL,
  `id_crm_activity_event` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_activity_task;
CREATE TABLE crm_activity_task (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `due_date` datetime NOT NULL,
  `id_crm_task_status_master` tinyint(3) DEFAULT NULL,
  `recurrence_type` enum('daily','weekly','monthly','yearly','none') NOT NULL COMMENT '''daily'',''weekly'',''monthly'',''yearly'',''none''',
  `end_date_option` tinyint(1) DEFAULT NULL COMMENT '1 means no end date, 2 means end after n occurence and 3 means end by any date    ',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_activity_task_link;
CREATE TABLE crm_activity_task_link (
  `id` int(11) NOT NULL,
  `id_crm_activity_task` int(11) NOT NULL,
  `model_name` enum('Lead','Contact','Company','Deal','Campaign') NOT NULL,
  `model_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_address;
CREATE TABLE crm_address (
  `id` int(11) NOT NULL,
  `address_type` enum('default','mailing','billing','shipping','others') DEFAULT NULL,
  `street` text,
  `city` int(11) DEFAULT NULL,
  `state_province` int(11) DEFAULT NULL,
  `zip_code` varchar(10) DEFAULT NULL,
  `country` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_campaign;
CREATE TABLE crm_campaign (
  `id` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `id_crm_campaign_type_master` int(11) DEFAULT NULL,
  `campaign_name` varchar(100) NOT NULL,
  `campaign_status` enum('planning','active','inactive','complete') DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `expected_revenue` decimal(20,2) DEFAULT NULL,
  `budgeted_cost` decimal(20,2) DEFAULT NULL,
  `actual_cost` decimal(20,2) DEFAULT NULL,
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_campaign_link;
CREATE TABLE crm_campaign_link (
  `id` int(11) NOT NULL,
  `model_name` enum('Lead','Contact') NOT NULL,
  `model_id` int(11) NOT NULL,
  `id_crm_campaign` int(11) NOT NULL,
  `id_crm_campaign_status_master` tinyint(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_campaign_status_master;
CREATE TABLE crm_campaign_status_master (
  `id` tinyint(3) NOT NULL,
  `campaign_status` varchar(40) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_campaign_status_master (id, campaign_status, weight) VALUES
(1, 'Planned', 0),
(2, 'Invited', 0),
(3, 'Sent', 0),
(4, 'Received', 0),
(5, 'Opened', 0),
(6, 'Responded', 0),
(7, 'Bounced', 0),
(8, 'Opted Out', 0);

DROP TABLE IF EXISTS crm_campaign_type_master;
CREATE TABLE crm_campaign_type_master (
  `id` int(11) NOT NULL,
  `campaign_type` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_campaign_type_master (id, campaign_type, weight) VALUES
(1, 'Conference', 0),
(2, 'Webinar', 0),
(3, 'Banner Ads', 0),
(4, 'Telemarketing', 0),
(6, 'Email', 0),
(7, 'Trade Show', 0),
(8, 'Public Relations', 0),
(9, 'Others', 0);

DROP TABLE IF EXISTS crm_company;
CREATE TABLE crm_company (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `id_crm_company_status_master` tinyint(3) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `registration_number` varchar(50) DEFAULT NULL,
  `company_email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fax` varchar(50) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `skype_url` varchar(100) DEFAULT NULL,
  `twitter_url` varchar(100) DEFAULT NULL,
  `linkedin_url` varchar(100) DEFAULT NULL,
  `facebook_url` varchar(100) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_company_address;
CREATE TABLE crm_company_address (
  `id_crm_company` int(11) NOT NULL,
  `id_crm_address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_company_ownership_master;
CREATE TABLE crm_company_ownership_master (
  `id` int(11) NOT NULL,
  `company_ownership` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_company_ownership_master (id, company_ownership, weight) VALUES
(1, 'private', 0),
(2, 'public', 0),
(3, 'government', 0),
(4, 'subsidiary', 0);

DROP TABLE IF EXISTS crm_company_status_master;
CREATE TABLE crm_company_status_master (
  `id` tinyint(3) NOT NULL,
  `company_status` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_company_status_master (id, company_status, weight) VALUES
(1, 'None', 0),
(2, 'Acquired', 0),
(3, 'Active', 0),
(4, 'Market Failed', 0),
(5, 'Project Cancelled', 0),
(6, 'Shut Down', 0);

DROP TABLE IF EXISTS crm_company_type_master;
CREATE TABLE crm_company_type_master (
  `id` int(11) NOT NULL,
  `company_type` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_company_type_master (id, company_type, weight) VALUES
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

DROP TABLE IF EXISTS crm_contact;
CREATE TABLE crm_contact (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_contact_address;
CREATE TABLE crm_contact_address (
  `id_crm_contact` int(11) NOT NULL,
  `id_crm_address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_deal;
CREATE TABLE crm_deal (
  `id` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `id_crm_contact` int(11) DEFAULT NULL,
  `id_crm_company` int(11) DEFAULT NULL,
  `deal_name` varchar(100) NOT NULL,
  `deal_type` enum('none','existing_business','new_business') DEFAULT NULL,
  `deal_closing_date` datetime NOT NULL,
  `deal_amount` decimal(20,2) DEFAULT NULL,
  `expected_revenue` decimal(20,2) DEFAULT NULL,
  `id_crm_lead_source_master` int(11) DEFAULT NULL,
  `id_crm_campaign` int(11) DEFAULT NULL,
  `id_crm_pipeline_stage` tinyint(3) DEFAULT NULL,
  `next_step` varchar(50) DEFAULT NULL,
  `description` text,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_deal_pipeline_history;
CREATE TABLE crm_deal_pipeline_history (
  `id` int(11) NOT NULL,
  `id_crm_deal` int(11) NOT NULL,
  `id_crm_pipeline_stage` tinyint(3) NOT NULL,
  `amount` decimal(20,2) DEFAULT NULL,
  `expected_revenue` decimal(20,2) DEFAULT NULL,
  `closing_date` datetime DEFAULT NULL,
  `stage_duration` varchar(50) DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_industry_master;
CREATE TABLE crm_industry_master (
  `id` int(11) NOT NULL,
  `industry_name` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_industry_master (id, industry_name, weight) VALUES
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

DROP TABLE IF EXISTS crm_lead;
CREATE TABLE crm_lead (
  `id` int(11) NOT NULL,
  `owner` int(11) NOT NULL,
  `id_crm_lead_contact_parent` int(11) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `id_crm_lead_status_master` int(11) DEFAULT NULL,
  `id_crm_rating_master` int(11) DEFAULT NULL,
  `no_of_employees` int(5) DEFAULT NULL,
  `annual_revenue` decimal(20,2) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_lead_address;
CREATE TABLE crm_lead_address (
  `id_crm_lead` int(11) NOT NULL,
  `id_crm_address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_lead_contact_parent;
CREATE TABLE crm_lead_contact_parent (
  `id` int(11) NOT NULL,
  `salutation` varchar(10) DEFAULT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) DEFAULT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_lead_source_master;
CREATE TABLE crm_lead_source_master (
  `id` int(11) NOT NULL,
  `source` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_lead_source_master (id, `source`, weight) VALUES
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

DROP TABLE IF EXISTS crm_lead_status_master;
CREATE TABLE crm_lead_status_master (
  `id` int(11) NOT NULL,
  `status` varchar(40) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_model_attachement;
CREATE TABLE crm_model_attachement (
  `id` int(11) NOT NULL,
  `model_name` enum('Lead','Contact','Company','Deal','Campaign') NOT NULL,
  `model_id` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_model_note;
CREATE TABLE crm_model_note (
  `id` int(11) NOT NULL,
  `model_name` enum('Lead','Contact','Company','Deal','Campaign') NOT NULL,
  `model_id` int(11) NOT NULL,
  `note_title` varchar(255) DEFAULT NULL,
  `note_description` text NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_model_note_attachement;
CREATE TABLE crm_model_note_attachement (
  `id` int(11) NOT NULL,
  `id_crm_model_note` int(11) NOT NULL,
  `minio_file_id` varchar(100) NOT NULL,
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_pipeline;
CREATE TABLE crm_pipeline (
  `id` tinyint(2) NOT NULL,
  `pipeline_name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_pipeline (id, pipeline_name, is_active) VALUES
(1, 'Sales Pipeline', 1);

DROP TABLE IF EXISTS crm_pipeline_stage;
CREATE TABLE crm_pipeline_stage (
  `id` tinyint(3) NOT NULL,
  `id_crm_pipeline` tinyint(2) NOT NULL,
  `stage_name` varchar(40) NOT NULL,
  `win_probabality` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_pipeline_stage (id, id_crm_pipeline, stage_name, win_probabality, weight) VALUES
(1, 1, 'None', '0', 0),
(2, 1, 'Introduction', '10', 0),
(3, 1, 'Opportunity', '20', 0),
(6, 1, 'Proposal/Price Quote', '50', 0),
(7, 1, 'Negotiation/Review', '60', 0),
(8, 1, 'Closed Won', '100', 0),
(9, 1, 'Closed Lost', '0 ', 0);

DROP TABLE IF EXISTS crm_rating_master;
CREATE TABLE crm_rating_master (
  `id` int(11) NOT NULL,
  `rating` varchar(100) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_rating_master (id, rating, weight) VALUES
(5, 'Warm', 0),
(6, 'Hot', 0),
(7, 'Cold', 0);

DROP TABLE IF EXISTS crm_recurrence_daily;
CREATE TABLE crm_recurrence_daily (
  `id` int(11) NOT NULL,
  `id_crm_activity_task` int(11) NOT NULL,
  `daily_option` enum('daily','weekday') DEFAULT 'daily',
  `daily_day_no` int(11) DEFAULT '0',
  `is_deleted` tinyint(1) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_recurrence_monthly;
CREATE TABLE crm_recurrence_monthly (
  `id` int(11) NOT NULL,
  `id_crm_activity_task` int(11) NOT NULL,
  `monthly_option` enum('day','weekly') DEFAULT 'day',
  `monthly_day` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `monthly_week` varchar(25) DEFAULT NULL,
  `monthly_day_of_week` varchar(25) DEFAULT NULL,
  `monthly_of_every_month` tinyint(3) UNSIGNED DEFAULT NULL,
  `is_deleted` tinyint(4) DEFAULT '0',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_recurrence_weekly;
CREATE TABLE crm_recurrence_weekly (
  `id` int(11) NOT NULL,
  `id_crm_activity_task` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_recurrence_yearly;
CREATE TABLE crm_recurrence_yearly (
  `id` int(11) NOT NULL,
  `id_crm_activity_task` int(11) NOT NULL,
  `recur_every_year` tinyint(4) UNSIGNED DEFAULT NULL COMMENT '1 means yes and 0 means no',
  `yearly_option` enum('monthly','weekly') DEFAULT 'monthly',
  `yearly_on_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `yearly_on_month_day` tinyint(4) UNSIGNED DEFAULT NULL,
  `yearly_week` enum('first','second','third','fourth','last') DEFAULT 'first',
  `yearly_day_of_week` enum('day','weekday','weekend day','sunday','monday','tuesday','wednesday','thursday','friday','saturday') DEFAULT 'monday',
  `yearly_of_every_month` enum('january','february','march','april','may','june','july','august','september','october','november','december') DEFAULT 'january',
  `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 means deleted and 0 means undeleted',
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS crm_task_status_master;
CREATE TABLE crm_task_status_master (
  `id` tinyint(3) NOT NULL,
  `task_status` varchar(50) NOT NULL,
  `weight` tinyint(2) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO crm_task_status_master (id, task_status, weight) VALUES
(1, 'Not Started', 0),
(2, 'Deferred', 0),
(3, 'In Progress', 0),
(4, 'Completed', 0),
(5, 'Pending', 0);

DROP TABLE IF EXISTS migrations;
CREATE TABLE migrations (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


ALTER TABLE crm_activity_call
  ADD PRIMARY KEY (`id`) USING BTREE;

ALTER TABLE crm_activity_call_link
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_activity_call_link_1_idx` (`id_crm_activity_call`);

ALTER TABLE crm_activity_event
  ADD PRIMARY KEY (`id`) USING BTREE;

ALTER TABLE crm_activity_event_link
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_activity_event_link_1_idx` (`id_crm_activity_event`);

ALTER TABLE crm_activity_event_participant
  ADD PRIMARY KEY (`id`) USING BTREE;

ALTER TABLE crm_activity_task
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `fk_crm_activity_task_1_idx` (`id_crm_task_status_master`);

ALTER TABLE crm_activity_task_link
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_activity_task_link_1_idx` (`id_crm_activity_task`);

ALTER TABLE crm_address
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_campaign
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_crm_campaign_type_master` (`id_crm_campaign_type_master`);

ALTER TABLE crm_campaign_link
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `model_name` (`model_name`,`model_id`,`id_crm_campaign`,`id_crm_campaign_status_master`),
  ADD KEY `fk_crm_campaign_link_1_idx` (`id_crm_campaign`),
  ADD KEY `fk_crm_campaign_link_2_idx` (`id_crm_campaign_status_master`);

ALTER TABLE crm_campaign_status_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_campaign_type_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_company
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_company_2_idx` (`id_crm_company_type_master`),
  ADD KEY `fk_crm_company_3_idx` (`id_crm_company_ownership_master`),
  ADD KEY `fk_crm_company_4_idx` (`id_crm_industry_master`),
  ADD KEY `fk_crm_company_1_idx` (`id_crm_company_status_master`);

ALTER TABLE crm_company_address
  ADD KEY `fk_crm_company_address_1_idx` (`id_crm_company`),
  ADD KEY `fk_crm_company_address_2_idx` (`id_crm_address`);

ALTER TABLE crm_company_ownership_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_company_status_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_company_type_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_contact
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_contact_1_idx` (`id_crm_company`),
  ADD KEY `fk_crm_contact_2_idx` (`id_crm_lead_contact_parent`),
  ADD KEY `fk_crm_contact_7_idx` (`assistant_parent_id`),
  ADD KEY `fk_crm_contact_8_idx` (`reports_to_parent_id`),
  ADD KEY `fk_crm_contact_9_idx` (`id_crm_pipeline_stage`);

ALTER TABLE crm_contact_address
  ADD KEY `fk_crm_contact_address_1_idx` (`id_crm_contact`),
  ADD KEY `fk_crm_contact_address_2_idx` (`id_crm_address`);

ALTER TABLE crm_deal
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_deal_1_idx` (`id_crm_contact`),
  ADD KEY `fk_crm_deal_2_idx` (`id_crm_company`),
  ADD KEY `fk_crm_deal_3_idx` (`id_crm_campaign`),
  ADD KEY `fk_crm_deal_4_idx` (`id_crm_pipeline_stage`),
  ADD KEY `fk_crm_deal_5_idx` (`id_crm_lead_source_master`);

ALTER TABLE crm_deal_pipeline_history
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_deal_pipeline_history_1_idx` (`id_crm_pipeline_stage`),
  ADD KEY `fk_crm_deal_pipeline_history_2_idx` (`id_crm_deal`);

ALTER TABLE crm_industry_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_lead
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_1_idx` (`id_crm_lead_status_master`),
  ADD KEY `fk_crm_lead_4_idx` (`id_crm_industry_master`),
  ADD KEY `fk_crm_lead_3_idx` (`id_crm_rating_master`),
  ADD KEY `fk_crm_lead_2_idx` (`id_crm_lead_contact_parent`),
  ADD KEY `fk_crm_lead_9_idx` (`id_crm_pipeline_stage`);

ALTER TABLE crm_lead_address
  ADD KEY `fk_crm_lead_address_1_idx` (`id_crm_address`),
  ADD KEY `fk_crm_lead_address_2_idx` (`id_crm_lead`);

ALTER TABLE crm_lead_contact_parent
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_lead_contact_parent_1_idx` (`id_crm_lead_source_master`);

ALTER TABLE crm_lead_source_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_lead_status_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_model_attachement
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_model_note
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_model_note_attachement
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_model_note_attachement_1_idx` (`id_crm_model_note`);

ALTER TABLE crm_pipeline
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_pipeline_stage
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_pipeline_stage_1` (`id_crm_pipeline`);

ALTER TABLE crm_rating_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE crm_recurrence_daily
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_recurrence_daily_1_idx` (`id_crm_activity_task`);

ALTER TABLE crm_recurrence_monthly
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_recurrence_monthly_1_idx` (`id_crm_activity_task`);

ALTER TABLE crm_recurrence_weekly
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_recurrence_weekly_1_idx` (`id_crm_activity_task`);

ALTER TABLE crm_recurrence_yearly
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_crm_recurrence_yearly_1_idx` (`id_crm_activity_task`);

ALTER TABLE crm_task_status_master
  ADD PRIMARY KEY (`id`);

ALTER TABLE migrations
  ADD PRIMARY KEY (`id`);


ALTER TABLE crm_activity_call
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_activity_call_link
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_activity_event
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_activity_event_link
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_activity_event_participant
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_activity_task
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_activity_task_link
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_address
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
ALTER TABLE crm_campaign
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
ALTER TABLE crm_campaign_link
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE crm_campaign_status_master
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
ALTER TABLE crm_campaign_type_master
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE crm_company
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
ALTER TABLE crm_company_status_master
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
ALTER TABLE crm_company_type_master
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
ALTER TABLE crm_contact
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
ALTER TABLE crm_deal
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
ALTER TABLE crm_deal_pipeline_history
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_industry_master
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
ALTER TABLE crm_lead
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;
ALTER TABLE crm_lead_contact_parent
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;
ALTER TABLE crm_lead_source_master
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
ALTER TABLE crm_lead_status_master
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
ALTER TABLE crm_model_attachement
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE crm_model_note
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
ALTER TABLE crm_model_note_attachement
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;
ALTER TABLE crm_pipeline
  MODIFY `id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE crm_pipeline_stage
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
ALTER TABLE crm_rating_master
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
ALTER TABLE crm_recurrence_daily
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_recurrence_monthly
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_recurrence_weekly
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_recurrence_yearly
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE crm_task_status_master
  MODIFY `id` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE migrations
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE crm_activity_call_link
  ADD CONSTRAINT `fk_crm_activity_call_link_1` FOREIGN KEY (`id_crm_activity_call`) REFERENCES crm_activity_call (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_activity_event_link
  ADD CONSTRAINT `fk_crm_activity_event_link_1` FOREIGN KEY (`id_crm_activity_event`) REFERENCES crm_activity_event (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE crm_activity_task
  ADD CONSTRAINT `fk_crm_activity_task_1` FOREIGN KEY (`id_crm_task_status_master`) REFERENCES crm_task_status_master (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

ALTER TABLE crm_activity_task_link
  ADD CONSTRAINT `fk_crm_activity_task_link_1` FOREIGN KEY (`id_crm_activity_task`) REFERENCES crm_activity_task (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_campaign
  ADD CONSTRAINT `crm_campaign_ibfk_1` FOREIGN KEY (`id_crm_campaign_type_master`) REFERENCES crm_campaign_type_master (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE crm_campaign_link
  ADD CONSTRAINT `fk_crm_campaign_link_1` FOREIGN KEY (`id_crm_campaign`) REFERENCES crm_campaign (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_campaign_link_2` FOREIGN KEY (`id_crm_campaign_status_master`) REFERENCES crm_campaign_status_master (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_company
  ADD CONSTRAINT `fk_crm_company_1` FOREIGN KEY (`id_crm_company_status_master`) REFERENCES crm_company_status_master (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_company_2` FOREIGN KEY (`id_crm_company_type_master`) REFERENCES crm_company_type_master (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_company_3` FOREIGN KEY (`id_crm_company_ownership_master`) REFERENCES crm_company_ownership_master (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_company_4` FOREIGN KEY (`id_crm_industry_master`) REFERENCES crm_industry_master (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_company_address
  ADD CONSTRAINT `fk_crm_company_address_1` FOREIGN KEY (`id_crm_company`) REFERENCES crm_company (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_company_address_2` FOREIGN KEY (`id_crm_address`) REFERENCES crm_address (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_contact
  ADD CONSTRAINT `fk_crm_contact_1` FOREIGN KEY (`id_crm_lead_contact_parent`) REFERENCES crm_lead_contact_parent (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_2` FOREIGN KEY (`id_crm_company`) REFERENCES crm_company (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_3` FOREIGN KEY (`assistant_parent_id`) REFERENCES crm_contact (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_4` FOREIGN KEY (`reports_to_parent_id`) REFERENCES crm_contact (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_5` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES crm_pipeline_stage (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_contact_address
  ADD CONSTRAINT `fk_crm_contact_address_1` FOREIGN KEY (`id_crm_contact`) REFERENCES crm_contact (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_contact_address_2` FOREIGN KEY (`id_crm_address`) REFERENCES crm_address (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_deal
  ADD CONSTRAINT `fk_crm_deal_1` FOREIGN KEY (`id_crm_contact`) REFERENCES crm_contact (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_2` FOREIGN KEY (`id_crm_company`) REFERENCES crm_company (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_3` FOREIGN KEY (`id_crm_campaign`) REFERENCES crm_campaign (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_4` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES crm_pipeline_stage (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_5` FOREIGN KEY (`id_crm_lead_source_master`) REFERENCES crm_lead_source_master (`id`) ON UPDATE CASCADE;

ALTER TABLE crm_deal_pipeline_history
  ADD CONSTRAINT `fk_crm_deal_pipeline_history_1` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES crm_pipeline_stage (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_deal_pipeline_history_2` FOREIGN KEY (`id_crm_deal`) REFERENCES crm_deal (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE crm_lead
  ADD CONSTRAINT `fk_crm_lead_1` FOREIGN KEY (`id_crm_lead_contact_parent`) REFERENCES crm_lead_contact_parent (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_2` FOREIGN KEY (`id_crm_lead_status_master`) REFERENCES crm_lead_status_master (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_3` FOREIGN KEY (`id_crm_rating_master`) REFERENCES crm_rating_master (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_4` FOREIGN KEY (`id_crm_industry_master`) REFERENCES crm_industry_master (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_crm_lead_5` FOREIGN KEY (`id_crm_pipeline_stage`) REFERENCES crm_pipeline_stage (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_lead_address
  ADD CONSTRAINT `fk_crm_lead_address_1` FOREIGN KEY (`id_crm_address`) REFERENCES crm_address (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_crm_lead_address_2` FOREIGN KEY (`id_crm_lead`) REFERENCES crm_lead (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE crm_model_note_attachement
  ADD CONSTRAINT `fk_crm_model_note_attachement_1` FOREIGN KEY (`id_crm_model_note`) REFERENCES crm_model_note (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE crm_pipeline_stage
  ADD CONSTRAINT `fk_crm_pipeline_stage_1` FOREIGN KEY (`id_crm_pipeline`) REFERENCES crm_pipeline (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE crm_recurrence_daily
  ADD CONSTRAINT `fk_crm_recurrence_daily_1` FOREIGN KEY (`id_crm_activity_task`) REFERENCES crm_activity_task (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_recurrence_monthly
  ADD CONSTRAINT `fk_crm_recurrence_monthly_1` FOREIGN KEY (`id_crm_activity_task`) REFERENCES crm_activity_task (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_recurrence_weekly
  ADD CONSTRAINT `fk_crm_recurrence_weekly_1` FOREIGN KEY (`id_crm_activity_task`) REFERENCES crm_activity_task (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE crm_recurrence_yearly
  ADD CONSTRAINT `fk_crm_recurrence_yearly_1` FOREIGN KEY (`id_crm_activity_task`) REFERENCES crm_activity_task (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
