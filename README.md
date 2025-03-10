This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 운영

### bg 이미지 추가
1. images/bg/ 안에 bg_숫자.webp 파일을 가장 마지막 숫자 + 1 로 넣는다.
2. BackgroundUseCase 의 maxBackgroundImageCount 값을 + 1 한다.

### 사이트 맵
1. 사이트맵 인덱스 (public/sitemap_index.xml) 파일이 root 따라서 sitemap 추가 삭제등의 변동사항은 여기에 반영해야한다.
2. app/sitemap.tsx 파일은 기본적으로 거의 모든 페이지를 관리한다. (bible 제외)
3. app/bible/[bible]sitemap.tsx 파일은 성경 관련 페이지를 관리한다.

## 리소스

### 구글 마테리얼 디자인 아이콘 사용하기
https://fonts.google.com/icons?selected=Material+Symbols+Outlined:share:FILL@0;wght@400;GRAD@0;opsz@24&icon.query=share&icon.size=24&icon.color=%235f6368&icon.platform=web

### tailwind css 버튼 모음
https://buttons.ibelick.com/

### 말씀 카드 이미지 파티클 효과 tsparticles
홈페이지: https://particles.js.org/
github: https://github.com/tsparticles/tsparticles

- 트러블 슈팅
   - https://stackoverflow.com/questions/77395525/is-it-in-any-way-possible-to-use-tsparticles-with-next-js-and-ssr
   - https://medium.com/@travilabs/particle-tsx-component-in-nextjs-the-bloody-rain-effect-d47b4ffd342d

### Nextjs 한글 문서 - 사이트맵
https://nextjs-ko.org/docs/app/api-reference/file-conventions/metadata/sitemap
