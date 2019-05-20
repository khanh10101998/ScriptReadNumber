# chmod 777 ./file
cd e2e/flow-test/accept-task
while IFS= read -r f1; do
  path=${f1:2}
file=$((awk '/FILE/ {print} ' $path) | cut -d "'" -f 2) 

viLine=$((awk  '/LINE/ {for(i=1;i<=NF;i++) if(i<NF) printf $i" "; else printf $i ; print ""}' $path) | tr '//' '\n' | cut -d "'"  -f 2 ) 

line=$((awk '/LINE/ {print}' $path) | cut -d "'" -f 2) 

n=1
IFS=''
while read a; 
do 
    checkIT="$(echo $a | head -c 2)"
    
    # if [ "$checkIT" == "it" ]; then
    if [[ $a == *"it("* ]]; then
        # IFS= read -r f1 $a
        DE=$(sed 's/it.* -//'<<<"${a}")
        #  remove the leading and trailing spaces in a string
        DEL=$(sed 's/^ *//;s/ *$//;s/  */ /;'<<<"${DE}")
        echo "  it('LINE" $n" - "$DEL
    else
        echo $a
    fi
    n=$((n+1))
done < $path > $path.t ; mv $path{.t,}
done < <(find . -type f | sort -n)
