#!/bin/bash

YYMMDD=`date "+%y%m%d"`

dir="/home/imysh578"
folder="/date_log"
file="Date_${YYMMDD}.txt"

if [ -e $dir$folder ]
then
	cd $dir$folder
	echo $dir$folder already exists
	if [ -e $dir$folder/$file ]
	then
		echo $file already exists
		date > $file
		echo Rewrote $file
	else
		cd $dir$folder
		date > $file
		echo $file was created!
	fi
else
	echo $folder does not exist
	mkdir $dir$folder; cd $dir$folder; date > $file
	echo The $file was created in $dir$folder!
fi
	
