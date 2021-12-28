#!/bin/bash

# Get year and month from user input
#echo Year :
#read year
#echo Month :
#read month

# Set parameters into year and month
year=$1
month=$2

startNum=`date +"%u" -d ${year}${month}01`
startDate=`date +"%Y%m%d" -d ${year}${month}01`
endDate=`date +"%Y%m%d" -d "${year}${month}01 +1 month"`

echo -e "\t\t *** `date +"%b %Y" -d $startDate` ***"
echo -e "MON\tTUS\tWED\tTHU\tFRI\tSAT\tSUN"

# Set the start postion
i=1
while [ $i -lt $startNum ]
do
	printf "\t"
	((i++))
done

# Put rest of calendar
while [ $startDate != $endDate ]
do
	dayOfWeek=`date +%u -d $startDate`
	date=`date +%d -d $startDate`
	printf "${date}\t"
	if [ $((${dayOfWeek}%7)) == 0 ]
	then
		echo
	fi
	startDate=`date +%Y%m%d -d "$startDate +1 day"`
done
echo
