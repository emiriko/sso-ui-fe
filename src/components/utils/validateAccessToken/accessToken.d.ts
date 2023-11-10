interface ParseJwtInterface {
  exp: number;
  iat: number;
  user: string;
  sub: string;
}

interface AccessTokenInterface {
  accessToken: string;
  user: User;
}
