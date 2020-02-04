// 랜덤함수의 사용의 예
// Math.random() // 0이상 1미만의 난수발생: 0~ 0.99999...
// Math.floor(Double) // 소숫점아래 버림 10.9898 -> 10
// Math.ceil(Double) //소숫점에서 올림: 10.1212 -> 11
// Math.floor(Math.random() * ( 50 - 10 )) + 10 //최소값만 포함: 10 부터 49 까지 생성됨
// Math.floor(Math.random() * ( 50 - 10 + 1)) + 10 //최소값 최대값 모두 포함: 10 부터 50 까지 생성됨

import { nouns, adjectives } from './words';
import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid-transport';
import dotenv from "dotenv";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

dotenv.config();

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
      console.log('fail to send mail: ',err);
    }else{
      console.log('Mail sent:', info, emailOptins);
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
    if( error ){
      console.log('fail to send mail: ',error);
    }else{
      console.log('Mail sent:', info, gmailOptins);
    }
  })
}

////////////////////// 토큰생성기 TOKEN ENCODER /////////////////////////////////////////////////////
// 토큰구조: HEADER(헤더).PAYLOAD(내용).SIGNATURE(서명)
////////////////////////////////////////////////////////////////////////////////////////////////////

export const createMyToken = (tokenInfo, userInfo) => {

    const { issuer, subject, audience, expTime } = tokenInfo;
    const { userName, email } = userInfo;

    const issuedTime = new Date().getTime();

    const headerClaim = {         
      "typ": "JWT",                                     // 토큰의 타입: JWT
      "alg": "HS256"                                    // 해싱알고리즘: HMAC SHA256
    }

    const payloadClaim = {
      "iss": issuer,                                    // 토큰발급자 (Issuer)
      "sub": subject,                                   // 토큰제목   (Subject)
      "aud": audience,                                  // 토큰대상자 (Audience)
      "nbf": issuedTime,                                // 토큰 활성된 시간(Not Before)                            
      "lat": issuedTime,                                // 토큰이 발급된 시간(Issued At)
      "exp": issuedTime + (expTime * 60 * 60 * 1000),   // 토큰만료시간 (Expire)
      "https://unitedin.kr": true,
      "userName": userName,
      "email": email                              
    }
  //console.log(payloadClaim.exp);
    const encodedHeader = base64Encode(headerClaim);                                      // header 를 base64로 인코딩
    const encodedPayload = base64Encode(payloadClaim);                                    // payload 를 base64로 인코딩
    const secret = process.env.SECRET;                                                // .env 에서 secret문자 가져옴
    const signature = signatureMaker(`${encodedHeader}.${encodedPayload}`, secret);   // header + payload 를 secret 문자로 sha256 해싱 

    const token = `${encodedHeader}.${encodedPayload}.${signature}`;
    
    //console.log('TOKEN: ',token);

   return token;
}
///////////////// BASE64 인코딩 ///////////////////////////////
const base64Encode = (claimObject) => {
  try {
    const encodedObject = new Buffer
      .from(JSON.stringify(claimObject))
      .toString('base64')
      .replace('=', '')
      .replace('/', '_')
      .replace('+', '-');

    return encodedObject;

  } catch (err) {
    throw err;
  }
}
/////////////// SHA256으로 해싱 ///////////////////////////////
const signatureMaker = (claim, secret) =>{
  try{
    const signature = crypto.createHmac('sha256', secret)
      .update(claim)
      .digest('base64')
      .replace('=', '')
      .replace('/', '_')
      .replace('+', '-');

      return signature;

  }catch(err){
    throw err
  }
}
///////// END OF TOKEN ENCODER /////////////////////////////////////////////////////////////////////////////////

export const createToken = (email, secret, maxAge) => {
  return jwt.sign({ email: email }, secret, { expiresIn: maxAge });
}