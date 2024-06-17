# Issue-Tracker

## 프로젝트 소개
Github Issue를 모방한 이슈 트래커 서비스입니다.

## 🧑‍💻👩‍💻 팀원
| <img src="https://avatars.githubusercontent.com/u/126482821?v=4" width=220> | <img src="https://avatars.githubusercontent.com/u/110909423?v=4" width=220> | <img src="https://avatars.githubusercontent.com/u/83386112?v=4" width=220> |
|:-----------------------------------------------------------------:|:---------------------------------------------------------------------------:|:--------------------------------------------------------------------------:|
|                [조지](https://github.com/96limshyun)                 |                      [코리](https://github.com/keon0711)                      |                    [제이든](https://github.com/hiidy)                     |

## 실행화면
- 로그인 및 회원가입
![로그인및회원가입GIF](https://github.com/codesquad-masters2024-team07/issue-tracker/assets/126482821/1f77f6bd-7236-45fe-86a9-b5ebfaa74ae9)

- 화면전환
![화면전환GIF](https://github.com/codesquad-masters2024-team07/issue-tracker/assets/126482821/5b475183-a669-450c-97f4-f84e9d215595)

- 이슈 생성
![이슈생성GIF](https://github.com/codesquad-masters2024-team07/issue-tracker/assets/126482821/18321427-130a-4e82-9404-83e5b7b36b3c)

- 이슈 편집
![이슈편집GIF](https://github.com/codesquad-masters2024-team07/issue-tracker/assets/126482821/91bd14d9-0813-4e58-a42e-85fa4c6fb59a)

- 이슈 열기 및 닫기
![이슈열기닫기GIF](https://github.com/codesquad-masters2024-team07/issue-tracker/assets/126482821/2b662767-510e-4edf-ae42-1af33ce9ecf9)

- 마일스톤 생성, 편집, 삭제
![마일스톤기능GIF](https://github.com/codesquad-masters2024-team07/issue-tracker/assets/126482821/455471e9-520a-4f01-b472-b9b7ea52a04e)

- 레이블 생성, 편집, 삭제
![레이블기능GIF](https://github.com/codesquad-masters2024-team07/issue-tracker/assets/126482821/d7073e96-ff93-48c5-85cc-0584be098f8d)


## ⚙️ 기술 스택
### Front-End
- Vite `ver. 18.3`
- React `ver. 5.2.11`
- tailwind CSS `ver. 3.4.3`

### Back-End
- Java:`JDK 17` Amazon Corretto
- SpringBoot:`ver. 3.25`
- MySQL:`ver. 8.0.32`


## ERD
- [ERD 링크](https://dbdiagram.io/d/663b02c69e85a46d55454578)

## API 명세서
- Postman의 Documentaion 기능을 이용하여 [API 명세서](https://documenter.getpostman.com/view/29997909/2sA3JM5fiG#get-started-here)
를 작성하였습니다.

## 배포 자동화 전략
1. Github Actions을 이용해서 빌드 및 테스트 자동화
2. 빌드 결과를 Docker Image로 생성
3. Docker Image를 Docker Hub에 Push
4. AWS EC2에서 Docker Image를 Pull


