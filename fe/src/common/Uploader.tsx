import { ChangeEvent, useRef, useState } from "react";
import AWS from "aws-sdk";
import { PaperClipOutlined } from "@ant-design/icons";

const FileUploader = () => {
    const [selectFile, setSelectFile] = useState<File | null | undefined>(null);
    const upLoadNode = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
        if (files && files.length > 0) {
            setSelectFile(files[0]);
        } else {
            setSelectFile(null);
        }
    };

    const uploadFile = () => {
        if (selectFile) {
            const albumBucketName = import.meta.env.VITE_BECKET_NAME;
            const path = import.meta.env.VITE_BECKET_PATH;
            const region = import.meta.env.VITE_REGION;
            const accessKeyId = import.meta.env.VITE_ACCESS_KEY_ID;
            const secretAccessKey = import.meta.env.VITE_ACCESS_SECRET_KEY;

            window.AWS.config.update({
                region,
                accessKeyId,
                secretAccessKey,
            });

            const upload = new AWS.S3.ManagedUpload({
                params: {
                    Bucket: albumBucketName,
                    Key: `${path}/${selectFile.name}`,
                    Body: selectFile,
                },
            });

            const promise = upload.promise();

            promise.then(
                function () {
                    console.log("Successfully uploaded photo.:");
                },
                function (err) {
                    return console.log(
                        "There was an error uploading your photo: ",
                        err.message
                    );
                }
            );
        } else {
            console.log("파일을 선택해주세요.");
        }
    };

    const handleUpload = () => {
        if (upLoadNode.current) {
            upLoadNode.current?.click();
        }
    };

    return (
        <div className="flex py-2 border-gray-300 border-t-2 border-dotted mt-2">
            <input className="hidden" ref={upLoadNode} type="file" onChange={handleFileChange}></input>
            {/* 완료 눌렀을때 처리 */}
            <button onClick={uploadFile}>올리기</button>
            <button onClick={handleUpload} className="text-sm"><PaperClipOutlined/> 파일 첨부하기</button>
        </div>
    );
};

export default FileUploader;
