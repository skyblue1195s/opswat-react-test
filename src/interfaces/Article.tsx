export interface IArticle {
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    tagList?: Array<string>
}

export interface IArticleReducer {
    loading?: boolean;
    articles?: IArticle[];
    articleDetails: IArticle;
    pagination: any;
}