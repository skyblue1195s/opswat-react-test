import { http } from "@helper/config";
import { IArticle } from "@interfaces/Article";
import { createAsyncThunk } from "@reduxjs/toolkit";

const getListArticles = createAsyncThunk(
  "user/getListArticles",
  async (query: string, { rejectWithValue }) => {
    return http
      .get(`api/articles?${query}`)
      .then((data: any) => {
        return { data: data.articles };
      })
      .catch((err) => rejectWithValue(err.response));
  }
);

const getArticleDetails = createAsyncThunk(
    "user/getArticleDetails",
    async (slug: string, { rejectWithValue }) => {
      return http
        .get(`api/articles/${slug}`)
        .then((data: any) => {
          return { data: data.article };
        })
        .catch((err) => rejectWithValue(err.response));
    }
  );

const createArticle = (body: IArticle) => {
    return http.post(`api/articles`, body);
  };

const updateArticle = (slug: string, body: IArticle) => {
    return http.put(`api/articles/${slug}`, body);
  };


const removeArticle = (slug: string) => {
  return http.delete(`api/articles/${slug}`);
};

export const articleService = {
    getListArticles,
    createArticle,
    getArticleDetails,
    updateArticle,
    removeArticle
};
