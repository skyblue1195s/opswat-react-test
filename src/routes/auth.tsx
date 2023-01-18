import ListArticles from "@pages/Articles";
import ListUsers from "@pages/ListUsers";
import Profile from "@pages/Profile";

export const auth = [
  { path: "/profile", component: <Profile /> },
  { path: "/list-users", component: <ListUsers /> },
  { path: "/list-articles", component: <ListArticles /> },
];
