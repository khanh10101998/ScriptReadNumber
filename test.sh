cd e2e
while IFS= read -r f1; do
    path=${f1:2}
    numLine=1
    IFS=''
    while IFS= read -r a;
        do
                IFS=' ' read -r -a arrString <<< "$a"
                firstLine=${arrString[0]}
            if [ "$firstLine" == "it('LINE" -o "$firstLine" == 'it("LINE' ]; then
                numLineDelete=${arrString[1]}
                DE=$(sed "s/$numLineDelete/$numLine/g"<<<"${a}")
                echo $DE
            elif [ "$firstLine" == "//" ]; then
                echo $a
            else
            echo $a
            fi
    numLine=$((numLine+1))
done < <(grep "" $path) > $path.t ; mv $path{.t,}
done < <(find . -type f | sort -n)
