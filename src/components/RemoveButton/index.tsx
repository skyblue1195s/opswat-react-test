import React from "react";
import { Button, Popconfirm, Tooltip } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@hooks/useDispatch";
import {IRemoveButton} from "@interfaces/Button"
import { MESSAGE_TYPE, PAGES } from "@helper/constants";
import { userService } from "@services/Users";
import { NotificationConfig } from "@helper/utils";
import { articleService } from "@services/Articles";

const RemoveButtonComponent = ({type, title, id }: IRemoveButton) => {
  const dispatch = useAppDispatch();
  const onRemove = () => {
    if (type === PAGES.user) {
      userService.removeUser(id).then(() => {
        NotificationConfig(MESSAGE_TYPE.SUCCESS, "User removed")
        dispatch(userService.getListUsers(''))
      })
    } else {
      articleService.removeArticle(id).then(() => {
        NotificationConfig(MESSAGE_TYPE.SUCCESS, "Article removed")
        dispatch(articleService.getListArticles(''))
      })
    }
  }

  return (
    <>
      <Tooltip title={title}>
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={onRemove}
        >
          <Button type="ghost" danger shape="circle">
            <CloseOutlined />
          </Button>
        </Popconfirm>
      </Tooltip>
    </>
  );
};

export default React.memo(RemoveButtonComponent);
