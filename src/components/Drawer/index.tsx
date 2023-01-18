import React from "react";
import { Button, Drawer, Space } from "antd";
import { IDrawer } from "@interfaces/Drawer";
import { useAppDispatch, useAppSelector } from "@hooks/useDispatch";
import { setSubmitForm } from "@features/submitForm/submitForm.slices";

const DrawerComponent = ({
  title,
  isOpen,
  onClose,
  children,
  disabled,
  paddingBottom = 80,
  size = "500px",
}: IDrawer) => {
  const dispatch = useAppDispatch();
  const submitFormReducers = useAppSelector(
    (state) => state.submitFormReducers
  );

  const onSubmitForm = () => {
    dispatch(
      setSubmitForm({ isSubmit: true, action: submitFormReducers.action })
    );
  };
  return (
    <Drawer
      title={title}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: paddingBottom }}
      width={size}
      maskClosable={false}
      extra={
        <Space>
          {!disabled && (
            <>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                htmlType="submit"
                disabled={disabled}
                type="primary"
                onClick={onSubmitForm}
              >
                Submit
              </Button>
            </>
          )}
        </Space>
      }
    >
      {children}
    </Drawer>
  );
};

export default React.memo(DrawerComponent);
