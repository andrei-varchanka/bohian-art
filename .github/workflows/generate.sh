
# service="UnderwritingService"

# echo Version $1

mkdir -p ./service

# curl https://staging.api.mqube.com/swagger/docs/v1/$service > ./spec.json

#apt-get update -y && apt-get upgrade -y
if java -version 2>&1 >/dev/null | egrep -q "\S+\s+version" ; then
	echo "Java installed."
else
	apt-get install default-jdk -y
fi

npm install @openapitools/openapi-generator-cli -g

npm i npx

npx openapi-generator generate -i ./petstore.yaml -g typescript-angular -o service --additional-properties=fileNaming=camelCase --enable-post-process-file

sed -i 's/0.0.0/'$1'/g' ./package.json

cp ./package.json ./service/package.json
cp ./tsconfig.json ./service/tsconfig.json

cd service

npm install --save rxjs
npm install --save zone.js@0.9.1
npm install --save @angular/core@8.2.14
npm install --save @angular/common@8.2.14

npm install -g @angular/compiler-cli@8.2.14 @angular/platform-server@8.2.14 @angular/compiler@8.2.14

ngc

cd ..

cp ./.npmrc ./dist/.npmrc
cp ./package.json ./dist/package.json

cd dist

npm publish

