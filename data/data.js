import fs from 'fs';
import csv from 'fast-csv';
import pool from './pgdb.js';

pool.connect(function(err){
    if(err)
    {
        console.log(err);
    }
});

let counter = 0; 

// let header = [];
// let data = [];

let csvStream = csv.parseFile(".\\click_check.csv", { headers: true })
    .on("data", function(record){
        csvStream.pause();

        if(counter < 10)
        {
            let id = record.id;
            let log_uuid = record.log_uuid;
            let application_no = record.application_no;
            let source = record.source;
            if(record.source == 'NaN'){
                source = null;
            }
            let live_b64 = record.live_b64;
            if(record.live_b64 == 'NULL'){
                live_b64 = null;
            }
            let kyc_avlb = record.kyc_avlb;
            if(record.kyc_avlb == 'NULL'){
                kyc_avlb = null;
            }
            let f_match = record.f_match;
            if(record.f_match == 'NULL'){
                f_match = null;
            }
            let f_score = record.f_score;
            if(record.f_score == 'NULL'){
                f_score = null;
            }
            let f_remarks = record.f_remarks;
            let completed = record.completed;
            let completed_on = record.completed_on;
            let live_img_aqc = record.live_img_aqc;
            if(record.live_img_aqc == 'NULL'){
                live_img_aqc = null;
            }
            let date_of_application = record.date_of_application;

            pool.query("INSERT INTO click_check(id, log_uuid, application_no, source, live_b64, kyc_avlb, f_match, f_score, f_remarks, completed, completed_on, live_img_aqc, date_of_application) \
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)", [id, log_uuid, application_no, source, live_b64, kyc_avlb, f_match, f_score, f_remarks, completed, completed_on, live_img_aqc, date_of_application], function(err){
                if(err)
                {
                    console.log(err);
                }
            });
            ++counter;
        }

        csvStream.resume();

    }).on("end", function(){
        console.log("Job is done!");
    }).on("error", function(err){
        console.log(err);
    });