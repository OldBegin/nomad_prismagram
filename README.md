# nomad_prismagram

Express + Nodejs + Prisma + React + ReactNative  를 이용한 인스타그램클론

## 1강 프로젝트 환경설정 및 graphql 환경설정

### 1-1 프로젝트 환경설정

```js
git clone ..... //으로 생성

```

### 1-2 의존성 라이브러리 설치  

```js
yarn init
yarn add graphql-yoga // graphql 라이브러리
yarn add nodemon -D  // src/server.js 에 있는 코드를 실행하는 스크립트를 작성하는데 필요함. -D 는 개발자모드로 설치함/ 배포시에는 포함안됨
yarn global add babel-cli -D  //최신 코드를 사용할수 있게 함.
  
// 자바스크립트는 빠른속도로 문법이 개선되어왔고 현재도 계속 변경되고 있음
// 하지만 브라우저별로, 운영체제별로 지원하는 자바스크립트 코드버젼이 다름
// babel은 내가사용하는 최신코드로 코딩하면, 각 운영체제나 브라우저에 맞는 버전의 문법으로 번역해주는 모듈이다.  
yarn add @babel/cli
yarn add @babel/core
yarn add @babel/node
yarn add @babel/preset-env

// graphql 서버구성을 위한 모듈설치
yarn add dotenv //.env 파일에 따로 환경변수를 저장할 수 있음.
yarn add graphql-tools //graphql의 스키마를 서버에 올리기 위한 툴  makeExecutableSchema을 사용하기 위함
yarn add merge-graphql-schemas  // src/api/ 폴더아래 쌍으로 만들어놓은 schema 와 resolver 들을 불러와서 병합하기위한 툴
```  

### 환경설정파일 생성 및 세팅

- package.json 에 scripts 추가

```js
 "scripts":{  
    "dev": "nodemon --exec babel-node src/server.js" //yarn dev 명령으로 nodemon 명령어 실행스크립트 추가
  }  
```  

- **nodemon.json 파일 생성**: 노드몬이 감시할 파일 지정

```js
{  
    "ext":"js graphql" //nodemon이 감시해야할 파일의 확장자들을 지정할 수 있음. 현재 js 와 grqphql 확장자를 가진 파일을 감시하도록 지정한것임
{
```

- **.env 파일 생성**: src 폴더 아래 생성
- .env 파일은 포트나 기타 환경값을 저장하기 위함 현재는 아래와 같이 포트만 설정해 둔다.  

```js
//src/.env
PORT=4000
```  

- **.babelrc 파일 생성:**  
- 루트에 파일을 생성 하고 아래와 같이 현재 최신의 바벨프리셋을 설정해준다.  

```json

{
    "presets": ["@babel/preset-env"]
}
```  

### Graphql 서버 세팅

- api/ 폴더밑에 쿼리와 타입(스키마) 설정을 위한 폴더구조 세팅
- api/Greeting/sayHello 폴더를 생성하여 그 밑에  쿼리를 담을 파일:sayHello.js 와 스키마를 담을 파일: sayHello.graphql 을 생성한다.
- api/Greeting/sayGoodbye 폴더를 생성하여 그 밑에  쿼리를 담을 파일:sayGoodbye.js 와 스키마를 담을 파일: sayGoodbye.graphql 을 생성한다.  
- 쿼리와 스키마를 병합할 파일: shema.js 생성하여 fileLoader를 이용하여 api폴더내의 모든 .query와 .graphql 을 불러와서 makeExecutableSchema를 이용하여 병합한 후 export한다.
- **서버파일:server.js** 를 생성하여 웹서버를 구성하고 미들웨어에서 schema를 생성한다./ 이제 웹에서 graphql 데이터베이스 api에 접근할수 있다.
- 브라우저에서 localhost:4000 으로 접속하여 sayHello.js/sayGoodbye 파일의 쿼리를 실행시켜서 제대로 동작하는지 확인해본다.  
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## 2강 prisma 데이터베이스 세팅

### 의존성 라이브러리(2강)

```js
npm install -g prisma //prisma api 라이브러리 설치
yarn add crypto-js // 토큰생성을 위한 해싱 라이브러리
yarn add jsonwebtoken // 토큰생성 및 확인을 위한 라이브러리

// scripts 에 명령 추가
  "scripts": {
    "deploy": "prisma deploy", // prisma client -> server 동기화
    "generate": "prisma generate", // prisma server -> client 동기화
    "prisma": "prisma deploy && prisma generate", // yarn prisma 명령으로 위의 두 명령을 동시에 실행
    "dev": "nodemon --exec babel-node src/server.js" // yarn dev 명령으로 nodemon 실행
  }

```
  
### 프리즈마서버 회원가입 세팅순서

- 회원가입한다: github 계정으로 로그인 가능하다
- 서비스추가: add service클릭
- prisma 라이브러리 설치: npm install -g prisma 또는 yarn global add prisma
- 로그인: Log into Prisma CLI 의 명령어코드를 복사하여 명령창에서 실행하면 로그인 된다.
  **(추후 git clone으로 프로젝트 생성시는 prisma generate 명령을 실행하면 prisma 사이트 로그인창이 뜨고 로그인하면 프로젝트 폴더에 generated 폴더가 생성됨**
- DB모델을 프로젝트에 생성: 사이트에서 create new service 클릭후 명령창에 prisma init 실행
  - 이때 기존 DB를 사용할지 새로 만들지 선택할수 있음 우선은 demo + mysql 선택하여 진행
  - region: eu 또는 us 선택
  - service name: 그냥 엔터 - nomad_prismagram
  - stage name: 그냥엔터 - dev
  - programming language: javascript client  
  
- .gitignore 에 geterated 폴더 추가
- 명령창에 prisma deploy 를 실행하면 프로젝트에 생성된 DB모델이 prisma 디비서버에 자동으로 업로드됨
- 명령창에 prisma generate 를 실행하면 서버의 변경내용이 프로젝트에 동기화됨(처음실행시에는 generate 디렉토리가 생성됨)
  
### 프리즈마의 데이터 모델 작성  

```graphql
# prisma generate 명령을 최초에 실행하면 루트에 각각 generage 디렉터리와 datamodel.prisma 파일이 생성된다.
# datamodel.prisma: 생성된 프리즈마 데이터모델 에 스키마를 정의한다.
type User {
  id: ID! @id
  userName: String! @unique
  email: String! @unique
  firstName: String! @default(value: "")
  lastName: String
  bio: String
  followers: [User!]! @relation(name: "FollowRelation")
  following: [User!]! @relation(name: "FollowRelation")
  Posts: [Post!]!
  likes: [Like!]!
  comments: [Comment!]!
  rooms: [Room!]!
  loginSecret: String!
}

...
```

### GraphQL의 데이터 모델 작성  

```graphql
# 1. models.graphql 파일 생성: src/api/ 디렉터리 아래 생성
# 2. 프리즈마의 데이터 모델을 복사하여 붙여넣는다
# 3. graphql문법에 맞지 않는 @unique 같은 것들을 삭제한다.
# -  프리즈마의 데이터모델이 변경되면 이 파일도 수동으로 일일이 고쳐줘야함. 나중에 자동으로 변경되는 라이브러리 같은게 나왔으면 함.

type User {
  id: ID!
  userName: String!
  email: String!
  firstName: String!
  lastName: String
  bio: String
  followers: [User!]!
  following: [User!]!
  Posts: [Post!]!
  likes: [Like!]!
  comments: [Comment!]!
  rooms: [Room!]!
  loginSecret: String!
}

type Post {
  id: ID!
  user: User!
  location: String
  caption: String!
  files: [File!]!
  likes: [Like!]!
  comments: [Comment!]!
}

...
```
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
## 3강 GraphQL API

```js
yarn add crypto-js // 토큰생성을 위한 해싱 라이브러리
yarn add jsonwebtoken // 토큰생성 및 확인을 위한 라이브러리
yarn add password  // 토큰에서 사용자 정보를 추출하기 위함.
yarn add bcryptjs // 비밀번호를 해싱하여 저장하기 위함.

```

### USER STORIES : 구현할 기능  

- [x] Log in
- [x] Request Secret
- [x] Confirm Secret (Login)
- [x] Like/ Unlike  a photo
- [x] comment on a photo
- [x] Search by user
- [x] Search by location
- [x] Follow User
- [x] Unfollow User
- [x] Edit my profile
- [x] See user profile
- [x] See the full post
- [ ] Create account
- [ ] Upload a photo
- [ ] Edit the photo (Delete)
- [ ] See the feed
  
### 랜덤단어를 이용하여 로그인 구현

- **words.js 파일생성:** 명사 50단어, 형용사 50단어를 각각 리스트로 만들어서 export
- **utils.js 파일생성:** 형용사 + 명사 랜덤으로 리턴하는 함수 generateSecret 생성

```js
import { nouns, adjectives } from './words'; // 명사, 형용사를 각 50개씩 가지고 있는 배열

export const generateSecret = () => {
  const min = 0;
  const max = nouns.length;
  const randNoun = Math.floor(Math.random() * ( nouns.length ));  // 최소값이 0 이므로 그냥 최대값만 넣어주면 됨.
  const randAdj = Math.floor(Math.random() * ( max - min )) + min ; // 최소값이 0 이기때문에 min 이 필요없지만 랜덤함수를 이해하기 위해 코딩함. 

  return `${adjectives[randAdj]} ${nouns[randNoun]}`;  
}
```

### sendgrid 메일발송 모듈(#3-3)

```js
//util.js
export const sendSecretMail = (emailTo, secretWord) => {
  
  var emailOptins = {
    from: 'ygyou.reg@me.com',
    to: emailTo,
    subject: 'send mail test',
    text: 'Hello im youngun',
    html: `hello! your login secret it ${secretWord}.</br>Copy paste on the app to log in website`
  };

  const SenderOptions = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };

  const client = nodemailer.createTransport(sgTransport(SenderOptions));


  client.sendMail(emailOptins, (err, info)=>{   //메일 발송
    if( err ){
      console.log('fail to send mail: ',err);
    }else{
      console.log('Mail sent:', info, emailOptins);
    }
  })
}

```

### 지메일 발송 모듈 sendGmail 구현

```js
//util.js
// 우선 gmail설정중 아래 두곳의 엑세스를 허용해주어야 함.
// https://myaccount.google.com/lesssecureapps
// https://accounts.google.com/DisplayUnlockCaptcha
export const sendGmail = (emailTo, secretWord) => {
  
  var gmailOptins = {
    from: 'ygyou.reg@me.com',
    to: emailTo,
    subject: 'this is test mail to me in develop environment',
    text: 'Hello im youngun',
    html: `hello! your login secret it ${secretWord}.</br>Copy paste on the app to log in website`
  };

  var senderOptions = {
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASSWORD
    }
  }

  const transporter = nodemailer.createTransport(senderOptions)

  transporter.sendMail(gmailOptins, ( error, info ) => {
    if( error ){
      console.log('fail to send mail: ',error);
    }else{
      console.log('Mail sent:', info, gmailOptins);
    }
  })
}

```

### 유저인증 API: confirmSecret 구현중
  
- api resolver 구현중...
- token 생성기 완성:
  - 내가만든 심플토큰생성기: generateTokenMyself
  - jsonwebtoken 라이브러리 토큰생성기: generateToken
- token 추출기 구현중: passport-jwt모듈 사용
  - 토큰추출하여 추출된값을 클라이언트 요청값에 붙여서 받는 테스트중.....

### 유저인증기능 다른형태로 구현

- passport가 아닌 jwt만으로 토큰생성과 추출을 한다.
- 회원가입: 이메일을 입력하면, 시크릿문자가 포함된 메일을 발송하고 사용자는 시크릿문자를 복사해서 입력하면 회원가입이 승인되며, 토큰을 발행한다.
- 로그인: 이메일, 비밀번호를 입력받아 인증되면 token을 발행한다.

```js
///// 토큰을 시크릿키로 검증 및 추출하여 만기확인 /////
export const isAuthToken = (request) =>{
  const Authorization = request.get('Authorization');
  if(Authorization){
    const token = Authorization.replace('Bearer ','');
    const payload = jwt.verify(token, process.env.SECRET);
    console.log(`isAuthToken: Success to verify token:${JSON.stringify(payload)}`);
  }else{
    throw new Error('Not authenticated');
  }
}
```

- passport.js 간소화
- API-toggleLike 리졸버 구현완료
- API-signUp 기능추가: 회원가입시 email, userName 중복확인기능 추가:
- API-addComment 생성: 포스트에 코멘트하기
- API-searchUser 추가: 단어로 유저찾기
- API-follow:팔로잉
- API-unfollow: 언팔로잉


## 데이터베이스 리펙토링

- prisma 서버를 로컬 도커로 옮김
- mysql 서버를 aws lightsail 로 옮김(도커아님)
- Aws Mysql 정보
  - 환경설정파일위치: /etc/mysql/mysql.conf.d/mysqld.cnf
  - 사용자계정: root, youngun
  - 데이터베이스명: prisma - 프리즈마가 자동 생성함


  - 참조: prisma2 사용시 로그인스트링: 
  datasource db {
      provider = "mysql"
      url      = "mysql://youngun:비밀번호@13.209.213.17:3306/mysql"


## API 추가

- API-editUser: 유저정보 수정
- API-seeUser: 유저정보 보기
- API-seeMe: 자기정보 보기

## 커스텀 fragment 생성

- commentFragment: 데이터베이스를 더 깊게 검색하기위해 사용

## 자동생성 정보 코딩

- 기존에 등록된 데이터를 조합해서 새로운 데이터를 만들어낸다.
- 예) 디비에 등록된 이름, 성 을 조합하여 풀네임을 만드는 리졸버와 스키마를 생성

### 자동정보생성 스키마 리스트

- User 스키마: fullName - 풀네임 필드
- User 스키마: amIFollowing - 자기가 팔로우중인 유저인지 확인하는 필드
- User 스키마: itsMe - 자기자신인지 확인하는 필드

- Post 스키마: isLiked - 내가 좋아요한 포스트인지 확인하는 필드