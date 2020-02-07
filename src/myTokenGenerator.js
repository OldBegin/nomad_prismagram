
import crypto from 'crypto';
import './env';

////////////////////// 토큰생성기 TOKEN ENCODER /////////////////////////////////////////////////////
// 토큰구조: HEADER(헤더).PAYLOAD(내용).SIGNATURE(서명)
////////////////////////////////////////////////////////////////////////////////////////////////////

export const generateMyToken = (tokenInfo, userInfo) => {

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

  const encodedHeader = base64Encode(headerClaim);                                      // header 를 base64로 인코딩
  const encodedPayload = base64Encode(payloadClaim);                                    // payload 를 base64로 인코딩
  const secret = process.env.SECRET;                                                // .env 에서 secret문자 가져옴
  const signature = signatureMaker(`${encodedHeader}.${encodedPayload}`, secret);   // header + payload 를 secret 문자로 sha256 해싱 

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;

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
const signatureMaker = (claim, secret) => {
  try {
    const signature = crypto.createHmac('sha256', secret)
      .update(claim)
      .digest('base64')
      .replace('=', '')
      .replace('/', '_')
      .replace('+', '-');

    return signature;

  } catch (err) {
    throw err
  }
}

////////// 내가만든 토큰생성기 테스트 코드 /////////////////////////////////////////////////
// const token = jwt.sign(
//   {
//     email: 'youngun.you@daum.net'
//   },
//   process.env.SECRET,
//   {
//     expiresIn: '5m'
//   }
// );
// const decodedToken = jwt.verify(token, process.env.SECRET);
//
// const tokenInfo = {
//   issuer: 'unitedin.kr',                  // 토큰발급자 (Issuer)
//   subject: 'loginToken',                  // 토큰제목   (Subject)
//   audience: 'youngun',                    // 토큰대상자
//   expTime: 2                              // 토큰유효시간: 2 시간
// }
// const userInfo = {
//   userName: 'youngun',
//   email: 'youngun.you@daum.net'
// }
// generateTokenMyself(tokenInfo, userInfo);
// /////////////////////////////////////////////////////////////////////////////