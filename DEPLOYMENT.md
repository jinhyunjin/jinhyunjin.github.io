# GitHub Pages 배포 가이드

이 프로젝트에는 `main` 브랜치에 변경 사항이 올라올 때마다 자동 배포하는 GitHub Actions 설정이 포함되어 있습니다.

## 1. GitHub에서 빈 저장소 만들기

1. GitHub에 로그인하고 **New repository**를 선택합니다.
2. 저장소 이름을 정합니다. 예: `jinhyunjin`
3. Public 저장소로 생성합니다. README, `.gitignore`, License는 추가하지 않습니다.
4. 생성 후 표시되는 저장소 주소를 복사합니다.

아래 명령에서 두 자리표시자를 실제 값으로 바꿉니다.

- `<GITHUB_ID>`: GitHub 사용자명
- `<REPOSITORY>`: 방금 만든 저장소명

## 2. 로컬 프로젝트 연결 및 업로드

프로젝트 폴더에서 실행합니다.

```bash
git init
git add .
git commit -m "Create artist portfolio website"
git branch -M main
git remote add origin https://github.com/<GITHUB_ID>/<REPOSITORY>.git
git push -u origin main
```

HTTPS 인증 창이 뜨면 브라우저 로그인을 진행합니다. 비밀번호 입력을 요구하는 환경에서는 GitHub 비밀번호가 아니라 Personal Access Token 또는 SSH 인증을 사용해야 합니다.

## 3. GitHub Pages 활성화

1. GitHub 저장소의 **Settings → Pages**로 이동합니다.
2. **Build and deployment → Source**에서 **GitHub Actions**를 선택합니다.
3. 저장소의 **Actions** 탭에서 `Deploy static site to GitHub Pages` 작업이 성공하는지 확인합니다.
4. 완료 후 `https://<GITHUB_ID>.github.io/<REPOSITORY>/`에서 사이트를 확인합니다.

이후에는 수정한 뒤 다음 명령만 실행하면 자동으로 다시 배포됩니다.

```bash
git add .
git commit -m "Update portfolio"
git push
```

## 4. 독립 도메인 연결(선택)

GitHub의 **Settings → Pages → Custom domain**에 도메인을 입력합니다. DNS 제공업체에서 GitHub 안내에 따라 레코드를 설정한 뒤 **Enforce HTTPS**를 켭니다.

루트 도메인(`example.com`)은 GitHub Pages의 A/AAAA 레코드를, 서브도메인(`www.example.com`)은 `<GITHUB_ID>.github.io`를 향하는 CNAME을 사용합니다. DNS 값은 변경될 수 있으므로 연결 시점에 GitHub 공식 안내에 표시되는 값을 따르세요.

## 문제 해결

- 배포가 시작되지 않음: 기본 브랜치가 `main`인지 확인합니다.
- Pages 권한 오류: **Settings → Actions → General → Workflow permissions**와 Pages Source 설정을 확인합니다.
- CSS나 이미지가 안 보임: 파일명 대소문자와 상대 경로를 확인합니다.
- 변경이 바로 안 보임: Actions 완료 후 브라우저에서 강력 새로고침합니다.
- 저장소가 Private: GitHub 요금제에 따라 Pages 공개 조건이 다를 수 있으므로 Public 저장소가 가장 간단합니다.
