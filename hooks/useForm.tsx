////这是一个封装全部表单结构的hook
import { Dispatch, useEffect, useState } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { IErrors } from "../src/model/SignIn";
import cs from "classnames";
import styles from "../styles/hooks/useForm.module.scss";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Button, Input, message } from "antd";
import Editor from "components/Editor";

interface IFormContent<T> {
  labelName: string;
  useKey: keyof T;
  inputType: "text" | "password" | "textarea" | "editor";
  className?: string;
}

interface IOptions<T> {
  formContent: IFormContent<T>[]; //表单需要的内容
  data: T; //需要的数据格式
  // onSubmit: (data: T) => {}
  submitOptions: {
    axiosFn: (formData: T) => Promise<AxiosResponse>;
    successCallback: (res?: AxiosResponse) => any;
    successWord: string;
    cancelCallback: () => void;
  };
}

function useForm<T>(options: IOptions<T>) {
  const { formContent, data, submitOptions } = options;
  const [formData, setFormData] = useState(data);
  const [messageApi, contextHolder] = message.useMessage();
  let initError: { [key in keyof T]?: string[] } = {};
  Object.keys(data).forEach((item) => {
    initError[item as keyof T] = [];
  });
  const [errors, setErrors] = useState(initError);
  const Form = (
    <div className={styles.main}>
      {formContent.map((item) => {
        return (
          <div
            key={item.useKey.toString()}
            className={cs(
              styles.field,
              `field-${item.useKey.toString()}`,
              item.className
            )}
          >
            <div className={styles.label}>
              <span className={styles.label_text}>{item.labelName}</span>
              <GetInput
                item={item}
                formData={formData}
                setFormData={setFormData}
              ></GetInput>
              <div className={styles.control}>
                <div id={item.useKey.toString()} />
              </div>
            </div>
            <div>
              {errors[item.useKey]?.length !== 0 &&
                errors[item.useKey]?.join(" ")}
            </div>
          </div>
        );
      })}
      <div className={styles.btn_container}>
        <Button
          type="primary"
          onClick={async () => {
            submitOptions
              .axiosFn(formData)
              .then((res) => {
                setErrors(initError);
                messageApi.open({
                  type: "success",
                  content: submitOptions.successWord,
                });
                setTimeout(() => {
                  submitOptions.successCallback(res);
                }, 500);
              })
              .catch((error: AxiosError<IErrors>) => {
                setErrors(error.response.data);
              });
          }}
        >
          确定
        </Button>
        <Button
          onClick={async () => {
            submitOptions.cancelCallback();
          }}
        >
          取消
        </Button>
      </div>
      {contextHolder}
    </div>
  );
  return {
    Form,
  };
}

function GetInput({
  item,
  formData,
  setFormData,
}: {
  item: IFormContent<any>;
  formData: any;
  setFormData: Dispatch<any>;
}) {
  switch (item.inputType) {
    case "textarea":
      return (
        <textarea
          className={styles.control}
          value={formData[item.useKey].toString()}
          onChange={(event) => {
            setFormData({
              ...formData,
              [item.useKey]: event.target.value,
            });
          }}
        ></textarea>
      );
    case "editor":
      // ReactQuill.res?
      return (
        <div className={styles.editor}>
          <Editor
            value={formData[item.useKey].toString()}
            onChange={(value) => {
              setFormData({
                ...formData,
                [item.useKey]: value,
              });
            }}
          />
        </div>
      );
    case "password":
      return (
        <Input.Password
          value={formData[item.useKey].toString()}
          onChange={(event) => {
            setFormData({
              ...formData,
              [item.useKey]: event.target.value,
            });
          }}
        />
      );
    default:
      return (
        <Input
          className={styles.control}
          value={formData[item.useKey].toString()}
          onChange={(event) => {
            setFormData({
              ...formData,
              [item.useKey]: event.target.value,
            });
          }}
        />
      );
  }
}
export { useForm };
