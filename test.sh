# chmod 777 ./file
cd e2e/flow-test
while IFS= read -r f1; do
    path=${f1:2}
    numLine=1
    IFS=''
    while IFS= read -r a || [ -n "$a" ];
        do
            # if [[ $a == *"it("* ]]; then
                firstLine=${arrString[0]}
            if [ "$firstLine" == "it('LINE" ]; then
                lineNumber=$(sed 's/[:]//g'<<<"${array[0]}")
                IFS=' ' read -r -a arrString <<< "$a"
                numLineDelete=${arrString[1]}

                DE=$(sed "s/$numLineDelete/$numLine/g"<<<"${a}")
                echo $DE
            elif [ "$firstLine" == "//" ]; then
                echo $a
            else
            echo $a
            fi

    numLine=$((numLine+1))
done < $path > $path.t ; mv $path{.t,}
done < <(find . -type f | sort -n)
