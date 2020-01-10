# nomad_prismagram
Express + Nodejs + Prisma + React + ReactNative  를 이용한 인스타그램클론

## 1강 프로젝트 세팅

### 프로젝트 생성
```js
git clone ..... //으로 생성

```

### 의존성 라이브러리 설치  
```js
yarn init
yarn add graphql-yoga
yarn add nodemon -D // src/server.js 에 있는 코드를 실행하는 스크립트를 작성하는데 필요함. -D 는 개발자모드로 설치함/ 배포시에는 포함안됨
yarn global add babel-cli -D  //최신 코드를 사용할수 있게 함.
```
  
### package.json 에 아래 항목 추가(커맨드창에 nodemon 명령어를 입력하면 해당 파일일 실행됨)  
 
 "scripts":{
    "dev": "nodemon --exec babel-node src/server.js" //nodemon 실행시 src/server.js을 실행하도록 하기위함.
  }

 // nodemon.json파일을 새로 만들어서 아래와 같이 입력 
{
    "ext":"js graphql" //nodemon이 감시해야할 파일의 확장자들을 지정할 수 있음. 현재 .js 와 .grqphql 확장자를 가진 파일을 감시하도록 지정한것임
{

 
```js
yarn dev  //dev 모드로 시작
```  

## 1-1강 GraphQL Server 생성  

