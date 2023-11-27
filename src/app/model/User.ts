export interface AuthState{
  authenticated : boolean,
  username : string,
  roles : Array<string>,
  access_token : string,
  refresh_token : string
}
