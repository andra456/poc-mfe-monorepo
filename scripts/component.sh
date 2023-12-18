
#! /usr/bin/env bash
function feature() {
standard="Standard";
customizeOnPrem="CustomOnpremise";
customizeSass="CustomSass";

echo "Create feature"
echo  $(printf "\e[32mName of your feature \e[0m")
read chunkName; 
echo  $(printf "\e[32mWhat your pathname e.g /preview-featue/:id \e[0m")
read pathName; 
echo  $(printf "\e[32mName folder feature \e[0m")
read componentUrl; 

echo  $(printf "\e[32mName folder feature \e[0m")
PS3="What layout you will make : "
itemsLayout=("blank" "sidebar")
    select layout in "${itemsLayout[@]}"
    do
        case $REPLY in
            1) echo  $(printf  "\e[32m ~ \e[0m create layout $layout "); break;;
            2) echo  $(printf  "\e[32m ~ \e[0m create layout $layout "); break;;
            $((${#itemsLayout[@]}+1))) echo "We're done!"; break 2;;
            *) echo "Ooops - unknown choice $REPLY"; break;
        esac
    done

echo  $(printf "\e[32mComponent is exact yes/no\e[0m")
read exactInput; 
if [[ "${exactInput}" == "yes" ]]; then  isExact=true 
else isExact=false 
fi
echo  $(printf "\e[32mNeed auth yes/no \e[0m")
read n_auth
if [[ "${n_auth}" == "yes" ]]; then auth=true 
else auth=false 
fi
echo  $(printf "\e[32mChoose type feature \e[0m")
PS3="What you want to make: "
items=("$standard" "$customizeOnPrem" "$customizeSass")
    select item in "${items[@]}"
    do
        case $REPLY in
            1) echo  $(printf  "\e[32m ~ \e[0m $REPLY create feature for $item "); break;;
            2) echo  $(printf  "\e[32m ~ \e[0m $REPLY create feature for $item "); break;;
            3) echo  $(printf  "\e[32m ~ \e[0m $REPLY create feature for $item "); break;;
            $((${#items[@]}+1))) echo "We're done!"; break 2;;
            *) echo "Ooops - unknown choice $REPLY"; break;
        esac
    done
# buat fuction execute submodule

if [[ "${item}" == "$customizeOnPrem" ]]; then
echo  $(printf "\e[32mName name of your client with clientId \e[0m");
read clientId; 
fi

if [[ "${item}" == "$customizeSass" ]]; then
echo  $(printf "\e[32mName name of your client with clientId \e[0m");
read clientId; 
fi

# execute code dibuat function

#function create json config
function createJSON() {
  if [ $# -ne 1 ]; then
    echo "Error: Exactly 2 arguments required!"
    return 1
  fi

filePath=$1;
tmpSource="${filePath}.tmp";
echo $1

jq \
 --arg chunkName "$chunkName" \
 --arg path "$pathName" \
 --arg layout "$layout" \
 --arg component "$componentUrl" \
 --arg isExact $isExact \
 --arg isAuth $auth \
 '.pages += [{ 
    $chunkName, 
    $path, 
    $component, 
    $layout, 
    "isExact": $isExact | test("true"), 
    "auth": $isAuth | test("true") 
    }]' $filePath > $tmpSource && mv $tmpSource $filePath
}

# create feature & submodule
# how to use 'createSubmodule $path $clientId $submodule $componentPath'
createSubmodule(){
path=$1;
id=$2;
componentPath=$3;

if [ $# -ne 3 ]; then
    echo "Error: Exactly 2 arguments required!"
    return 1
fi

if [ [ "$module" == ""] ]; then
    echo "Error: submodule is required required!";
    exit 1;
    return 1
fi

if [[ -n "$id" ]]; then 
if [ ! -d ${path}/${id} ]; then
    # catch submodule
    echo "url git submodule ?"
    read gitmodule
    git submodule add "${gitmodule}" ${path}/${id}
    git submodule update --remote
fi
    # copy files into folder client
    cp -i -v templates/feature/*  ${path}/${id}/${componentPath}
else 
# exit programs if clientId not found
    echo "The file does not exist"
    exit 1
fi
}


 

if [[ "${item}" == "$customizeOnPrem" ]]; then 

# create folder submodule
featureOnpremPath='apps/feature-custom-onprem/src/souce/customize';
createSubmodule $featureOnpremPath $clientId $componentUrl;
# create list config 
createJSON $filePath "config/features/onpremise.json";


fi
# ======================================
if [[ "${item}" == "$customizeSass" ]]; then 

# create folder submodule
featureSassPath='apps/apps/feature-custom-sass/src/source/customize';
createSubmodule $featureSassPath $clientId $componentUrl;
# create list config standard
createJSON "config/features/sass.json";

fi
# end create folder standard feature
if [[ "${item}" == "$standard" ]]; then 
# create list config standard
createJSON "config/features/standard.json";
if [ ! -d apps/feature/src/main/standard/${componentUrl} ]; then
    # create folder standard
    mkdir  apps/feature/src/main/standard/${componentUrl}
fi
    cp -i -v templates/feature/*   apps/feature/src/main/standard/${componentUrl}
fi
echo "🥩 Well done component success to create"
exit 0
}


feature

