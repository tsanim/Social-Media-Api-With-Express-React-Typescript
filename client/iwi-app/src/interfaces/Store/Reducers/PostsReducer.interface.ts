import * as Immutable from "immutable";
import Post from "../../Feed/Post.interface";

export default interface PostsReducer extends Immutable.Map<string, any> {
    foundPosts: Immutable.List<Post[]>;
    posts: Immutable.List<Post[]>;
}