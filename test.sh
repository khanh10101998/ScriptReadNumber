# chmod 777 ./file
cd e2e
while IFS= read -r f1; do
    path=${f1:2}
    numLine=1
    IFS=''
    # Read each line of the file
    while IFS= read -r a;
        do
                IFS=' ' read -r -a arrString <<< "$a"
                firstLine=${arrString[0]}
                itString="it('"
                LINE="LINE"
                delit=${firstLine:0:2}
                LINE1=${LINE:0:4}
            if [[ $a == *"it("* ]]; then
                if [ "$firstLine" == "it('LINE" -o "$firstLine" == 'it("LINE' ]; then
                    numLineDelete=${arrString[1]}
                    # Replace the number of old lines to the new line number
                    DE=$(sed "s/$numLineDelete/$numLine/g"<<<"${a}")
                    echo $DE
                elif [ "$firstLine" == "//" ]; then
                    echo $a
                elif [ "$firstLine" == "it(" ]; then
                    numLineDelete=${arrString[2]}
                    DE=$(sed "s/$numLineDelete/$numLine/g"<<<"${a}")
                    echo $DE
                elif [ "$firstLine" == 'it("Tasker' ]; then
                    itString1='it("'
                    
                    insertNumber=$(sed "s/$itString1/"$itString1"LINE $numLine - /g"<<<"${a}")
                    echo $insertNumber
                else 
                    insertNumber=$(sed "s/$itString/it('LINE $numLine - /g"<<<"${a}")
                    echo $insertNumber
                fi
        
            elif [ "$firstLine" == "//" ]; then
                echo $a
            else
            echo $a
            fi
    numLine=$((numLine+1))
done < <(grep "" $path) > $path.t ; mv $path{.t,}

done < <(find . -type f | sort -n)
