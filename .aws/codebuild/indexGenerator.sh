#!/bin/bash
cat .aws/codebuild/index_head.txt > index.html
#for folder in $(aws s3 ls s3://mercury.banesco.do/|grep my-report|awk '{print $2}'|awk -F "/" '{print $1}');do
for folder in $(aws s3 ls s3://mercury.banesco.do/ --recursive|grep my-report|awk '{print $4}'|awk -F "/" '{print $1}'|sort -ur);do
	URL="<a href=\"https://mercury.banesco.do/$folder/index.html\">$folder</a>"
	echo "<ul>$URL</ul>"  >> index.html

done
cat .aws/codebuild/index_foot.txt >> index.html
