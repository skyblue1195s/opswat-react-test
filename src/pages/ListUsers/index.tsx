import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useDispatch";
import { IUserDataType } from "@interfaces/DataType";
import { userService } from "@services/Users";
import { Table, Button, Col, Image, Row, TablePaginationConfig } from "antd";
import type { ColumnsType } from "antd/es/table";
import { isEmpty, orderBy } from "lodash";
import RemoveButtonComponent from "@components/RemoveButton";
import NoImage from "@assets/images/no-image.png";
import { ReloadOutlined } from "@ant-design/icons";
import { PAGES, PROFILE_INFO } from "@helper/constants";

const ListUsers = () => {
  const dispatch = useAppDispatch();
  const userReducers = useAppSelector((state) => state.userReducers);
  const [listUsers, setListUsers] = useState<IUserDataType[]>();
  const [user, setUser] = useState<IUserDataType>();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100, 200, 250, 500],
    total: 0,
  });

  const columns: ColumnsType<IUserDataType> = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
      fixed: "left",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      sorter: true,
      width: "12%",
      render: (image) => (
        <Image
          src={image || NoImage}
          preview={!!image}
          width={90}
          height={90}
        />
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
      sorter: true,
      width: "30%",
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: "10%",
      render: (_, record) => {
        return (
          <Row className="min-w-[200px]">
            <Col span={24} className="p-1">
              {user?.email !== record.email && (
                <RemoveButtonComponent
                  title="Remove user"
                  type={PAGES.user}
                  id={record.email || ""}
                />
              )}
            </Col>
          </Row>
        );
      },
    },
  ];

  // get list users
  useEffect(() => {
    dispatch(userService.getListUsers(""));
  }, []);

  // handler list users when api run success
  useEffect(() => {
    if (!isEmpty(userReducers)) {
      const listUsers = userReducers.users?.map((user) => ({
        ...user,
        key: user.id,
      }));
      setListUsers(listUsers);
      setUser(JSON.parse(localStorage.getItem(PROFILE_INFO) || ""));
      setPagination({
        ...pagination,
        total: Number(listUsers?.length),
      });
    }
  }, [userReducers.users]);

  const onReloadListUser = () => {
    dispatch(userService.getListUsers(""));
  };

  // handler page and page size change
  const onChangeHandler = (pagination: TablePaginationConfig) => {
    setPagination((pre) => ({
      ...pre,
      pageSize: pagination.pageSize || 20,
      current: pagination?.current || 1,
    }));
  };

  return (
    <section>
      <h1 className="mr-[auto] font-semibold text-xl mb-1">List Users</h1>
      <header className="flex justify-end align-center mb-8">
        <Button
          className="mr-4"
          shape="circle"
          loading={userReducers.loading}
          icon={<ReloadOutlined />}
          onClick={onReloadListUser}
          title="Reload"
        />
      </header>
      <Table
        columns={columns}
        dataSource={orderBy(listUsers, ["id"], "desc")}
        loading={userReducers.loading}
        pagination={pagination}
        onChange={onChangeHandler}
        scroll={{
          y: 530,
          x: "max-content",
        }}
      />
    </section>
  );
};
export default ListUsers;
