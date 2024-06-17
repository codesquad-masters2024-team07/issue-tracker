import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PaperClipOutlined } from '@ant-design/icons';

import AWS from "../../awsConfig"

interface FileUploaderProps {
	addImgUrl: (url: string) => void;
}

const FileUploader = ({ addImgUrl }: FileUploaderProps) => {
	const [selectFile, setSelectFile] = useState<File | null>(null);
	const upLoadNode = useRef<HTMLInputElement>(null);

	const uploadFile = async (selectFile: File) => {
		if (selectFile) {
			const bucketName = import.meta.env.VITE_APP_S3_BUCKET_NAME;
			const path = 'attached';
			const region = import.meta.env.VITE_APP_S3_REGION;
			const accessKeyId = import.meta.env.VITE_APP_S3_ACCESS_KEY_ID;
			const secretAccessKey = import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY;

			AWS.config.update({
				region,
				accessKeyId,
				secretAccessKey,
			});

			const s3 = new AWS.S3();

			const params = {
				Bucket: bucketName,
				Key: `${path}/${selectFile.name}`,
				Body: selectFile,
				ContentType: selectFile.type,
			};

			try {
				const data = await s3.upload(params).promise();
				return data.Location;
			} catch (error) {
				console.error('Error uploading file:', error);
				return null;
			}
		} else {
			console.log('파일을 선택해주세요.');
		}
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target;
		if (files && files.length > 0) {
			setSelectFile(files[0]);
		} else {
			setSelectFile(null);
		}
	};

	const handleUpload = () => {
		if (upLoadNode.current) {
			upLoadNode.current.click();
		}
	};

	useEffect(() => {
		const putFileURL = async () => {
			if (selectFile) {
				const fileUrl = await uploadFile(selectFile);
				if (fileUrl) addImgUrl(`![이미지](${fileUrl})`)
			}
		};
		putFileURL();
	}, [selectFile]);
	
	return (
		<div className='flex py-2 border-gray-300 border-t-2 border-dotted mt-2'>
			<input
				className='hidden'
				ref={upLoadNode}
				type='file'
				onChange={handleFileChange}
			/>
			<button onClick={handleUpload} className='text-sm'>
				<PaperClipOutlined /> 파일 첨부하기
			</button>
		</div>
	);
};

export default FileUploader;