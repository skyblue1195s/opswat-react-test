import { createSlice } from "@reduxjs/toolkit";
import { IArticleReducer } from "@interfaces/Article";
import { articleService } from "@services/Articles";
const initialState = {
  loading: false,
  articles: [],
  articleDetails: {},
  pagination: {},
};

const articleSlice = createSlice({
  name: "articleReducers",
  initialState: initialState as IArticleReducer,
  extraReducers(builder) {
    builder
      .addCase(articleService.getListArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(articleService.getListArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.data ? action.payload.data : [];
      })
      .addCase(articleService.getListArticles.rejected, (state) => {
        state.loading = false;
      })
      .addCase(articleService.getArticleDetails.pending, (state) => {
        state.loading = true;
        state.articleDetails = {}
      })
      .addCase(articleService.getArticleDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.articleDetails = action.payload.data ? action.payload.data : [];
      })
      .addCase(articleService.getArticleDetails.rejected, (state) => {
        state.loading = false;
        state.articleDetails = {}
      })
  },
  reducers: {
    clearArticleDetail: (state) => {
      state.articleDetails = {};
    },
  },
});
export const { clearArticleDetail } = articleSlice.actions;
export default articleSlice.reducer;
