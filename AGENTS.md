# 진현진 작가 홈페이지 작업 지침

이 저장소는 진현진 작가의 공식 포트폴리오 정적 사이트다. 작업 전 이 문서를 끝까지 읽고, 기존의 절제된 전시형 디자인과 개인정보 보호 원칙을 유지한다.
- 원본: `[경성방직_작가공모] 진현진_포트폴리오.pdf`
- 원본 작성일: 2026년 1월 27일(PDF 메타데이터 기준)


## 프로젝트 개요

- 정식 사이트: `https://jinhyunjin.github.io/`
- 영문 사이트: `https://jinhyunjin.github.io/en/`
- 정식 저장소: `https://github.com/jinhyunjin/jinhyunjin.github.io`
- 백업 저장소: `https://github.com/jmmok82/jinhyunjin`
- 기술 구성: 빌드 과정 없는 HTML, CSS, JavaScript
- 배포: `.github/workflows/deploy.yml`을 통한 GitHub Pages 자동 배포
- 기본 브랜치: `main`

현재 작업 PC에서는 정식 저장소의 원격 이름이 `artist-site`, 백업 저장소의 원격 이름이 `origin`이다. 다른 PC에서 정식 저장소를 새로 clone하면 정식 저장소가 `origin`이 된다. 원격 이름을 추측하지 말고 항상 `git remote -v`로 URL을 확인한다.

## 주요 파일

- `index.html`: 한국어 페이지 구조, 작가 소개, 작가노트, CV·전시 표시 영역, 연락처
- `en/index.html`: 동일한 구조의 영문 페이지
- `styles.css`: 반응형 레이아웃과 모든 시각 디자인
- `script.js`: 작품 JSON·CV Markdown 렌더링, 더 보기, 갤러리, 확대 보기, 모바일 메뉴
- `data/artworks.json`: 한국어·영문 작품 정보, 표시 순서, 대표작의 단일 원본
- `ARTWORKS_GUIDE.md`: 작품 추가·순서·대표작 수정 방법
- `scripts/validate-artworks.mjs`: JSON 형식·이미지·대표작 검증
- `ARTIST_CV.md`: 한국어 학력·수상·소장처·선정·전시 이력의 홈페이지 원본
- `ARTIST_CV_EN.md`: 영문 학력·수상·소장처·선정·전시 이력의 홈페이지 원본
- `assets/artworks/`: 웹 공개용 작품 이미지
- `.github/workflows/deploy.yml`: GitHub Pages 배포
- `README.md`: 콘텐츠 점검표와 간단한 사용법
- `DEPLOYMENT.md`: 다른 PC 설정과 배포 운영법

## 디자인 원칙

- 작품이 가장 먼저 보이는 여백 중심의 전시형 화면을 유지한다.
- 데스크톱 첫 화면은 대표 작품을 화면에 꽉 채우는 몰입형 구성을 유지한다.
- 모바일 첫 화면 작품 높이는 `44svh`이며, 소개 문구가 첫 화면에서 충분히 보이게 한다.
- 작품 목록은 동일한 4:5 프레임을 사용하고 `object-fit: contain`으로 원본 전체를 보여준다. 작품을 잘라내는 `cover`를 갤러리에 사용하지 않는다.
- 작품은 `data/artworks.json` 배열 순서로 표시하고 처음 6개만 보여준다. `hero: true`는 정확히 하나의 작품에만 설정한다.
- Artist Statement는 한자 장식 없이 단일 컬럼으로 표시한다.
- About은 작가명, 카테고리 제목과 이력 내용을 860px 이내의 중앙 정렬 단일 컬럼으로 표시한다.
- 한국어 본문은 `word-break: keep-all`과 `text-wrap: pretty`를 유지해 외톨이 글자를 줄인다.
- 첫 화면의 작가명은 작품 위에서 흰색, 스크롤된 밝은 헤더에서는 검정색이다.
- 한국어와 영문 페이지의 구성과 작품 순서를 동일하게 유지하고, 양쪽 언어 전환 링크를 함께 관리한다.
- 작가 이력과 전시는 HTML에 직접 중복 입력하지 않고 `ARTIST_CV.md`와 `ARTIST_CV_EN.md`에서 함께 관리한다. `##` 제목과 `-` 목록 형식을 유지하고, 새 항목은 최신순으로 추가한다.
- 모바일, 키보드 탐색, `prefers-reduced-motion` 접근성을 훼손하지 않는다.

## 콘텐츠와 개인정보

- 원본 포트폴리오 PDF에는 생년월일과 전화번호가 포함되어 있다. PDF를 Git에 추가하거나 웹으로 배포하지 않는다.
- `.gitignore`의 `*.pdf`, `*.ppm` 및 보조 이미지 제외 규칙을 제거하지 않는다.
- 현재 공개 연락처는 이메일과 Instagram뿐이다.
- 생년월일과 전화번호는 작가의 명시적인 공개 동의 없이 추가하지 않는다.
- 작품명, 재료, 크기, 연도는 원본 자료와 대조하고 임의로 고치지 않는다.
- 이미지 교체 시 웹 공개와 저작권 허가 여부를 확인한다.

## 작업 절차

1. `git status --short`, `git remote -v`, `git log -5 --oneline`으로 상태를 확인한다.
2. 변경 범위를 최소화하고 기존 디자인 의도를 유지한다.
3. 다음 항목을 검증한다.

```bash
node scripts/validate-artworks.mjs
node --check script.js
git diff --check
python3 -m http.server 8000
```

4. 데스크톱과 모바일의 한국어·영문 페이지에서 첫 화면, 갤러리, Artist Statement, About, CV·전시 더 보기, 모바일 메뉴, 작품 확대 보기를 확인한다.
5. 커밋 전 `git status --short`와 `git diff`를 검토한다.
6. 의미가 분명한 영문 커밋 메시지를 사용한다.
7. 정식 저장소에 먼저 push하고 GitHub Actions 성공 및 실제 사이트 응답을 확인한다.
8. 가능하면 백업 저장소에도 같은 `main`을 push한다.

## 배포 명령

현재 작업 PC:

```bash
git push artist-site main
git push origin main
```

새 PC에서 정식 저장소를 clone한 경우:

```bash
git push origin main
```

push 후 다음을 확인한다.

- Actions: `https://github.com/jinhyunjin/jinhyunjin.github.io/actions`
- 공개 사이트: `https://jinhyunjin.github.io/`

GitHub Pages 캐시는 잠시 남을 수 있다. 모바일에서 이전 화면이 보이면 Safari 개인정보 보호 탭으로 확인하거나 해당 `github.io` 웹사이트 데이터를 삭제한다.

## 금지 사항

- 원본 PDF나 전화번호·생년월일을 커밋하지 않는다.
- 작품 파일을 손실 압축하거나 덮어쓰기 전에 원본을 보존한다.
- 사용자 요청 없이 프레임워크나 빌드 도구를 추가하지 않는다.
- 사용자 요청 없이 정식·백업 저장소를 삭제하거나 force push하지 않는다.
- 실제 확인 없이 배포 성공을 단정하지 않는다.
