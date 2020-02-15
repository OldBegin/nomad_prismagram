
import './env';
import { nouns, adjectives } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import jwt from 'jsonwebtoken';
import { prisma } from './../generated/prisma-client'
import { isAuthenticated } from './middlewares';

//////////////////////////////////////////////////////////////////////////////////////////////////
/// 랜덤문자 발생기 :  ()={ 형용사+명사 생성 }:return "형용사 명사"
//////////////////////////////////////////////////////////////////////////////////////////////////
export const generateSecret = () => {
  
  const min = 0;
  const max = nouns.length;
  const randNoun = Math.floor(Math.random() * ( nouns.length ));  // 최소값이 0 이므로 그냥 최대값만 넣어주면 됨.
  const randAdj = Math.floor(Math.random() * ( max - min )) + min ; // 최소값이 0 이기때문에 min 이 필요없지만 랜덤함수를 이해하기 위해 코딩함. 
  
  return `${adjectives[randAdj]} ${nouns[randNoun]}`;  
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/// Sendgrid 메일발송기 : (받을사람이메일, 랜덤문자발생기로 생성된 loginSecret 문자)=>{ 메일발송 }: 리턴없음
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
      console.log(' :::sendSecretMail::: fail to send mail::: ',err);
    }else{
      console.log(' :::sendSecretMail::: Mail sent ', info, emailOptins);
    }
  })
}

//////////////////////////////////////////////////////////////////////////////////////////////////
/// G-MAIL 로 메일 발송기 : (받을사람이메일, loginSecret)=>{ 메일발송 }: 리턴없음
//////////////////////////////////////////////////////////////////////////////////////////////////
export const sendGmail = (emailTo, secretWord) => {
  
  var gmailOptins = {
    from: 'ygyou.reg@me.com',
    to: emailTo,
    subject: 'this is test mail to me in develop environment',
    text: 'Hello im youngun',
    html: `hello! your login secret is <strong><u>${secretWord}</u></strong></br>Copy it and paste on the app to log in website`
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
    if( !error ){
      console.log(` :::sendMail::: Sent Mail was `, info, gmailOptins);
    }else{
      console.log(' :::sendMail::: Fail to send mail \n :::ERROR CODE IS:  ',error);
      throw Error(error);
    }
  })
}

//////////////////////  토큰생성기 TOKEN ENCODER jwt.sign 사용 /////////////////////////////////////////////////////
// 함수구조: jwt.sign( 사용자이메일, 암호화에 사용할 비밀문자, 토큰만료까지의 분 ):return 토큰문자열
////////////////////////////////////////////////////////////////////////////////////////////////////

export const generateToken = (id, email, secret, maxAge) => {
  const token = jwt.sign({ id, email }, secret, { expiresIn: maxAge });
  console.log(` :::generateToken::: Success issueing new token!::: \n {${token}} \n :::this token is valid in {${maxAge}}:::`);
  return token;
};



//////////////////////  토큰추출기 TOKEN DECODER jwt.verify 사용 /////////////////////////////////////////////////////
// - 함수구조: isAuthToken( 리졸버의 인자 request를 받음 ):return payload{exp,iat,email}
// - payload 객체를 리턴함{id, email, exp, iat}
// - 디비와 비교할 필요없음: 토큰을 SECRET key로 검증만 함.
// - 서버에 context로 등록해놓고 API 리졸버에서 직접 호출하여 사용함 
////////////////////////////////////////////////////////////////////////////////////////////////////

export const isAuthToken = (request) =>{
  const Authorization = request.get('Authorization');
  if(Authorization){
    const token = Authorization.replace('Bearer ','');
    const payload = jwt.verify(token, process.env.SECRET);
    //console.log('isAuthToken: Success to verify token:', request);
    console.log(' :::isAuthToken::: Success to verify token >>\n',JSON.stringify(payload));
    return payload;
  }else{
    throw new Error(' :::isAuthToken::: Not authenticated Token ');
  }
}

///////////////// loginSecret 인증 /////////////////////////////////////////////////////////////
/// - 이메일로 발송한 비밀문자를 확인하기 위해 사용함:
/// - 이메일로 발송시 발송내역을 db에도 저장하므로, 넘어온 인자값과 디비값을 비교하여 있을경우 return true
////////////////////////////////////////////////////////////////////////////////////////////////
export const isAuthorizedEmail = async (email, loginSecret) =>{
  try{
    const user = await prisma.userWaitSignUp({email});
    if(user.email && user.loginSecret === loginSecret){  //임시테이블에 사용자가존재하고 로그인시크릿이 동일하면 트루
      console.log(` :::isAuthorizedEmail::: Success to authorize loginSecret! `)
      return true;
    }else{
      throw Error(" :::isAuthorizedEmail::: LoginSecret has been no confirmed ")
    }
  }catch(error){
    throw Error(" :::isAuthorizedEmail::: Error occured confirming loginSecret ");
  }
}

///////////////// 사용자 및 이메일 중복여부 확인 /////////////////////////////////////////////////////////////
/// - 사용자명, 이메일을 확인하여 중복이면 true, 중복이 아니면 false 반환
////////////////////////////////////////////////////////////////////////////////////////////////
export const isUserExist = async (email, userName) =>{
  try{
    const existCheck = await prisma.$exists.user({
      OR: [
        { email: email },
        { userName: userName }
      ]
    });
    return existCheck;
  }catch(error){
    throw Error(` :::isUserExist::: 사용자 중복확인에서 오류가 발생했습니다. \n :::오류코드:${error}::: `)
  }
}
