/*
 * This Resolver File belongs to the ActivityTask type
 * Arif Khan 2018-03-14;
 *
 */
const model = require('../../models');
const constant = require('../../lib/constant');
const common = require('../../lib/commonResolver');

module.exports = {
    Query: {
        getCrmActivityListByModel: async (obj, args, context, info) => {
            const query = "select task.id as id, owner, subject, 'Task' as activity_type, null as schedule_date,created_at, task_link.model_id, task_link.model_name from crm_activity_task as task inner join crm_activity_task_link as task_link on task.id = task_link.id_crm_activity_task AND task_link.model_name = :model_name AND task_link.model_id = :model_id where is_deleted = 0 union all select event.id as id, owner, subject, 'Event' as activity_type, null as schedule_date,created_at, event_link.model_id, event_link.model_name from crm_activity_event as event inner join crm_activity_event_link as event_link on event.id = event_link.id_crm_activity_event AND event_link.model_name = :model_name AND event_link.model_id = :model_id where is_deleted = 0 union all select activity_call.id as activity_call, owner, subject, 'Call' as activity_type, null as schedule_date,created_at, call_link.model_id, call_link.model_name from crm_activity_call as activity_call inner join crm_activity_call_link as call_link on activity_call.id = call_link.id_crm_activity_call AND call_link.model_name = :model_name AND call_link.model_id = :model_id where is_deleted = 0";
            const result = await Promise.all([model.dbConnection.query('select count(id) as totalCounts from(' + query + ')activity', {
                type: model.dbConnection.QueryTypes.SELECT,
                replacements: args.input
            }), model.dbConnection.query('select * from(' + query + ')activity order by created_at desc limit 3', {
                type: model.dbConnection.QueryTypes.SELECT,
                replacements: args.input
            }),]);
            return {
                result: result[1],
                totalCounts: result[0][0].totalCounts,
                message: constant.SUCCESS
            }
        },
        getCrmActivityListByPage: async (obj, args, context, info) => {
            const query = "select task.id as id, 'Task' as activity_type, task.subject as subject, task.due_date as due_date, task.owner as owner, task.id_crm_task_status_master as status, task.created_at as created_at, company.company_name as company_name, company.id as company_id, CONCAT(contact_parent.first_name, ' ' ,contact_parent.last_name) as contact_name, contact.id as contact_id, task_link.model_id as model_id, task_link.model_name as model_name from crm_activity_task as task left join crm_activity_task_link as task_link left join crm_company as company on company.id = task_link.model_id AND task_link.model_name = 'Company' left join crm_contact as contact on contact.id = task_link.model_id AND task_link.model_name = 'Contact' left join crm_lead_contact_parent as contact_parent on contact_parent.id = contact.id_crm_lead_contact_parent on task.id = task_link.id_crm_activity_task where task.is_deleted = 0 AND NOT (task_link.model_name = 'Company' AND company.is_deleted = 1) AND NOT (task_link.model_name = 'Contact' AND contact.is_deleted = 1) union all select event.id as id, 'Event' as activity_type, event.subject as subject, null as due_date, event.owner as owner, null as status, event.created_at as created_at, company.company_name as company_name, company.id as company_id, CONCAT(contact_parent.first_name, ' ' ,contact_parent.last_name) as contact_name, contact.id as contact_id, event_link.model_id as model_id, event_link.model_name as model_name from crm_activity_event as event left join crm_activity_event_link as event_link left join crm_company as company on company.id = event_link.model_id AND event_link.model_name = 'Company' left join crm_contact as contact on contact.id = event_link.model_id AND event_link.model_name = 'Contact' left join crm_lead_contact_parent as contact_parent on contact_parent.id = contact.id_crm_lead_contact_parent on event.id = event_link.id_crm_activity_event where event.is_deleted = 0 AND NOT (event_link.model_name = 'Company' AND company.is_deleted = 1) AND NOT (event_link.model_name = 'Contact' AND contact.is_deleted = 1) union all select activity_call.id as id, 'Call' as activity_type, activity_call.subject as subject, null as due_date, activity_call.owner as owner, null as status, activity_call.created_at as created_at, company.company_name as company_name, company.id as company_id, CONCAT(contact_parent.first_name, ' ' ,contact_parent.last_name) as contact_name, contact.id as contact_id, activity_call_link.model_id as model_id, activity_call_link.model_name as model_name from crm_activity_call as activity_call left join crm_activity_call_link as activity_call_link left join crm_company as company on company.id = activity_call_link.model_id AND activity_call_link.model_name = 'Company' left join crm_contact as contact on contact.id = activity_call_link.model_id AND activity_call_link.model_name = 'Contact' left join crm_lead_contact_parent as contact_parent on contact_parent.id = contact.id_crm_lead_contact_parent on activity_call.id = activity_call_link.id_crm_activity_call where activity_call.is_deleted = 0 AND NOT (activity_call_link.model_name = 'Company' AND company.is_deleted = 1) AND NOT (activity_call_link.model_name = 'Contact' AND contact.is_deleted = 1)";
            try {
                if(args.input.filter) {
                    args.input.filter = JSON.parse(args.input.filter);
                }
            } catch(err) {
                args.input.filter = null;
                console.log('Invalid filter json string');
            }
            let filter = '';
            if(args.input.filter && args.input.filter.subject) {
                filter += ' where subject like %' + args.input.filter.subject +'% ';
            }
            filter += ' order by ' + args.input.sortField + ' ' + args.input.sortDirection +' limit :limit offset :offset';
            const queryReplacements = {
                limit: args.input.pageSize,
                offset: args.input.pageSize * (args.input.currentPage - 1)
            };
            const result = await Promise.all([model.dbConnection.query('select count(id) as totalCounts from(' + query + ')activity', {
                type: model.dbConnection.QueryTypes.SELECT
            }), model.dbConnection.query('select * from(' + query + ')activity' + filter, {
                type: model.dbConnection.QueryTypes.SELECT,
                replacements: queryReplacements
            })]);
            return {
                result: result[1],
                message: constant.SUCCESS,
                pageInfo: {
                    totalCounts: result[0][0].totalCounts,
                    totalPages: Math.ceil(result[0][0].totalCounts / args.input.pageSize),
                    currentPage: args.input.currentPage,
                    pageSize: args.input.pageSize,
                    sortField: args.input.sortField,
                    sortDirection: args.input.sortDirection
                }
            };
        }
    }
}