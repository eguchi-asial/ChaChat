export default interface Chat {
  name?: string | null;
  type?: 'system' | 'chat' | 'image';
  body: string;
  // TODO postIdは必須。API連携して、WebSocketの処理が追記されたらrequiredに変える
  postId?: string | null;
  // TODO postedAtは必須。API連携して、WebSocketの処理が追記されたらrequiredに変える
  postedAt?: string;
}
