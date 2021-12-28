#!/bin/bash

startDate=`date +"%Y%m%d" -d "20210101"`
endDate=`date +"%Y%m%d" -d "20210201"`
while [ "$startDate" != "$endDate" ];
do
	echo $startDate

	startDate=`date +"%Y%m%d" -d "$startDate + 1 day"`;
done
