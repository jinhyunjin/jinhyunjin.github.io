# 다른 PC에서 작업하고 GitHub Pages에 배포하기

정식 저장소의 `main` 브랜치에 변경 사항이 올라오면 GitHub Actions가 `https://jinhyunjin.github.io/`에 자동 배포합니다.

## 1. 새 PC에 프로젝트 받기

HTTPS 방식:

```bash
git clone https://github.com/jinhyunjin/jinhyunjin.github.io.git
cd jinhyunjin.github.io
```

SSH 키가 GitHub에 등록되어 있다면:

```bash
git clone git@github.com:jinhyunjin/jinhyunjin.github.io.git
cd jinhyunjin.github.io
```

작업 전 `AGENTS.md`를 읽습니다. Claude Code에서는 `CLAUDE.md`도 진입점으로 사용합니다.

## 2. 로컬 미리보기

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다. 서버 종료는 터미널에서 `Ctrl+C`를 누릅니다.

## 3. 수정 및 검증

- 작품 정보: `script.js`의 `works`
- 소개, 전시, 연락처: `index.html`
- 레이아웃과 디자인: `styles.css`
- 작품 이미지: `assets/artworks`

커밋 전:

```bash
node --check script.js
git diff --check
git status --short
git diff
```

원본 PDF에는 공개하지 않는 개인정보가 있으므로 `*.pdf`를 강제로 추가하지 않습니다.

## 4. 커밋 및 자동 배포

```bash
git add .
git commit -m "Describe the portfolio update"
git push
```

HTTPS에서 암호를 요구하면 GitHub 계정 비밀번호 대신 Personal Access Token이나 Git Credential Manager를 사용합니다. 장기적으로는 SSH 인증이 편리합니다.

push 후 다음을 확인합니다.

1. `https://github.com/jinhyunjin/jinhyunjin.github.io/actions`
2. `Deploy static site to GitHub Pages` 작업이 성공했는지 확인
3. `https://jinhyunjin.github.io/`에서 실제 화면 확인

## 5. 백업 저장소 동기화

필요하면 백업 원격을 한 번 추가합니다.

```bash
git remote add backup https://github.com/jmmok82/jinhyunjin.git
git push backup main
```

이미 같은 이름의 원격이 있다면 `git remote -v`로 확인하고 중복 추가하지 않습니다.

## 6. 독립 도메인 연결(선택)

GitHub의 **Settings → Pages → Custom domain**에 도메인을 입력합니다. DNS 제공업체에서 GitHub 안내에 따라 레코드를 설정한 뒤 **Enforce HTTPS**를 켭니다.

루트 도메인(`example.com`)은 GitHub Pages의 A/AAAA 레코드를, `www`는 `jinhyunjin.github.io`를 향하는 CNAME을 사용합니다. DNS 값은 변경될 수 있으므로 연결 시점에 GitHub 공식 안내를 따릅니다.

## 문제 해결

- 배포가 시작되지 않음: 기본 브랜치가 `main`인지 확인하고 Settings → Pages의 Source가 GitHub Actions인지 확인합니다.
- Pages 권한 오류: **Settings → Actions → General → Workflow permissions**와 Pages Source 설정을 확인합니다.
- CSS나 이미지가 안 보임: 파일명 대소문자와 상대 경로를 확인합니다.
- 변경이 바로 안 보임: Actions 완료 후 강력 새로고침하거나 모바일 개인정보 보호 탭에서 확인합니다.
- iPhone 캐시: 설정 → 앱 → Safari → 고급 → 웹사이트 데이터에서 `github.io` 데이터를 삭제합니다.
