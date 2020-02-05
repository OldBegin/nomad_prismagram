import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env')});  // 현재경로의 .env 파일에서 변수들을 로드: path사용시 path.resolve 를 사용해도 됨