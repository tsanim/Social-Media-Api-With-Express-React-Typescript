import PostData from "./Feed/PostData.interface";

export default interface PostMethods {
  dislike: (postId: string) => void;
  like: (postId: string) => void;
  upload?: (data: PostData) => void;
  delPost?: (postId: string) => void;
}
