file="/e2e/flow-test/file.txt"
cd e2e/flow-test/accept-task

line=$(grep -n "LINE" accept-task-manual-or-auto-choose-tasker.spec.js)
# getNumLine = "$(echo $a | head -c 2)"

# echo $(head -n 1 $line) 

# echo * | head -n1 | awk '{print $1;}'

echo $line