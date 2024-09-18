trcli -y `
  -h "https://banescord.testrail.io/" `
  -u "randujar@banesco.com" `
  -p "*Temporal11" `
  --project "Test Automation Playwright" `
parse_junit `
  --title "Playwright Automated Test Run" `
  -f "./test-results/junit-report.xlm" 