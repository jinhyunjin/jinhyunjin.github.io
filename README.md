# 진현진 작가 포트폴리오

진현진 작가의 작업 세계와 2024–2025년 주요 작품을 소개하는 정적 웹사이트입니다. 별도 빌드 도구 없이 HTML, CSS, JavaScript로 구성되어 GitHub Pages에 바로 배포할 수 있습니다.

## 공식 홈페이지

**[jinhyunjin.github.io 방문하기](https://jinhyunjin.github.io/)**

- 한국어: [jinhyunjin.github.io](https://jinhyunjin.github.io/)
- English: [jinhyunjin.github.io/en/](https://jinhyunjin.github.io/en/)

## 로컬 확인

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.

## 콘텐츠 수정

- 작품 정보·순서·대표작: `data/artworks.json`
- 한국어 작가 이력과 전시: `ARTIST_CV.md`
- 영문 작가 이력과 전시: `ARTIST_CV_EN.md`
- 작가노트와 연락처: `index.html`, `en/index.html`
- 색상과 레이아웃: `styles.css`
- 작품 이미지: `assets/artworks`

작품을 추가하거나 순서를 바꾸는 방법은 `ARTWORKS_GUIDE.md`를 참고하세요.
작품 데이터와 이미지는 다음 명령으로 검증할 수 있습니다.

```bash
node scripts/validate-artworks.mjs
```

작가 이력과 전시는 위의 Markdown 파일에서 수정하면 됩니다. `##` 섹션 제목과
`-`로 시작하는 항목 형식을 유지한 채 내용을 추가하고 `main` 브랜치에 push하면,
GitHub Pages 배포 후 홈페이지에 자동 반영됩니다. 수상은 처음 4개, 전시는 처음
7개를 보여주며 나머지는 방문자가 `더 보기` 버튼으로 펼칠 수 있습니다. 한국어와
영문 내용은 두 파일에서 함께 관리하며, 로컬 확인 시에는 Markdown을 불러올 수
있도록 위의 HTTP 서버를 사용해야 합니다.

## 공개 전 확인할 내용

- [ ] 작가가 생년월일과 전화번호 공개를 원하는지 확인
- [ ] 이메일 `jinhj9274@naver.com` 공개 동의 확인
- [ ] 인스타그램 `@JINHYUNJIN9274` 계정 및 링크 확인
- [ ] 2026년 전시가 실제 개최되었는지, 확정된 날짜를 표기할지 확인
- [ ] 작품 이미지의 웹 공개 및 저작권 표시 방식 확인
- [ ] 전시명과 기관명의 공식 영문 표기가 맞는지 확인
- [ ] 대표작 순서와 판매·소장 상태 표기 여부 결정
- [ ] 독립 도메인을 사용할 경우 도메인명 확정

상세한 GitHub Pages 배포 절차는 `DEPLOYMENT.md`를 참고하세요.
