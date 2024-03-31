// import dynamic from "next/dynamic";
// import React from "react";

// const ReactQuill = dynamic(
//   async () => {
//     const { default: RQ } = await import("react-quill");
//     const { default: ImageUploader } = await import("quill-image-uploader");
//     RQ.Quill.register("modules/imageUploader", ImageUploader);
//     return RQ;
//   },
//   {
//     ssr: false,
//   }
// );
// const editorOption: any = [
//   [{ size: ["small", false, "large", "huge"] }],
//   ["bold", "italic", "underline", "strike"],
//   ["blockquote", "code-block"],
//   ["link", "image"],
//   [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//   [{ indent: "-1" }, { indent: "+1" }],
//   [{ color: [] }, { background: [] }],
//   [{ align: [] }],
// ];
// interface IProps {
//   value: string;
//   onChange: (value: string) => void;
// }
// const Editor:React.FC<IProps>=({ value, onChange }: any)=>{
//   return (
//     <ReactQuill
//       theme="snow"
//       value={value}
//       onChange={onChange}
//       modules={{
//         toolbar: editorOption,
//         imageUploader: {
//           upload: (file: any) => {
//             console.log(file);
//             return new Promise((resolve, reject) => {
//               setTimeout(() => {
//                 resolve(
//                   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
//                 );
//               }, 3500);
//             });
//           },
//         },
//         // handlers: {
//         //   image: imageHandler,
//         // },
//       }}
//     />
//   );
// }
// export default Editor



import { App} from 'antd';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});
// import './TextEditor.less';
// import { serverUrl } from '@/utils/constant';
// import request from '@/utils/request';

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code',
  'color',
  'background',
  'code-block',
  'align',
];

interface OnChangeHandler {
  (e: any): void;
}

type Props = {
  value: string;
  placeholder?: string;
  onChange: OnChangeHandler;
};

const TextEditor: React.FC<Props> = ({ value, onChange, placeholder }) => {
  const reactQuillRef: any = useRef(null);
  const { message } = App.useApp()
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();
    input.onchange = async () => {
      console.log(input.files);
      Array.from(input.files).forEach((item) => {
        const formData = new FormData();
        formData.append('file', item);
        formData.append('subjectId', '123');
        const hide = message.loading('uploading', 0);
        // request(`${serverUrl}/training/picture/upload`, {
        //   method: 'post',
        //   headers: { 'Content-Type': 'multipart/form-data' },
        //   data: formData,
        // }).then(({ data }) => {
        //   console.log('data', data);
        //   const quill = reactQuillRef?.current?.getEditor(); 
        //   const cursorPosition = quill.getSelection().index; 
        //   const link = data.path;
        //   console.log(quill.insertEmbed);
        //   alert(1);
        //   // max-width: 100%;
        //   quill.insertEmbed(cursorPosition, 'image', link); 
        //   quill.setSelection(cursorPosition + 1); 
        //   hide();
        // });
      });
    };
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            ["link"
            // ,"image"//上传image还需要后台的接口支持，好难好难好难
            ],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
          ],
        handlers: {
          image: imageHandler, 
        },
      },
    }),
    [],
  );

  return (
    <>
      <ReactQuill
        // ref={reactQuillRef}
        theme="snow"
        value={value || ''}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextEditor;