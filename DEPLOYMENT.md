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

작가 이력과 작품 데이터는 JavaScript가 Markdown·JSON 파일을 불러와 표시하므로 `index.html`을 파일로
직접 열지 말고 반드시 로컬 서버를 사용합니다.

## 3. 수정 및 검증

- 작품 정보·순서·대표작: `data/artworks.json`
- 한국어 학력·수상·소장처·선정·전시: `ARTIST_CV.md`
- 영문 학력·수상·소장처·선정·전시: `ARTIST_CV_EN.md`
- 한국어 작가노트와 연락처: `index.html`
- 영문 작가노트와 연락처: `en/index.html`
- 레이아웃과 디자인: `styles.css`
- 작품 이미지: `assets/artworks`
- 작품 관리 안내: `ARTWORKS_GUIDE.md`
- 배포 대상 파일: `.github/workflows/deploy.yml`

### CV와 전시 이력 수정 규칙

- 한국어와 영문 내용을 함께 수정합니다.
- `##` 섹션 제목과 `-`로 시작하는 목록 형식을 유지합니다.
- 새 이력은 각 섹션에서 최신 항목이 위에 오도록 추가합니다.
- 예정 전시는 한국어에 `(예정)`, 영문에 `(Scheduled)`를 붙입니다. 개최가 확인되면
  두 파일에서 예정 표시를 함께 제거합니다.
- 수상은 처음 4개, 전시는 처음 7개가 기본으로 보이며 나머지는 방문자가 펼칠 수
  있습니다.
- 파일명을 바꾸려면 `script.js`의 경로와 `.github/workflows/deploy.yml`의 복사
  목록도 함께 수정해야 합니다.

커밋 전:

```bash
node scripts/validate-artworks.mjs
node --check script.js
git diff --check
git status --short
git diff
```

데스크톱과 모바일의 한국어·영문 페이지에서 다음 항목을 확인합니다.

- About 이력과 전시가 정상적으로 불러와지는지
- 작품 6개, 대표작, `더 보기` 숫자와 확대 보기가 정상인지
- 수상과 전시의 `더 보기` 및 `접기`가 작동하는지
- 첫 화면, 작품 목록, Artist Statement, 모바일 메뉴와 작품 확대 보기가 정상인지

원본 PDF에는 공개하지 않는 개인정보가 있으므로 `*.pdf`를 강제로 추가하지 않습니다.

## 4. 커밋 및 자동 배포

```bash
git status --short
git add path/to/changed-file
git commit -m "Describe the portfolio update"
git push
```

CV만 수정했다면 다음처럼 선택해서 추가할 수 있습니다.

```bash
git add ARTIST_CV.md ARTIST_CV_EN.md
```

HTTPS에서 암호를 요구하면 GitHub 계정 비밀번호 대신 Personal Access Token이나 Git Credential Manager를 사용합니다. 장기적으로는 SSH 인증이 편리합니다.

push 후 다음을 확인합니다.

1. `https://github.com/jinhyunjin/jinhyunjin.github.io/actions`
2. `Deploy static site to GitHub Pages` 작업이 성공했는지 확인
3. `https://jinhyunjin.github.io/`에서 실제 화면 확인
4. `https://jinhyunjin.github.io/en/`에서 영문 내용 확인

저장소에는 과거 Pages 잠금 문제를 정리하기 위한 `Cancel stale Pages deployment`
워크플로도 있어 push 시 함께 표시될 수 있습니다. 실제 사이트 배포 여부는
`Deploy static site to GitHub Pages`의 성공 상태를 기준으로 확인합니다.

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
- 이력 대신 로딩 문구나 오류가 보임: 로컬에서는 HTTP 서버를 사용하고,
  `ARTIST_CV.md`·`ARTIST_CV_EN.md`의 파일명과 `##` 섹션 제목을 확인합니다.
- 배포 후 CV만 보이지 않음: `.github/workflows/deploy.yml`의 `Prepare static site`
  단계에 두 CV 파일이 포함되어 있는지 확인합니다.
- 작품이 보이지 않음: `node scripts/validate-artworks.mjs`를 실행하고,
  배포 단계에 `data` 폴더가 포함되어 있는지 확인합니다.
- 변경이 바로 안 보임: Actions 완료 후 강력 새로고침하거나 모바일 개인정보 보호 탭에서 확인합니다.
- iPhone 캐시: 설정 → 앱 → Safari → 고급 → 웹사이트 데이터에서 `github.io` 데이터를 삭제합니다.
