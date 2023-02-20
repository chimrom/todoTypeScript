import React, { ChangeEvent, FC, useState } from "react";
import { Checkbox, Button, Modal, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface Props {
  text: string;
  isChecked: boolean;
  id: number;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

export const Task: FC<Props> = ({
  text,
  isChecked,
  id,
  onCheck,
  onDelete,
  onEdit,
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editInputValue, setEditInputValue] = useState<string>(text);
  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };
  const onEditOpen = () => {
    setIsEditOpen(true);
  };
  const handleEditOk = () => {
    if (editInputValue !== text) {
      onEdit(id, editInputValue);
    }
    setIsEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
  };

  const onChange = () => {
    onCheck(id);
  };
  const onClick = () => {
    setIsDeleteOpen(true);
  };
  const handleOk = () => {
    onDelete(id);
    setIsDeleteOpen(false);
  };

  const handleCancel = () => {
    setIsDeleteOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Checkbox onChange={onChange} checked={isChecked} />
        <div style={{ width: "100px", flex: 1 }}>
          <p
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </p>
        </div>
      </div>
      <Button type="primary" onClick={onEditOpen}>
        <EditOutlined />
      </Button>
      <Button danger onClick={onClick}>
        <DeleteOutlined />
      </Button>
      <Modal
        title="Edit your task"
        open={isEditOpen}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Input value={editInputValue} onChange={changeInputValue} />
      </Modal>
      <Modal
        title="Are you sure about this?"
        open={isDeleteOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};
