import { useEffect, useState } from "react";
import { userService } from "@services/Users";
import { Avatar, Button, Form, Input, Spin, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import NoImage from "@assets/images/no-image.png";
import { getBase64 } from "@helper/covertImage";
import { RcFile } from "antd/lib/upload";
import { MESSAGE_TYPE } from "@helper/constants";
import { NotificationConfig } from "@helper/utils";
import { LoadingOutlined } from "@ant-design/icons";

const Profile = () => {
  const [form] = Form.useForm();
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "white" }} spin />
  );

  useEffect(() => {
    setLoading(true);
    userService
      .getUser()
      .then((data: any) => {
        const { user } = data;
        setAvatar(user.image);
        form.setFieldsValue(user);
      })
      .finally(() => setLoading(false));
  }, []);

  const onAvatarChange = (e: any) => {
    const { file } = e;
    if (file.status !== "uploading") {
      getBase64(file.originFileObj as RcFile, (url) => {
        setAvatar(url);
      });
    }
  };

  // submit form
  const onFinish = (value: any) => {
    setLoading(true);
    value.image = avatar;
    userService
      .updateUser(value)
      .then(() => NotificationConfig(MESSAGE_TYPE.SUCCESS, "User updated"))
      .finally(() => setLoading(false));
  };

  return (
    <section className="flex justify-center">
      <div>
        <Upload
          onChange={onAvatarChange}
          accept="image/*"
          showUploadList={false}
        >
          <Avatar size={120} src={avatar || NoImage} />
        </Upload>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        onFinish={onFinish}
        autoComplete="off"
        className="w-2/4"
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please enter a valid email address.",
            },
          ]}
        >
          <Input placeholder="Enter your email address" />
        </Form.Item>

        <Form.Item
          label="Bio"
          name="bio"
          rules={[{ required: true, message: "Please input your bio" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {loading ? <Spin indicator={antIcon} /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
export default Profile;
