import ReactMarkdown from "react-markdown";
interface UserImgBoxProps {
    imgURL: string | undefined;
    margin: string;
    width: string;
    height: string;
}
const DEFAULT_IMG_URL = "![이미지](https://issue-tracker-web.s3.ap-northeast-2.amazonaws.com/attached/ezgif-5-8ff8abdc7a.GIF)"

export const UserImgBox = ({imgURL, margin, width, height}: UserImgBoxProps) => {
    
    return (
        <ReactMarkdown
                components={{
                    img: ({ ...props }) => (
                        <img
                            style={{ width: width, height: height ,margin: margin, borderRadius: "50%", objectFit: "cover",
                            display: "block"}}
                            {...props}
                            alt="이미지 첨부"
                        />
                    ),
                }}
            >
                {imgURL?.includes("이미지") ? imgURL : DEFAULT_IMG_URL}
            </ReactMarkdown>
    );
};
