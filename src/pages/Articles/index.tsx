import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useDispatch";
import { Table, Button, Col, Row, TablePaginationConfig, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { isEmpty, orderBy } from "lodash";
import RemoveButtonComponent from "@components/RemoveButton";
import { EditOutlined, PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import DrawerComponent from "@components/Drawer";
import ArticleForm from "@components/ArticleForm";
import { PAGES } from "@helper/constants";
import { IArticle } from "@interfaces/Article";
import { articleService } from "@services/Articles";
import { clearArticleDetail } from "@features/article/article.slices";

const ListArticles = () => {
  const dispatch = useAppDispatch();
  const articleReducers = useAppSelector((state) => state.articleReducers);
  const [listArticles, setListArticles] = useState<IArticle[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [action, setAction] = useState("");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100, 200, 250, 500],
    total: 0,
  });

  const columns: ColumnsType<IArticle> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
      render: (value) => <div dangerouslySetInnerHTML={{ __html: value }} />,
    },
    {
      title: "Tag",
      dataIndex: "tagList",
      key: "tagList",
      render: (value) =>
        value.map((x: string) => (
          <Tag key={x} color="cyan">
            {x}
          </Tag>
        )),
    },
    {
      title: "Action",
      key: "action",
      width: "5%",
      render: (_, record) => {
        return (
          <Row className="min-w-[200px]">
            <Col span={24} className="p-1">
              <Button
                className="border-blue-400 text-blue-400 mr-3"
                shape="circle"
                loading={articleReducers.loading}
                icon={<EditOutlined />}
                onClick={() => onEditArticle(record.slug || "")}
                title="Edit"
              />
              <RemoveButtonComponent
                title="Article user"
                type={PAGES.article}
                id={record.slug || ""}
              />
            </Col>
          </Row>
        );
      },
    },
  ];

  // get list users
  useEffect(() => {
    dispatch(articleService.getListArticles(""));
  }, []);

  // handler list users when api run success
  useEffect(() => {
    if (!isEmpty(articleReducers)) {
      const listArticles = articleReducers.articles?.map((user) => ({
        ...user,
        key: user.id,
      }));
      setListArticles(listArticles);
      setIsOpen(false);
      setPagination({
        ...pagination,
        total: Number(listArticles?.length),
      });
    }
  }, [articleReducers.articles]);

  useEffect(() => {
    if (articleReducers.articleDetails && articleReducers.articleDetails.id) {
    }
  }, [articleReducers.articleDetails]);

  const onReloadListUser = () => {
    dispatch(articleService.getListArticles(""));
  };

  // handler page and page size change
  const onChangeHandler = (pagination: TablePaginationConfig) => {
    setPagination((pre) => ({
      ...pre,
      pageSize: pagination.pageSize || 20,
      current: pagination?.current || 1,
    }));
  };

  const onAddArticle = () => {
    dispatch(clearArticleDetail());
    setSlug("");
    setAction("create");
    setTitle("Add new article");
    setIsOpen(true);
  };

  const onEditArticle = (e: string) => {
    dispatch(articleService.getArticleDetails(e));
    setSlug(e);
    setAction("update");
    setTitle("Update article");
    setIsOpen(true);
  };
  return (
    <section>
      <h1 className="mr-[auto] font-semibold text-xl mb-1">List Articles</h1>
      <header className="flex justify-between align-center mb-8">
        <div>
          <Button
            className="border-green-400 text-green-400 mr-3"
            shape="circle"
            loading={articleReducers.loading}
            icon={<PlusOutlined />}
            onClick={onAddArticle}
            title="Add"
          />
        </div>
        <Button
          className="mr-4"
          shape="circle"
          loading={articleReducers.loading}
          icon={<ReloadOutlined />}
          onClick={onReloadListUser}
          title="Reload"
        />
      </header>
      <Table
        columns={columns}
        dataSource={orderBy(listArticles, ["id"], "desc")}
        loading={articleReducers.loading}
        pagination={pagination}
        onChange={onChangeHandler}
        scroll={{
          y: 530,
          x: "max-content",
        }}
      />
      <DrawerComponent
        title={title}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ArticleForm action={action} id={slug || ""} />
      </DrawerComponent>
    </section>
  );
};
export default ListArticles;
