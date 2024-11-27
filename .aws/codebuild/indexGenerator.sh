#!/bin/bash
cat index_head.txt > index.html
for folder in $(aws s3 ls s3://mercury.banesco.do/|grep my-report|awk '{print $2}'|awk -F "/" '{print $1}');do
	URL="<a href=\"https://mercury.banesco.do/$folder/index.html\">$folder</a>"
	echo "<ul>$URL</ul>"  >> index.html

done
cat index_foot.txt  >> index.html
