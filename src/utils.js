// 랜덤함수의 사용의 예
// Math.random() // 0이상 1미만의 난수발생: 0~ 0.99999...
// Math.floor(Double) // 소숫점아래 버림 10.9898 -> 10
// Math.ceil(Double) //소숫점에서 올림: 10.1212 -> 11
// Math.floor(Math.random() * ( 50 - 10 )) + 10 //최소값만 포함: 10 부터 49 까지 생성됨
// Math.floor(Math.random() * ( 50 - 10 + 1)) + 10 //최소값 최대값 모두 포함: 10 부터 50 까지 생성됨

import { nouns, adjectives } from './words';

export const generateSecret = () => {

  const min = 0;
  const max = nouns.length;
  const randNoun = Math.floor(Math.random() * ( nouns.length ));  // 최소값이 0 이므로 그냥 최대값만 넣어주면 됨.
  const randAdj = Math.floor(Math.random() * ( max - min )) + min ; // 최소값이 0 이기때문에 min 이 필요없지만 랜덤함수를 이해하기 위해 코딩함. 

  return `${adjectives[randAdj]} ${nouns[randNoun]}`;  
}
