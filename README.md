# Issue-Tracker

## 프로젝트 소개
Github Issue를 모방한 이슈 트래커 서비스입니다.

## 🧑‍💻👩‍💻 팀원
| <img src="https://avatars.githubusercontent.com/u/126482821?v=4" width=220> | <img src="https://avatars.githubusercontent.com/u/110909423?v=4" width=220> | <img src="https://avatars.githubusercontent.com/u/83386112?v=4" width=220> |
|:-----------------------------------------------------------------:|:---------------------------------------------------------------------------:|:--------------------------------------------------------------------------:|
|                [조지](https://github.com/96limshyun)                 |                      [코리](https://github.com/keon0711)                      |                    [제이든](https://github.com/hiidy)                     |

## 실행화면

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


