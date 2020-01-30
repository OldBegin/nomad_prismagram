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
//yarn global add babel-cli -D  //최신 코드를 사용할수 있게 함.
```
  
### package.json 에 아래 항목 추가(커맨드창에 nodemon 명령어를 입력하면 해당 파일일 실행됨)  
  
 ```js
 "scripts":{  
    "dev": "nodemon --exec babel-node src/server.js" //nodemon 실행시 src/server.js을 실행하도록 하기위함.  
  }  

 // nodemon.json파일을 새로 만들어서 아래와 같이 입력  
{  
    "ext":"js graphql" //nodemon이 감시해야할 파일의 확장자들을 지정할 수 있음. 현재 .js 와 .grqphql 확장자를 가진 파일을 감시하도록 지정한것임  
{
```
  
```js
yarn dev  //dev 모드로 시작
```  

## 1-1강 GraphQL Server 생성  

### 의존성 라이브러리

- 자바스크립트는 빠른속도로 문법이 개선되어왔고 현재도 계속 변경되고 있음
- 하지만 브라우저별로, 운영체제별로 지원하는 자바스크립트 코드버젼이 다름
- babel은 내가사용하는 최신코드로 코딩하면, 각 운영체제나 브라우저에 맞는 버전의 문법으로 번역해주는 모듈이다.  

```JS
yarn add dotenv //.env 를 읽는 모듈임  
yarn add @babel/cli
yarn add @babel/core
yarn add @babel/node
yarn add @babel/preset-env

```

- **src/.env 파일 생성:** .env 파일은 포트나 기타 환경값을 저장하기 위함 현재는 아래와 같이 포트만 설정해 둔다.  

```js
PORT=4000
```  

- **.babelrc 파일 생성:** 루트에 파일을 생성 하고 아래와 같이 현재 최신의 바벨프리셋을 설정해준다.  

```json
{
    "presets": ["@babel/preset-env"]
}
```  

## 1-2강  프리즈마 디비서버 연동전에 graphql api 설치 및 기본 구조 코딩  

- 우선 웹서버: server.js 를 만들어 구동시켜서
- api 폴더밑에 **query파일들:.js** 와 **스키마파일들:.graphql** 을 묶어서 같은폴더에 정리해놓고
- schema.js 파일을 만들어서 이들을 fileLoader로 불러와서 makeExecutableSchema 로 병합하여 export한다.
- 그러면 웹서버:server.js에서 이를 임포트한 후 **미들웨어:const server = new GraphQLServer({ schema });** 로 schema의 인스턴스를 생성하여 api폴더내의 모든 쿼리와 스키마파일에 접근할 수 있다.  

### 1-2-1 의존성 라이브러리

```js
yarn add graphql-tools
yarn add merge-graphql-schemas
```

### Query파일 및 스키마 파일 생성

- api/ 폴더밑에 쿼리와 타입(스키마) 설정을 위한 폴더구조 세팅
- api/Greeting/sayHello 폴더를 생성하여 그 밑에  쿼리를 담을 파일:sayHello.js 와 스키마를 담을 파일: sayHello.graphql 을 생성한다.
- api/Greeting/sayGoodbye 폴더를 생성하여 그 밑에  쿼리를 담을 파일:sayGoodbye.js 와 스키마를 담을 파일: sayGoodbye.graphql 을 생성한다.  
- 쿼리와 스키마를 병합할 파일: shema.js 생성하여 fileLoader를 이용하여 api폴더내의 모든 .query와 .graphql 을 불러와서 makeExecutableSchema를 이용하여 병합한 후 export한다.
- **서버파일:server.js** 를 생성하여 웹서버를 구성하고 미들웨어에서 schema를 생성한다./ 이제 웹에서 graphql 데이터베이스 api에 접근할수 있다.
- 브라우저에서 localhost:4000 으로 접속하여 sayHello.js/sayGoodbye 파일의 쿼리를 실행시켜서 제대로 동작하는지 확인해본다.  

## 2강 prisma 데이터베이스 회원가입 및 세팅

- 회원가입한다: github 계정으로 로그인 가능하다
- 서비스추가: add service클릭
- prisma 라이브러리 설치: npm install -g prisma 또는 yarn global add prisma
- 로그인: Log into Prisma CLI 의 명령어코드를 복사하여 명령창에서 실행하면 로그인 된다.(추후 git clone으로 프로젝트 생성시는 prisma generate 명령을 실행하면 generated 폴더가 생성된다.-따로 로그인하지 않아도됨)
- DB모델을 프로젝트에 생성: create new service 클릭후 명령창에 prisma init 실행
  - 이때 기존 DB를 사용할지 새로 만들지 선택할수 있음 우선은 demo + mysql 선택하여 진행
  - region: eu 또는 us 선택
  - service name: 그냥 엔터 - nomad_prismagram
  - stage name: 그냥엔터 - dev
  - programming language: javascript client  
  
- .gitignore 에 geterated 폴더 추가
- 명령창에 prisma deploy 를 실행하면 프로젝트에 생성된 DB모델이 prisma 디비서버에 자동으로 업로드됨

### 2-1 의존성 라이브러리

```js
npm install -g prisma //prisma api 라이브러리 설치

```
