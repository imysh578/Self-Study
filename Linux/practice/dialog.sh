#!/bin/bash

HEiGHT=15
WIDTH=40
CHOICE_HEIGHT=4
BACKTITLE="Back title here"
TITLE="Title here"
MENU="Choose one of the following options:"

OPTIONS=(1 "Option 1"
	 2 "Option 2"
	 3 "Option 3")

CHOICE=$(dialog --clear\
		--backtitle "$BACKTITLE"\
		--title "$TITLE"\
		--menu "$MENU"\
		$HEIGHT $WIDTH $CHOICE_HEIGHT\
		"${OPTIONS[@]}"\
		2>&1 >/dev/tty)
clear

case $CHOICE in
	1)
		echo "Option 1 chosen"
		;;
	2)
		echo "Option 2 chosen"
		;;
	3)
		echo "Option 3 chosen"
		;;
esac
