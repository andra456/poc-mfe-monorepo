gr="\e[32m";
grn="\e[0m";

BLUE='\033[0;34m'
WHITE='\033[0;37m' 
RED='\033[0;31m' 
#
standard="Standard";
customizeOnPrem="CustomOnpremise";
customizeSass="CustomSass";

createCloneClient(){
case $1 in

  "$standard")
   ssh_git="git@gitlab.com:micro-fe-project/containers.git";
   https_git="https://gitlab.com/micro-fe-project/containers.git";
    ;;

  "$customizeOnPrem")
    ssh_git="git@gitlab.com:micro-fe-project/container.git";
   https_git="https://gitlab.com/micro-fe-project/container.git";
    ;;

  "$customizeOnPrem")
    ssh_git="git@gitlab.com:micro-fe-project/container.git";
    https_git="https://gitlab.com/micro-fe-project/container.git";
    ;;

  *)
    exit 0 "error command"
    ;;
esac

path=$2;



if [ ! -d /$path ]; then
    # catch submodule
    echo  $(printf "$gr"⍁" Choose method ? $grn");
    items=("Clone with SSH" "Clone with HTTPS")
    select item in "${items[@]}"
    do
        case $REPLY in
            1) echo  🚀$(printf "$gr $item $grn ${BLUE}running.. $grn"); gitmodule=$ssh_git; break;;
            2) echo  🚀$(printf "$gr $item $grn ${BLUE}running.. $grn"); gitmodule=$https_git; break;;
          
            $((${#items[@]}+1))) echo "We're done!"; break 2;;
            *) echo "Ooops - unknown choice $REPLY"; break;
        esac
    done
    # echo $path $item
    git submodule add ${gitmodule} ${path}
    git submodule update --remote
    echo $(printf "\e[32m√ \e[0m Done success clone");
fi
# CONTAINER ALREADY INSTALED
[ -d $path ] && echo $(printf  "👾$RED [FAILED] CONTAINER ALREADY INSTALED \e[0m ");
}

createInitContainer(){
echo $(printf "\033[1;33mCloning container submodule apps");
echo "----------------------------------"
echo  $(printf "$gr"⍁" Choose container you will install $grn");


PS3="➜ Select : ";
items=("$standard" "$customizeOnPrem" "$customizeSass")
    select item in "${items[@]}"
    do
        case $REPLY in
            1) echo  $(printf  "\e[32m√ \e[0m Clone source \e[32m$item\e[0m  container"); break;;
            2) echo  $(printf  "\e[32m√ \e[0m Clone source \e[32m$item\e[0m  container"); break;;
            3) echo  $(printf  "\e[32m√ \e[0m Clone source \e[32m$item\e[0m  container"); break;;
            $((${#items[@]}+1))) echo "We're done!"; break 2;;
            *) echo "Ooops - unknown choice $REPLY"; break;
        esac
    done
# hanling choose standard
if [[ "${item}" == "$standard" ]]; then 

createCloneClient $item apps/standard
fi
# hanling choose custon on premise
if [[ "${item}" == "$customizeOnPrem" ]]; then 

createCloneClient $item apps/custom-onprem
fi
# hanling choose custom sass
if [[ "${item}" == "$customizeSass" ]]; then 

createCloneClient $item apps/custom-sass
fi
exit 1;
}

createInitContainer