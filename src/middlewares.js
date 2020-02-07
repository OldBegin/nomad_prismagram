// 인증된 유저만 API에 접근할수 있게 하기위한 미들웨어
export const isAuthenticated = request =>{
    //console.log('request.user::::',request.user);
    if(!request.user){
        throw Error('You need to log in to perform this action');
    }
    return;
};