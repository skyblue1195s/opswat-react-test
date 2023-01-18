import React, { useEffect } from "react";
import { Col, Form, Input, Row, Select, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@hooks/useDispatch";
import { IForm } from "@interfaces/FormData";
import { articleService } from "@services/Articles";
import { NotificationConfig } from "@helper/utils";
import { MESSAGE_TYPE } from "@helper/constants";
import { isNull } from "lodash";

const ArticleForm = ({ isDisabled, action, id }: IForm) => {
  const dispatch = useAppDispatch();

  const submitFormReducers = useAppSelector(
    (state) => state.submitFormReducers
  );
  const { articleReducers } = useAppSelector((state) => state);
  const { articleDetails, loading } = articleReducers;

  const [form] = Form.useForm();


  useEffect(() => {
    if (!isNull(articleDetails)) {
      form.setFieldsValue(articleDetails)
    }
  }, [articleDetails])

  useEffect(() => {
    form.resetFields();
  }, [action]);

  useEffect(() => {
    if (submitFormReducers.isSubmit) {
      form.submit();
    }
  }, [submitFormReducers.randomNumber]);

  const onFinish = (e: any) => {
    if (action === "create") {
      articleService.createArticle(e).then(() => {
        NotificationConfig(MESSAGE_TYPE.SUCCESS, "Article added");
        dispatch(articleService.getListArticles(""));
      });
    } else {
      articleService.updateArticle(id, e).then(() => {
        NotificationConfig(MESSAGE_TYPE.SUCCESS, "Article updated");
        dispatch(articleService.getListArticles(""));
      });
    }
  };

  return (
    <Spin spinning={loading}>
      <Form
        layout="vertical"
        disabled={isDisabled}
        form={form}
        onFinish={onFinish}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Please enter title",
                },
              ]}
            >
              <Input placeholder="Please enter title" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input placeholder="Please enter description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="tagList"
              label="Tag"
              rules={[
                {
                  required: true,
                  message: "Please enter a tag",
                },
              ]}
            >
              <Select
                mode="tags"
                allowClear
                className="w-full"
                placeholder="Please enter a tag"
                defaultValue={articleDetails.tagList || []}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="body" label="Body">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default React.memo(ArticleForm);
