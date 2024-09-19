import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ForumInput from "../components/ForumInput";
import ForumList from "../components/ForumList";
import { asyncPopulateUsersAndForum } from "../states/shared/action";
import {
  asyncAddForum,
  asyncUpvoteForum,
  asyncDownvoteForum,
} from "../states/thread/action";

function HomePage() {
  const forums = useSelector((state) => state.forums);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncPopulateUsersAndForum());
  }, [dispatch]);

  const onAddForum = (title, body) => {
    dispatch(asyncAddForum({ title, body }));
  };

  const onUpvote = (id) => {
    dispatch(asyncUpvoteForum(id));
  };

  const onDownvote = (id) => {
    dispatch(asyncDownvoteForum(id));
  };

  const forumList = forums.map((forum) => ({
    ...forum,
    user: users.find((user) => user.id === forum.ownerId),
    authUser: authUser.id,
  }));

  return (
    <section className="home-page">
      <ForumInput addForum={onAddForum} />
      <ForumList comments={forumList} upVote={onUpvote} downVote={onDownvote} />
    </section>
  );
}

export default HomePage;
